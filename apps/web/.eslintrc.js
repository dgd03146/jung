/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    jest: true,
  },
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
