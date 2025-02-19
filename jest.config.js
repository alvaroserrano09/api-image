/* eslint-disable */
/** @type {import('ts-jest').JestConfigWithTsJest} */

require("dotenv").config();

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts", "!src/__tests__/**"],
  testMatch: ["**/src/**/*test.ts?(x)"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
