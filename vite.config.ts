import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/planets-fact-site/',
  plugins: [react()],
  build: {
    assetsDir: 'assets',
    // ... other configs
  },
});
