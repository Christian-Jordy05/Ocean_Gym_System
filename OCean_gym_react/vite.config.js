import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite el acceso desde otras máquinas en la red
    port: 5173, // Asegúrate de que el puerto sea el correcto
    watch: {
      usePolling: true,
    },
  },  
})
