const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = { transpilePackages: ["@imgeozi/design-system"] };

module.exports = withVanillaExtract(nextConfig);
