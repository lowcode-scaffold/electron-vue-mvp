import { app, BrowserWindow, Menu, MenuItem } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  addIpcMainEventListener,
  addNewTab,
  closeWindow,
  refreshCurrentIframe,
  windowBlur,
  windowFocus,
} from "./ipcMainService";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// let initWin: BrowserWindow | null;

// let tray: Tray;

function createWindow() {
  const win = new BrowserWindow({
    title: "electron-vue-mvp",
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    // width,
    // height,
    // height: 50,
    // frame: true, // 是否有边框，窗口创建后无法更改
    transparent: false,
    fullscreenable: false,
    useContentSize: false,
    maximizable: true,
    fullscreen: false,
    show: false,
    minWidth: 1366,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenuBarVisibility(false);
  win.setAutoHideMenuBar(true);
  win.setMenu(null);
  win.maximize();
  // win.setResizable(false);
  // win.setMinimizable(true);
  // win.setMaximizable(true);
  // win.setResizable(true);

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    addNewTab(win.webContents, { url });
    return { action: "deny" };
  });
  // win.webContents.on("did-create-window", (childWin) =>
  //   childWin.once("ready-to-show", () => childWin.maximize()),
  // );
  // win.loadURL(options.url);
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  // if (VITE_DEV_SERVER_URL) {
  //   win.webContents.openDevTools({ mode: "undocked" });
  // }
  win.on("close", (e) => {
    e.preventDefault();
    if (win.isMinimized()) {
      win.maximize();
    }
    closeWindow(win.webContents);
    // win.destroy();
  });

  win.on("focus", () => {
    windowFocus(win.webContents);
  });

  win.on("blur", () => {
    windowBlur(win.webContents);
  });

  win.webContents.on("before-input-event", (event, input) => {
    if (input.key.toLowerCase() === "f5") {
      refreshCurrentIframe(win.webContents);
      event.preventDefault();
    }
    if (input.key.toLowerCase() === "f12") {
      if (import.meta.env.VITE_MODE !== "prod") {
        win.webContents.openDevTools({ mode: "bottom" });
      }
      event.preventDefault();
    }
  });
  win.webContents.on("context-menu", (_, props) => {
    const menu = new Menu();
    let length = 0;
    if (props.editFlags.canCopy) {
      menu.append(new MenuItem({ label: "复制", role: "copy" }));
      length++;
    }
    if (props.editFlags.canPaste) {
      menu.append(new MenuItem({ label: "粘贴", role: "paste" }));
      length++;
    }
    if (props.editFlags.canCut) {
      menu.append(new MenuItem({ label: "剪切", role: "cut" }));
      length++;
    }
    menu.append(
      new MenuItem({
        label: "刷新页面",
        click() {
          refreshCurrentIframe(win.webContents);
        },
      }),
    );
    length++;
    if (length) {
      menu.popup();
    }
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    // win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  addIpcMainEventListener();
  createWindow();
});

//限制只能开启一个应用
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    const windows = BrowserWindow.getAllWindows();
    const mainWindow = windows[windows.length - 1];
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.maximize();
      mainWindow.focus();
      mainWindow.show();
    }
  });
}
