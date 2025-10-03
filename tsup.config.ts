import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  splitting: false,
  sourcemap: false,
  banner: {
    js: `/**
 * cn-era v${require('./package.json').version}
 * (c) 2025-present Frank Lin
 * Released under the MIT License
 */`,
  },
});
