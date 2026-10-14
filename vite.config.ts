import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function vsaadApiPlugin() {
  return {
    name: 'vsaad-api-backend-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/api/vsaad')) {
          try {
            // Dynamic import of backend handler
            // @ts-ignore
            const api = await import('./server/vsaadApiHandler.js');
            const handled = await api.handleVsaadApiRequest(req, res);
            if (handled) return;
          } catch (e) {
            console.error('Error in VSAAD API middleware:', e);
          }
        }
        next();
      });
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/api/vsaad')) {
          try {
            // @ts-ignore
            const api = await import('./server/vsaadApiHandler.js');
            const handled = await api.handleVsaadApiRequest(req, res);
            if (handled) return;
          } catch (e) {
            console.error('Error in VSAAD API preview middleware:', e);
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vsaadApiPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons';
          }
          if (id.includes('node_modules/three/')) {
            return 'three';
          }
          if (id.includes('node_modules/gsap/')) {
            return 'gsap';
          }
        },
      },
    },
  },
});
