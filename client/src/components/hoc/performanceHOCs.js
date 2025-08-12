import React, { Suspense, lazy, memo } from 'react';
import { useIntersectionObserver, usePerformanceMonitor } from '../utils/performanceUtils';

// HOC для оптимизации производительности компонентов
export const withPerformanceOptimization = (WrappedComponent, options = {}) => {
    const {
        enableLazyLoading = true,
        enableIntersectionObserver = true,
        enablePerformanceMonitoring = false,
        fallback = <div>Loading...</div>,
        componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
    } = options;

    const OptimizedComponent = memo((props) => {
        // Performance monitoring
        if (enablePerformanceMonitoring) {
            usePerformanceMonitor(componentName);
        }

        // Intersection Observer для видимости
        const [ref, isIntersecting] = useIntersectionObserver();

        if (enableIntersectionObserver && !isIntersecting) {
            return (
                <div 
                    ref={ref} 
                    className="component-placeholder min-h-[50px] bg-gray-50 rounded-lg"
                    style={{ minHeight: '50px' }}
                />
            );
        }

        return (
            <div ref={enableIntersectionObserver ? ref : null}>
                {enableLazyLoading ? (
                    <Suspense fallback={fallback}>
                        <WrappedComponent {...props} />
                    </Suspense>
                ) : (
                    <WrappedComponent {...props} />
                )}
            </div>
        );
    });

    OptimizedComponent.displayName = `withPerformanceOptimization(${componentName})`;
    return OptimizedComponent;
};

// HOC для batch rendering больших списков
export const withBatchRendering = (WrappedComponent, batchSize = 10) => {
    const BatchedComponent = memo(({ items = [], ...props }) => {
        const [renderCount, setRenderCount] = React.useState(batchSize);

        React.useEffect(() => {
            if (renderCount < items.length) {
                const timer = setTimeout(() => {
                    setRenderCount(prev => Math.min(prev + batchSize, items.length));
                }, 16); // Рендерим следующую порцию в следующем фрейме

                return () => clearTimeout(timer);
            }
        }, [renderCount, items.length]);

        const visibleItems = items.slice(0, renderCount);

        return (
            <>
                <WrappedComponent {...props} items={visibleItems} />
                {renderCount < items.length && (
                    <div className="flex justify-center py-4">
                        <div className="animate-pulse text-gray-500">Загружается еще...</div>
                    </div>
                )}
            </>
        );
    });

    BatchedComponent.displayName = `withBatchRendering(${WrappedComponent.displayName || WrappedComponent.name})`;
    return BatchedComponent;
};

// HOC для error boundary
export const withErrorBoundary = (WrappedComponent, errorFallback = null) => {
    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false, error: null };
        }

        static getDerivedStateFromError(error) {
            return { hasError: true, error };
        }

        componentDidCatch(error, errorInfo) {
            console.error('Component Error:', error, errorInfo);
            
            // Отправка ошибки в систему мониторинга
            if (process.env.NODE_ENV === 'production') {
                // Здесь можно добавить отправку в Sentry, LogRocket и т.д.
            }
        }

        render() {
            if (this.state.hasError) {
                if (errorFallback) {
                    return errorFallback(this.state.error);
                }
                
                return (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="text-red-800 font-semibold">Что-то пошло не так</h3>
                        <p className="text-red-600 text-sm mt-2">
                            Произошла ошибка при рендеринге компонента. Попробуйте обновить страницу.
                        </p>
                        <button 
                            onClick={() => this.setState({ hasError: false, error: null })}
                            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Попробовать снова
                        </button>
                    </div>
                );
            }

            return <WrappedComponent {...this.props} />;
        }
    }

    ErrorBoundary.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;
    return ErrorBoundary;
};

// HOC для мемоизации пропсов
export const withMemoizedProps = (WrappedComponent, propKeys = []) => {
    const MemoizedComponent = memo(WrappedComponent, (prevProps, nextProps) => {
        // Если не указаны конкретные ключи, сравниваем все пропсы
        if (propKeys.length === 0) {
            return Object.keys(prevProps).every(key => 
                prevProps[key] === nextProps[key]
            );
        }
        
        // Сравниваем только указанные ключи
        return propKeys.every(key => 
            prevProps[key] === nextProps[key]
        );
    });

    MemoizedComponent.displayName = `withMemoizedProps(${WrappedComponent.displayName || WrappedComponent.name})`;
    return MemoizedComponent;
};

// Compose HOCs utility
export const compose = (...hocs) => (WrappedComponent) => {
    return hocs.reduceRight((acc, hoc) => hoc(acc), WrappedComponent);
};

// Пример использования всех HOCs вместе
export const withAllOptimizations = (WrappedComponent, options = {}) => {
    return compose(
        (Component) => withErrorBoundary(Component, options.errorFallback),
        (Component) => withPerformanceOptimization(Component, options.performance),
        (Component) => withMemoizedProps(Component, options.memoKeys),
        (Component) => options.batchSize ? withBatchRendering(Component, options.batchSize) : Component
    )(WrappedComponent);
};

// Utility для создания lazy компонентов с preloading
export const createLazyComponent = (importFunction, preload = false) => {
    const LazyComponent = lazy(importFunction);
    
    if (preload) {
        // Предзагружаем компонент
        importFunction();
    }
    
    return LazyComponent;
};

// Hook для оптимизации списков с виртуализацией
export const useVirtualList = (items, itemHeight = 50, containerHeight = 400) => {
    const [scrollTop, setScrollTop] = React.useState(0);
    const [containerRef, setContainerRef] = React.useState(null);
    
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        startIndex + Math.ceil(containerHeight / itemHeight) + 1,
        items.length
    );
    
    const visibleItems = React.useMemo(() => 
        items.slice(startIndex, endIndex).map((item, index) => ({
            ...item,
            index: startIndex + index
        }))
    , [items, startIndex, endIndex]);
    
    const totalHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;
    
    const handleScroll = React.useCallback((e) => {
        setScrollTop(e.target.scrollTop);
    }, []);
    
    return {
        containerRef: setContainerRef,
        visibleItems,
        totalHeight,
        offsetY,
        handleScroll,
        scrollTop
    };
};
