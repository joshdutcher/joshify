/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_USE_LOCAL_CANVAS?: string;
    // Add other env variables as needed
}

// Extend Vite's ImportMeta interface
declare module 'vite/client' {
    // eslint-disable-next-line no-unused-vars
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}
