/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_USE_LOCAL_ASSETS?: string;
    readonly VITE_ASSET_CDN_BASE_URL?: string;
    // Add other env variables as needed
}

// Extend Vite's ImportMeta interface
declare module 'vite/client' {
    // eslint-disable-next-line no-unused-vars
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}
