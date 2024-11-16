import { BrowserWindow } from "electron";
import getMAC from "../getmac";

const handle: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event: Electron.IpcMainEvent, data: any) => void
> = {
  test: () => {
    console.log("test");
  },
  setMaximize: (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window?.isMaximized()) {
      window.unmaximize();
      window.setSize(1366, 768, true);
      window.center();
      return;
    }
    window?.maximize();
  },
  setMinimize: (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window?.minimize();
  },
  closeWindow: (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window?.destroy();
  },
  getMac: () => {
    let mac = "";
    try {
      mac = getMAC();
    } catch (ex) {
      console.log(ex);
    }
    return mac;
  },
};

export default handle;
