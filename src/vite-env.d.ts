/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_USE_LOCAL_CANVAS?: string;
    // Add other env variables as needed
}

// Extend Vite's ImportMeta interface
declare module 'vite/client' {
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}
