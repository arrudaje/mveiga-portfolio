/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_USE_NAVIGATION: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }