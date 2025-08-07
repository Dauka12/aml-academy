import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.docx", "**/*.xlsx"],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8444",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // Использовать новый API
      }
    }
  },
  optimizeDeps: {
    exclude: ['@react-three/postprocessing'],
    include: ['@react-three/fiber', '@react-three/drei', 'three']
  },
  resolve: {
    dedupe: ['react', 'react-dom', '@react-three/fiber']
  }
});
