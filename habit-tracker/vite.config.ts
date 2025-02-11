import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../Src/wwwroot',
    emptyOutDir: true,
    manifest: true
  },
  server: {
    cors: true,
    strictPort: true,
    port: 5173
  }
})
