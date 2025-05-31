const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Add this line
  testEnvironment: "jest-environment-jsdom", // For testing React components
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Maps @/ to the root directory
  },
};

module.exports = createJestConfig(customJestConfig);
