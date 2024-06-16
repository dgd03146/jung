import baseConfig from "@jung/configs/vitest.config.mjs"
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins:[...baseConfig.plugins],
  test: {...baseConfig.test}
});