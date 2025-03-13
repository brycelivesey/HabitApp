import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // outDir: 'dist',
    emptyOutDir: true,
    manifest: true,
    // Might need these for .NET integration
    assetsDir: '',
    sourcemap: false
  },
  server: {
    cors: true,
    strictPort: true,
    port: 5173
  }
})
