const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = { transpilePackages: ["@jung/design-system"] };

module.exports = withVanillaExtract(nextConfig);
