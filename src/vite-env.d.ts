/// <reference types="vite/client" />

interface ImportMetaEnv {
  NODE_ENV: string;
  VITE_MODE: "dev" | "test" | "prod";
  VITE_ENTRY_URL: string;
  VITE_HOST: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
