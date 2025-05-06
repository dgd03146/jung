const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', 
  openAnalyzer: true,
})


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
    deviceSizes: [360, 480, 768, 1024, 1280, 1440, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    imageSizes: [
      32, 40, 80, 128, 
      180,200, 300,  
      450, 650, 
      800, 1000
    ],

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

module.exports = withBundleAnalyzer(withVanillaExtract(nextConfig));