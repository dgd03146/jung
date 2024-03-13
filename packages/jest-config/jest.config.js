const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',

  setupFilesAfterEnv: ['jest-config/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
};

const defineConfig = nextJest({ dir: './' });
module.exports = defineConfig(config);
