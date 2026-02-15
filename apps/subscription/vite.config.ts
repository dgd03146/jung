import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	server: {
		port: 3001,
	},
	plugins: [
		tsConfigPaths(),
		vanillaExtractPlugin(),
		tanstackStart(),
		viteReact(),
	],
	resolve: {
		dedupe: ['react', 'react-dom'],
	},
	ssr: {
		external: ['@resvg/resvg-wasm'],
	},
});
