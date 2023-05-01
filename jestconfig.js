module.exports = {
    roots: ["<rootDir>/tests"],
    collectCoverage: true,
    collectCoverageFrom: [
      "<rootDir>/src/**/*.{ts,tsx}",
      "!**/*.d.ts",
      "!<rootDir>/src/main/**/*",
    ],
    coverageDirectory: "coverage",
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    testEnvironment: "jsdom",
    transform: {
      ".+\\.(ts|tsx)$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/src/main/modules/jest-setup.ts"],
    moduleDirectories: ["node_modules"],
    moduleNameMapper: {
      "@/(.*)": "<rootDir>/src/$1",
      "@/tests/(.*)": "<rootDir>/tests/$1",
      "\\.(jpg|jpeg|png)$": "<rootDir>/src/main/modules/jest-config-img.ts",
      "@/assets\\.(jpg|jpeg|png)$":
        "<rootDir>/src/main/modules/jest-config-img.ts",
    },
  };
  