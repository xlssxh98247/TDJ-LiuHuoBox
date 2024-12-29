import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  publicPath: '/TDJ-LiuHuoBox/',
  base: '/TDJ-LiuHuoBox/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./TDJ-LiuHuoBox/src', import.meta.url))
    },
  },
})
