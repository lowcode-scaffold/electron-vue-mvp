import { ipcMain } from "electron";
import handle from "./handle";

/* eslint-disable no-shadow */
const callbacks: { [propName: string]: (data: unknown) => void } = {};
const errorCallbacks: { [propName: string]: (data: unknown) => void } = {};
function postMessage(
  webContents: Electron.WebContents,
  data: { cmd: string; data?: unknown },
  cb?: (data: unknown) => void,
  errorCb?: (data: unknown) => void,
) {
  if (cb) {
    const cbid = Date.now().toString();
    callbacks[cbid] = cb;
    webContents.send("message", {
      cmd: data.cmd,
      data: data.data,
      cbid: cbid,
    });
    if (errorCb) {
      errorCallbacks[cbid] = errorCb;
    }
  } else {
    webContents.send("message", {
      cmd: data.cmd,
      data: data.data,
    });
  }
}

function request<T = unknown>(
  webContents: Electron.WebContents,
  params: { cmd: string; data?: unknown },
) {
  return new Promise<T>((resolve, reject) => {
    postMessage(
      webContents,
      { cmd: params.cmd, data: params.data },
      (res) => {
        resolve(res as T);
      },
      (error) => {
        reject(error);
      },
    );
  });
}

function invokeCallback<T = unknown>(
  webContents: Electron.WebContents,
  cbid: string,
  res: T,
) {
  webContents.send("message", {
    cmd: "postMessageCallback",
    cbid,
    data: res,
    code: 200,
  });
}

function invokeErrorCallback(
  webContents: Electron.WebContents,
  cbid: string,
  res: unknown,
) {
  webContents.send("message", {
    cmd: "postMessageCallback",
    cbid,
    data: res,
    code: 400,
  });
}

export const addIpcMainEventListener = () => {
  ipcMain.on(
    "message",
    async (
      event,
      message: { cmd: string; cbid: string; data: unknown; code?: number },
    ) => {
      // console.log("ipcRenderer get message", message);
      if (message.cmd !== "postMessageCallback") {
        if (handle[message.cmd]) {
          try {
            const res = await handle[message.cmd](event, message.data);
            invokeCallback(event.sender, message.cbid, res);
          } catch (ex: unknown) {
            invokeErrorCallback(event.sender, message.cbid, ex);
          }
        } else {
          invokeErrorCallback(
            event.sender,
            message.cbid,
            `方法不存在：${message.cmd}`,
          );
        }
      } else {
        if (message.code === 200) {
          (callbacks[message.cbid] || function () {})(message.data);
        } else {
          (errorCallbacks[message.cbid] || function () {})(message.data);
        }
        delete callbacks[message.cbid]; // 执行完回调删除
        delete errorCallbacks[message.cbid]; // 执行完回调删除
      }
    },
  );
};

export const addNewTab = (
  webContents: Electron.WebContents,
  data: { url: string },
) => {
  return request(webContents, {
    cmd: "addNewTab",
    data: data,
  });
};

// 主进程向 ipcRenderer 发起关闭请求，ipcRenderer 弹框确认，ipcRenderer 再通知主进程关闭窗口
export const closeWindow = (webContents: Electron.WebContents) => {
  return request(webContents, {
    cmd: "closeWindow",
  });
};

export const refreshCurrentIframe = (webContents: Electron.WebContents) => {
  return request(webContents, {
    cmd: "refreshCurrentIframe",
  });
};
