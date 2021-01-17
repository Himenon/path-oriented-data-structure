module.exports = {
  automock: false,
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.build.json",
      diagnostics: false,
    },
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "tools.ts", "sample.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  unmockedModulePathPatterns: ["<rootDir>/node_modules/*"],
};
