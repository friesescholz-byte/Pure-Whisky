import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/resend': {
        target: 'https://api.resend.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/resend/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      },
      '/api/mollie': {
        target: 'https://api.mollie.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mollie/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      }
    }
  }
})

