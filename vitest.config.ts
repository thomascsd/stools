import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    testTimeout: 200000,
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: [
        'coverage/**',
        'docs/**',
        'test/**',
        '**/*.d.ts',
        'vitest.config.ts',
        'tsdown.config.ts',
        'dist/**',
      ],
    },
    include: ['test/**/*.test.ts'],
  },
});
