import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	server: {
		port: 3001,
	},
	plugins: [
		TanStackRouterVite(),
		react(),
		vanillaExtractPlugin(),
		tsConfigPaths(),
	],
});
