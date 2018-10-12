module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupTestFrameworkScriptFile: "<rootDir>/tests/setupEnzyme.ts",
  coverageReporters: [
    "lcov",
    "json"
  ],
  coverageDirectory: "coverage",
  testResultsProcessor: "jest-sonar-reporter",
  setupFiles: [
    "./tests/dom.js"
  ]
}