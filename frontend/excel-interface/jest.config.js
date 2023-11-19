const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",

});
const customJestConfig = {

  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",

};

// My savior https://github.com/vercel/next.js/discussions/42535
const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    collectCoverage: true,
    moduleNameMapper: {
      // Workaround to put our SVG mock first
      "\\.svg$": "<rootDir>/__mocks__/svg.js",
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

module.exports = jestConfig;