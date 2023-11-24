import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@src': resolve(__dirname, './src'),
            '@asset': resolve(__dirname, './src/asset'),
            '@component': resolve(__dirname, './src/component'),
            '@page': resolve(__dirname, './src/page'),
            '@util': resolve(__dirname, './src/util'),
            '@style': resolve(__dirname, './src/style'),
            '@config': resolve(__dirname, './src/config'),
            '@mock': resolve(__dirname, './mock')
        }
    },
    build: {
        target: 'es2015',
        minify: 'terser',
        cssCodeSplit: true,
        rollupOptions: {
            plugins: []
        }
    },
    server: {
        // 代理
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        },
        hmr: {
            overlay: false
        }
    }
})
