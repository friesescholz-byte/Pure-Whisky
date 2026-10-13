import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      allowedHosts: true,
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
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.MOLLIE_API_KEY;
              if (key && !proxyReq.getHeader('authorization')) {
                proxyReq.setHeader('Authorization', `Bearer ${key.trim()}`);
              }
            });
          },
          headers: {
            'User-Agent': 'Mozilla/5.0'
          }
        }
      }
    }
  };
});

