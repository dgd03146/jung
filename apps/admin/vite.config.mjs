/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import baseConfig from "@jung/configs/vitest.config.mjs"
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'
import {removeUseClient} from './removeUseClient'





export default defineConfig({
  plugins: [TanStackRouterVite(),react(), vanillaExtractPlugin(),removeUseClient()  ],
  test: {
    ...baseConfig.test,
    // 추가적인 Vitest 설정
  },

  define: {
    'process.env': {},
  },

  resolve: {
    alias: {
      '@/fsd': path.resolve(__dirname, './src'),
      '@jung/api': path.resolve(__dirname, '../../packages/api'),
      '@jung/design-system': path.resolve(__dirname, '../../packages/design-system'),
      '@jung/design-system/icons': path.resolve(__dirname, '../../packages/design-system/icons'),
    },
    dedupe: ['react', 'react-dom'],
  },
  // 기타 Vite 설정
})