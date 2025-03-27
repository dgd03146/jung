import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { defineConfig } from 'tsup';

import pkg from './package.json';

const externals = [
	...Object.keys(pkg.peerDependencies || {}),
	...Object.keys(pkg.dependencies || {}),
];

export default defineConfig({
	sourcemap: false,
	treeshake: true,
	entry: ['components/index.ts', 'tokens/index.ts', 'styles/index.ts'],
	format: ['esm'],
	splitting: true,
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
