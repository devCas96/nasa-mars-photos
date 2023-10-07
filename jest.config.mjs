import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '<rootDir>/src/components/**',
    '<rootDir>/src/pages/api/**',
    '!<rootDir>/src/constants/**',
    '!<rootDir>/src/styles/**',
    '!<rootDir>/src/utils/**',
    '!<rootDir>/src/types/**',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
};

export default createJestConfig(config);
