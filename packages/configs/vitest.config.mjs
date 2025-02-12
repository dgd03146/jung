import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import path from 'path';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// setupFiles absolute route
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins:[vanillaExtractPlugin()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: [path.resolve(__dirname, './setupTests.js')],
	},
});
