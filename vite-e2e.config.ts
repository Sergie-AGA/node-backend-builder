// E2E Test version
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    exclude: [...configDefaults.exclude, "**/src/domain/**/tests/unit/**"],
    environmentMatchGlobs: [["src/domain/**/tests/e2e/**", "prisma"]],
  },
});
