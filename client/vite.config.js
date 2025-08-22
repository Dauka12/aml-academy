import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      // Оптимизация React
      fastRefresh: true,
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  assetsInclude: ["**/*.docx", "**/*.xlsx"],
  
  // Оптимизации сборки
  build: {
    // Минимизация bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделение vendor библиотек
          'react-vendor': ['react', 'react-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
          'router-vendor': ['react-router', 'react-router-dom'],
          'utils-vendor': ['axios', 'dayjs', 'i18next']
        }
      }
    },
    // Увеличиваем лимит для warning
    chunkSizeWarningLimit: 1000,
    // Минификация
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Удаляем console.log в production
        drop_debugger: true
      }
    }
  },
  
  // Оптимизации зависимостей
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom',
      'framer-motion'
    ],
    // Предварительная сборка для faster dev
    force: true
  },
  
  server: {
    port: 3000,
    // Предзагрузка модулей
    warmup: {
      clientFiles: [
        './src/pages/home/index.jsx',
        './src/components/header/v2/index.jsx',
        './src/App.jsx'
      ]
    },
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
        api: 'modern-compiler'
      }
    },
    // CSS code splitting
    devSourcemap: true
  },
  
  // Экспериментальные функции для производительности
  experimental: {
    renderBuiltUrl(filename) {
      return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
    }
  }
});
