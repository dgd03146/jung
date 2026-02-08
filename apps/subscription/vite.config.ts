import path from 'node:path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	server: {
		port: 3001,
	},
	envDir: path.resolve(__dirname, '../admin'),
	plugins: [TanStackRouterVite(), react(), tsConfigPaths()],
});
