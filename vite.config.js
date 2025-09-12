import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: "http://36.94.68.175:3001",
        changeOrigin: true,
      }
    }
  }
})
