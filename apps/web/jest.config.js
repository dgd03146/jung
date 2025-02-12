const config = require("@jung/configs/jest.config");
const nextJest = require("next/jest");

const defineConfig = nextJest({ dir: "./" });

module.exports = defineConfig(config);
