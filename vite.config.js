// File konfigurasi Vite - ini adalah pengaturan utama untuk project kita
// Vite adalah tool yang membantu kita membuat dan menjalankan aplikasi web dengan cepat

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // plugins: daftar plugin yang kita gunakan
  // Plugin react membantu Vite mengerti dan memproses file React (JSX)
  plugins: [react()],
})
