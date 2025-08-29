import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Map styles subpath first so it takes precedence over the base alias
      { find: '@vibe-kanban/ui-kit/styles', replacement: resolve(__dirname, '../src/styles/tokens.css') },
      // Map the package entry to local source for live editing
      { find: '@vibe-kanban/ui-kit', replacement: resolve(__dirname, '../src') },
      // Support internal src alias used in the kit (e.g. '@/lib/utils')
      { find: '@', replacement: resolve(__dirname, '../src') },
    ],
  },
  server: {
    port: 3001,
  },
});
