import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/content.js"),
        panel: resolve(__dirname, "src/panel/panel.html"),
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === "content" ? "content.js" : "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
