import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Point at your XAMPP app URL for PHP routes during `npm run dev`.
// Do not proxy `/assets` — project images live in `public/assets` and must be served by Vite.
const PHP_ORIGIN = process.env.VITE_PHP_ORIGIN ?? 'http://localhost/Myportfolio'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/gate.php': {
        target: PHP_ORIGIN,
        changeOrigin: true,
      },
    },
  },
})
