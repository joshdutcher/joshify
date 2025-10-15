import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
    plugins: [
        react(),
        ViteImageOptimizer({
            // Test mode - only process files in public/album-art
            test: /\.(png|jpe?g)$/i,
            includePublic: true,
            logStats: true,

            // PNG optimization settings
            png: {
                quality: 90,
            },

            // Auto-generate WebP versions
            webp: {
                quality: 90,
            },

            // Cache optimized images
            cache: true,
            cacheLocation: '.cache/vite-image-optimizer',
        })
    ],
    server: {
        port: 3000,
        open: true
    },
    preview: {
        open: false,
        host: true,
        allowedHosts: [
            'joshify-production.up.railway.app',
            'www.joshify.dev',
            'joshify.dev'
        ]
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/hooks': path.resolve(__dirname, './src/hooks'),
            '@/data': path.resolve(__dirname, './src/data'),
            '@/utils': path.resolve(__dirname, './src/utils'),
            '@/types': path.resolve(__dirname, './src/types'),
        },
    },
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.[tj]sx?$/,
        exclude: []
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
                '.ts': 'tsx',
                '.tsx': 'tsx'
            }
        }
    }
})