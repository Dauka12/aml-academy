// Конфигурация для оптимизации production build
// Используется с Vite.js

export const performanceConfig = {
    // Настройки для lazy loading
    lazyLoading: {
        enabled: true,
        threshold: 0.1,
        rootMargin: '50px',
        preloadDelay: 100
    },
    
    // Настройки для batch rendering
    batchRendering: {
        enabled: true,
        batchSize: 10,
        delay: 16 // ms
    },
    
    // Настройки для мониторинга производительности
    performance: {
        monitoring: process.env.NODE_ENV === 'development',
        warningThreshold: 16, // ms
        errorThreshold: 100 // ms
    },
    
    // Настройки для кэширования
    caching: {
        enabled: true,
        ttl: 5 * 60 * 1000, // 5 минут
        maxSize: 100 // максимальное количество элементов в кэше
    },
    
    // Настройки для виртуализации
    virtualization: {
        enabled: false, // включать только для очень больших списков
        threshold: 1000, // количество элементов, после которого включается виртуализация
        itemHeight: 50,
        containerHeight: 400
    }
};

// Конфигурация для различных окружений
export const getConfigForEnvironment = (env) => {
    const baseConfig = { ...performanceConfig };
    
    switch (env) {
        case 'development':
            return {
                ...baseConfig,
                performance: {
                    ...baseConfig.performance,
                    monitoring: true
                },
                lazyLoading: {
                    ...baseConfig.lazyLoading,
                    enabled: false // отключаем в development для удобства отладки
                }
            };
            
        case 'production':
            return {
                ...baseConfig,
                performance: {
                    ...baseConfig.performance,
                    monitoring: false
                },
                lazyLoading: {
                    ...baseConfig.lazyLoading,
                    enabled: true
                }
            };
            
        case 'testing':
            return {
                ...baseConfig,
                lazyLoading: {
                    ...baseConfig.lazyLoading,
                    enabled: false
                },
                performance: {
                    ...baseConfig.performance,
                    monitoring: false
                }
            };
            
        default:
            return baseConfig;
    }
};

// Дополнительные конфигурации для Vite
export const viteOptimizationConfig = {
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Разделяем компоненты курсов на отдельные chunks
                    'course-common': [
                        '/src/components/courseTemplates/common/BoxOfThree',
                        '/src/components/courseTemplates/common/Centered',
                        '/src/components/courseTemplates/common/SimpleTable',
                        '/src/components/courseTemplates/common/Sizebox'
                    ],
                    'course-complex': [
                        '/src/components/courseTemplates/complex/Component52',
                        '/src/components/courseTemplates/complex/CustomCarousel',
                        '/src/components/courseTemplates/complex/DragAndDropTwoSide'
                    ],
                    'course-interactive': [
                        '/src/components/courseTemplates/complex/interactives/DropdownList',
                        '/src/components/courseTemplates/complex/interactives/ImageWithPoints',
                        '/src/components/courseTemplates/complex/interactives/OneToFour'
                    ]
                }
            }
        },
        chunkSizeWarningLimit: 1000,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            '@emotion/react',
            '@emotion/styled'
        ]
    }
};

// Webpack конфигурация (если используется)
export const webpackOptimizationConfig = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                courseComponents: {
                    test: /[\\/]src[\\/]components[\\/]courseTemplates[\\/]/,
                    name: 'course-components',
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        usedExports: true,
        sideEffects: false
    },
    resolve: {
        alias: {
            // Оптимизация импортов
            '@components': '/src/components',
            '@utils': '/src/utils',
            '@hooks': '/src/hooks'
        }
    }
};

// Service Worker конфигурация для кэширования
export const serviceWorkerConfig = {
    runtimeCaching: [
        {
            urlPattern: /\/api\/courses/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'courses-cache',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 60 * 60 * 24 // 24 часа
                }
            }
        },
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images-cache',
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 60 * 60 * 24 * 30 // 30 дней
                }
            }
        }
    ]
};

// CDN конфигурация для статических ресурсов
export const cdnConfig = {
    enabled: process.env.NODE_ENV === 'production',
    baseUrl: process.env.VITE_CDN_URL || '',
    resources: [
        {
            pattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            path: '/images/'
        },
        {
            pattern: /\.(?:woff|woff2|ttf|eot)$/,
            path: '/fonts/'
        },
        {
            pattern: /\.(?:mp4|webm|ogg)$/,
            path: '/videos/'
        }
    ]
};
