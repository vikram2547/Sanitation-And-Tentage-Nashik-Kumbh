import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,        // 👈 run on port 3000
    strictPort: true   // 👈 if 3000 is busy, fail instead of changing port
  }
});