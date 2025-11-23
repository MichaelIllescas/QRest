import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  
  // Directorio raíz donde se encuentran los tests
  roots: ['<rootDir>/src'],
  
  // Patrón de archivos de test
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  
  // Transformar archivos TypeScript
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  
  // Setup de testing library
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Mapeo de módulos para imports absolutos
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/**/*.types.ts',
  ],
  
  // Limpiar mocks automáticamente
  clearMocks: true,
  
  // Verbose output
  verbose: true,
};

export default config;
