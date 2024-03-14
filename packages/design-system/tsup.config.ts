import { defineConfig } from 'tsup';

export default defineConfig({
	treeshake: true,
	entry: ['./**/*.tsx', './**/*.css.ts'],
	format: ['esm'],
	splitting: true,
	dts: true,
	sourcemap: true,
	clean: true,
	minify: true,
	external: ['react'],
});
