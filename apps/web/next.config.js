const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin(
	{ identifiers: 'short'}
);

/** @type {import('next').NextConfig} */
const nextConfig = {

	  /** Enables hot reloading for local packages without a build step */
	transpilePackages: ['@jung/design-system', '@jung/server'],
	
	compress: true,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = withVanillaExtract(nextConfig);
