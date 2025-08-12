// Performance utilities для оптимизации React приложения

// 1. Debounce hook для оптимизации событий
import { useState, useEffect, useCallback, useRef } from 'react';

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// 2. Throttle hook для ограничения частоты вызовов
export const useThrottle = (callback, delay) => {
    const lastCallRef = useRef(0);

    return useCallback((...args) => {
        const now = Date.now();
        if (now - lastCallRef.current >= delay) {
            lastCallRef.current = now;
            callback(...args);
        }
    }, [callback, delay]);
};

// 3. Intersection Observer hook с расширенными опциями
export const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
            if (entry.isIntersecting && !hasIntersected) {
                setHasIntersected(true);
            }
        }, {
            threshold: 0.1,
            rootMargin: '50px',
            ...options
        });

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [options, hasIntersected]);

    return [ref, isIntersecting, hasIntersected];
};

// 4. Hook для измерения производительности компонентов
export const usePerformanceMonitor = (componentName) => {
    const renderStartTime = useRef(performance.now());

    useEffect(() => {
        const renderEndTime = performance.now();
        const renderTime = renderEndTime - renderStartTime.current;
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
        }
        
        // Отправка метрик в production
        if (process.env.NODE_ENV === 'production' && renderTime > 16) {
            // Отправка в аналитику (например, Google Analytics)
            if (window.gtag) {
                window.gtag('event', 'timing_complete', {
                    name: 'component_render',
                    value: Math.round(renderTime),
                    custom_parameter: componentName
                });
            }
        }
        
        renderStartTime.current = performance.now();
    });
};

// 5. Hook для предзагрузки компонентов
export const usePreloadComponent = (importFunction, shouldPreload = true) => {
    useEffect(() => {
        if (shouldPreload) {
            // Предзагружаем компонент с небольшой задержкой
            const timer = setTimeout(() => {
                importFunction();
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [importFunction, shouldPreload]);
};

// 6. Утилита для batch updates
export const batchUpdates = (callback) => {
    // В React 18+ автоматический batching включен
    if (typeof React !== 'undefined' && React.version >= '18') {
        callback();
    } else {
        // Для старых версий React
        Promise.resolve().then(callback);
    }
};

// 7. Memory leak prevention
export const useComponentCleanup = () => {
    const timeoutsRef = useRef([]);
    const intervalsRef = useRef([]);
    const requestsRef = useRef([]);

    const addTimeout = useCallback((timeout) => {
        timeoutsRef.current.push(timeout);
        return timeout;
    }, []);

    const addInterval = useCallback((interval) => {
        intervalsRef.current.push(interval);
        return interval;
    }, []);

    const addRequest = useCallback((request) => {
        requestsRef.current.push(request);
        return request;
    }, []);

    useEffect(() => {
        return () => {
            // Очистка всех таймеров
            timeoutsRef.current.forEach(clearTimeout);
            intervalsRef.current.forEach(clearInterval);
            
            // Отмена всех запросов
            requestsRef.current.forEach(request => {
                if (request.abort) request.abort();
            });
        };
    }, []);

    return { addTimeout, addInterval, addRequest };
};

// 8. Optimize re-renders hook
export const useOptimizedState = (initialState) => {
    const [state, setState] = useState(initialState);
    
    const optimizedSetState = useCallback((newState) => {
        setState(prevState => {
            // Shallow comparison для предотвращения ненужных обновлений
            if (typeof newState === 'object' && newState !== null) {
                const hasChanged = Object.keys(newState).some(
                    key => newState[key] !== prevState[key]
                );
                return hasChanged ? { ...prevState, ...newState } : prevState;
            }
            return newState !== prevState ? newState : prevState;
        });
    }, []);

    return [state, optimizedSetState];
};

// 9. Image lazy loading utility
export const createImageLoader = () => {
    const imageCache = new Map();
    
    const loadImage = (src) => {
        if (imageCache.has(src)) {
            return imageCache.get(src);
        }
        
        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
        
        imageCache.set(src, promise);
        return promise;
    };
    
    return { loadImage, cache: imageCache };
};

// 10. Virtual scrolling utility (базовая реализация)
export const useVirtualScrolling = (items, itemHeight, containerHeight) => {
    const [scrollTop, setScrollTop] = useState(0);
    
    const visibleItemsCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleItemsCount + 1, items.length);
    
    const visibleItems = items.slice(startIndex, endIndex);
    const totalHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;
    
    return {
        visibleItems,
        totalHeight,
        offsetY,
        setScrollTop,
        startIndex,
        endIndex
    };
};

// 11. Мемоизация с time-based expiration
export const useTimedMemo = (factory, deps, ttl = 5000) => {
    const cacheRef = useRef({ value: null, timestamp: 0, deps: [] });
    
    return useMemo(() => {
        const now = Date.now();
        const cache = cacheRef.current;
        
        // Проверяем, изменились ли зависимости или истек TTL
        const depsChanged = deps.some((dep, index) => dep !== cache.deps[index]);
        const expired = now - cache.timestamp > ttl;
        
        if (depsChanged || expired || cache.value === null) {
            cache.value = factory();
            cache.timestamp = now;
            cache.deps = [...deps];
        }
        
        return cache.value;
    }, deps);
};

// 12. Error boundary hook
export const useErrorBoundary = () => {
    const [error, setError] = useState(null);
    
    const resetError = useCallback(() => {
        setError(null);
    }, []);
    
    const captureError = useCallback((error) => {
        setError(error);
        
        // Отправка ошибки в систему мониторинга
        if (process.env.NODE_ENV === 'production') {
            console.error('Component error:', error);
            // Здесь можно добавить отправку в Sentry, LogRocket и т.д.
        }
    }, []);
    
    useEffect(() => {
        const handleError = (event) => {
            captureError(event.error);
        };
        
        const handleUnhandledRejection = (event) => {
            captureError(event.reason);
        };
        
        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);
        
        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, [captureError]);
    
    return { error, resetError, captureError };
};
