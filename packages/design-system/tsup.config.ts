import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { defineConfig } from 'tsup';

export default defineConfig({
	treeshake: true,
	entry: ['./**/*.tsx'],
	format: ['esm', 'cjs'],
	splitting: true,
	dts: true,
	sourcemap: true,
	clean: true,
	minify: true,
	external: ['react', 'react-dom'],
	esbuildPlugins: [vanillaExtractPlugin()],
});
