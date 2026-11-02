import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // O chunk do Three.js (~140 kB gzip) é carregado sob demanda, depois da
    // primeira pintura; não bloqueia o conteúdo. O limite cobre só ele.
    chunkSizeWarningLimit: 600,
  },
})
