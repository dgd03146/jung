import { SHARED_DEVICE_SIZES, SHARED_IMAGE_SIZES } from './src/shared/config/imageSizes.js';

import vanillaExtractPluginPkg from '@vanilla-extract/next-plugin';
const { createVanillaExtractPlugin } = vanillaExtractPluginPkg;

import nextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const withVanillaExtract = createVanillaExtractPlugin(
  { identifiers: 'short'}
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@jung/design-system', '@jung/server'],
  
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: SHARED_DEVICE_SIZES,
    minimumCacheTTL: 60 * 60 * 24 * 7,
    imageSizes: SHARED_IMAGE_SIZES,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nfbbfuiostvsiknfaryn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ssl.pstatic.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default withBundleAnalyzer(withVanillaExtract(nextConfig));