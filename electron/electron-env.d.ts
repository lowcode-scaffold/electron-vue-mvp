/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string;
    /** /dist/ or /public/ */
    VITE_PUBLIC: string;
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: {
    addEventListener: (
      key: "message",
      listener: (message: {
        cmd: string;
        cbid: string;
        data: unknown;
        code?: number;
      }) => void,
    ) => void;
    postMessage: (message: {
      cmd: string;
      cbid?: string;
      code?: number;
      data: unknown;
    }) => void;
  };
}
