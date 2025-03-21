import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { defineConfig } from 'tsup';

import pkg from './package.json';
const externals = [
	...Object.keys(pkg.dependencies || {}),
	...Object.keys(pkg.peerDependencies || {}),
];

export default defineConfig({
	sourcemap: false,
	treeshake: true,
	entry: ['components/index.ts', 'tokens/index.ts', 'styles/index.ts'],
	format: ['esm'],
	splitting: false,
	dts: true,
	clean: true,
	minify: true,
	metafile: true,
	external: externals,
	esbuildPlugins: [
		vanillaExtractPlugin({
			identifiers: 'short',
			outputCss: true,
		}),
	],
});
