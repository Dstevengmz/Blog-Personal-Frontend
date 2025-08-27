import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Esto permite acceso desde otros dispositivos en la red
    port: 5173       // Puedes cambiarlo si necesitas otro puerto
  }
})
