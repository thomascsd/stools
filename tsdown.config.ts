import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.ts', // 入口檔案
  exports: true,
  copy: [
    { from: 'package.json', to: 'dist/package.json' },
    { from: 'README.md', to: 'dist/README.md' },
  ],
});
