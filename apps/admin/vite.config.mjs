/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import baseConfig from "@jung/configs/vitest.config.mjs"
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [TanStackRouterVite(),react(), vanillaExtractPlugin(),  ],
  test: {
    ...baseConfig.test,
    // 추가적인 Vitest 설정
  },
  resolve: {
    alias: {
      '@/fsd': path.resolve(__dirname, './src'),
      '@jung/server': path.resolve(__dirname, '../../packages/server'),
      '@jung/design-system': path.resolve(__dirname, '../../packages/design-system'),
      '@jung/design-system/icons': path.resolve(__dirname, '../../packages/design-system/icons'),
    },
  },
  // 기타 Vite 설정
})