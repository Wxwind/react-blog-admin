import { defineConfig, type PluginOption } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./build",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
  plugins: [react(), removeConsole(), visualizer() as PluginOption],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
    proxy: {
      "/api": {
        target: "http://121.41.118.167:6211",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/fileServer": {
        target: "http://121.41.118.167:7123/static",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fileServer/, ""),
      },
    },
  },
  preview: {
    port: 4174,
    proxy: {
      "/api": {
        target: "http://121.41.118.167:6211",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/fileServer": {
        target: "http://121.41.118.167:7123/static",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fileServer/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        //additionalData: `@import "./src/common/styles/global.scss";`,
      },
    },
  },
});
