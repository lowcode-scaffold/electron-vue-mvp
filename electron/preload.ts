/* eslint-disable no-shadow */
import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  addEventListener(
    key: "message",
    listener: (data: { cmd: string; cbid: string; data: unknown }) => void,
  ) {
    return ipcRenderer.on(key, (...args) => {
      const message = args[1] as { cmd: string; cbid: string; data: unknown };
      listener(message);
    });
  },
  postMessage(data: {
    cmd: string;
    data: unknown;
    cdid?: string;
    code?: number;
  }) {
    return ipcRenderer.send("message", data);
  },

  // You can expose other APTs you need here.
  // ...
});
