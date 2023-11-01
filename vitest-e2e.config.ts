// E2E Test version
import swc from "unplugin-swc";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: "es6" },
    }),
  ],
  test: {
    include: ["**/src/domain/**/*.e2e-spec.ts"],
    globals: true,
    root: "./",
    setupFiles: ["./src/env/setup-e2e.ts"],
  },
});
