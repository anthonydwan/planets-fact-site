import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/planets-fact-site/',
  build: {
    assetsDir: 'assets',
    // ... other configs
  },
});
