// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Allows using global expect
    environment: 'jsdom', // Use jsdom to simulate a browser environment
    setupFiles: '../game-of-life-frontend/vitest.setup.ts'
  },
});
