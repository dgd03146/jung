/// <reference types="vitest" />
/// <reference types="vite/client" />

import baseConfig from "@jung/configs/vitest.config.mjs"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),...baseConfig.plugins],
  test: {
    ...baseConfig.test
  }
});
