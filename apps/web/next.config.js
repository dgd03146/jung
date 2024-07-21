const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin(
	{ identifiers: 'short'}
);

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@jung/design-system'],


	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = withVanillaExtract(nextConfig);
