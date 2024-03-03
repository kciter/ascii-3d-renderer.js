import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ascii-3d-renderer",
      fileName: "ascii-3d-renderer",
    },
    rollupOptions: {
      output: {},
    },
  },
});
