import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const baseDir = process.env.VITE_BASE || './'; // Use environment variable or default to './'

  return {
    base: baseDir,
    build: {
      outDir: 'dist', // Customize the output directory if needed
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src"),
      },
    },
  };
});
