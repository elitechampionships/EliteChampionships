import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/EliteChampionships/',
  plugins: [react()],
  server: {
    host: 'elitechampionships.pl',
    port: 3001,
  },
});
