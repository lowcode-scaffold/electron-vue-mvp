/* eslint-disable no-case-declarations */
/* eslint-disable no-shadow */

import { useTabsStore } from "@/store/tabs";
import handle from "./handle";

/* eslint-disable @typescript-eslint/no-explicit-any */
const callbacks: { [propName: string]: (data: any) => void } = {};
const errorCallbacks: { [propName: string]: (data: any) => void } = {};

const tabStore = useTabsStore();

function postMessage(
  data: { electronWebCmd: string; data?: any },
  cb?: (data: any) => void,
  errorCb?: (data: any) => void,
) {
  const iframe = document.getElementById(
    tabStore.currentTabId.value!,
  ) as HTMLIFrameElement;
  if (cb) {
    const cbid = Date.now();
    callbacks[cbid] = cb;
    iframe?.contentWindow?.postMessage(
      {
        ...data,
        cbid,
      },
      "*",
    );
    if (errorCb) {
      errorCallbacks[cbid] = errorCb;
    }
  } else {
    iframe?.contentWindow?.postMessage(data, "*");
  }
}

export function request<T = unknown>(params: { cmd: string; data?: any }) {
  return new Promise<T>((resolve, reject) => {
    postMessage(
      { electronWebCmd: params.cmd, data: params.data },
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      },
    );
  });
}

function invokeCallback<T = unknown>(cbid: string, res: T) {
  (
    document.getElementById(tabStore.currentTabId.value!) as HTMLIFrameElement
  )?.contentWindow?.postMessage(
    {
      electronWebCmd: "postMessageCallback",
      cbid,
      data: res,
      code: 200,
    },
    "*",
  );
}

function invokeErrorCallback(cbid: string, res: unknown) {
  (
    document.getElementById(tabStore.currentTabId.value!) as HTMLIFrameElement
  )?.contentWindow?.postMessage(
    {
      electronWebCmd: "postMessageCallback",
      cbid,
      data: res,
      code: 400,
    },
    "*",
  );
}

export const addIframeWebEventListener = () => {
  window.addEventListener("message", async (event) => {
    const message = event.data as {
      iframeWebCmd: string;
      cbid: string;
      code: number;
      data: never;
    };
    if (message.iframeWebCmd) {
      console.log(message);
      if (message.iframeWebCmd !== "postMessageCallback") {
        if (handle[message.iframeWebCmd]) {
          try {
            const res = await handle[message.iframeWebCmd](message.data);
            invokeCallback(message.cbid, res);
          } catch (ex: unknown) {
            invokeErrorCallback(message.cbid, ex);
          }
        } else {
          invokeErrorCallback(
            message.cbid,
            `方法不存在：${message.iframeWebCmd}`,
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
    }
  });
};
