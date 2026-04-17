import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Point at your XAMPP app URL so /gate.php and /assets proxy correctly during `npm run dev`.
const PHP_ORIGIN = process.env.VITE_PHP_ORIGIN ?? 'http://localhost/Myportfolio'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/gate.php': {
        target: PHP_ORIGIN,
        changeOrigin: true,
      },
      '/assets': {
        target: PHP_ORIGIN,
        changeOrigin: true,
      },
    },
  },
})
