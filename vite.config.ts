import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No VITE_-prefixed secrets: the Gemini key is only read by the server (Tech Spec §7.1).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:8787' },
  },
  build: { outDir: 'dist', chunkSizeWarningLimit: 1500 },
});
