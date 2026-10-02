// tsdown.config.ts – keeps the build step explicit and reproducible
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',       // entry point
  outDir: 'dist',              // standard build folder
  format: ['esm'],             // ESM output – works with Node 20+
  dts: true,                   // generate .d.ts files (tsdown does it automatically)
  clean: true,                 // wipe dist before each build
  sourcemap: true              // handy local debugging
});
