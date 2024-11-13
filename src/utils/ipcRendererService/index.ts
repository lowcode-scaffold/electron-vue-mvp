/* eslint-disable no-shadow */
import handle from "./handle";

const callbacks: { [propName: string]: (data: unknown) => void } = {};
const errorCallbacks: { [propName: string]: (data: unknown) => void } = {};

function postMessage(
  data: { cmd: string; data?: unknown },
  cb?: (data: unknown) => void,
  errorCb?: (data: unknown) => void,
) {
  if (cb) {
    const cbid = Date.now().toString();
    callbacks[cbid] = cb;
    window.ipcRenderer?.postMessage({
      cmd: data.cmd,
      data: data.data,
      cbid: cbid,
    });
    if (errorCb) {
      errorCallbacks[cbid] = errorCb;
    }
  } else {
    window.ipcRenderer?.postMessage({
      cmd: data.cmd,
      data: data.data,
    });
  }
}

function request<T = unknown>(params: { cmd: string; data?: unknown }) {
  return new Promise<T>((resolve, reject) => {
    postMessage(
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

function invokeCallback<T = unknown>(cbid: string, res: T) {
  window.ipcRenderer?.postMessage({
    cmd: "postMessageCallback",
    cbid,
    data: res,
    code: 200,
  });
}

function invokeErrorCallback(cbid: string, res: unknown) {
  window.ipcRenderer?.postMessage({
    cmd: "postMessageCallback",
    cbid,
    data: res,
    code: 400,
  });
}

export const addIpcRendererEventListener = () => {
  window.ipcRenderer?.addEventListener("message", async (message) => {
    console.log("ipcRenderer get message", message);
    if (message.cmd !== "postMessageCallback") {
      if (handle[message.cmd]) {
        try {
          const res = await handle[message.cmd](message.data);
          invokeCallback(message.cbid, res);
        } catch (ex: unknown) {
          invokeErrorCallback(message.cbid, ex);
        }
      } else {
        invokeErrorCallback(message.cbid, `方法不存在：${message.cmd}`);
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
  });
};

export const setMaximize = () => {
  return request({
    cmd: "setMaximize",
  });
};

export const setMinimize = () => {
  return request({
    cmd: "setMinimize",
  });
};

export const closeWindow = () => {
  return request({
    cmd: "closeWindow",
  });
};

export const getMac = () => {
  return request<string>({
    cmd: "getMac",
  });
};
