// Утилиты для оптимизации загрузки ресурсов

/**
 * Предзагрузка изображений
 */
export const preloadImages = (imageSources) => {
  return Promise.all(
    imageSources.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    })
  );
};

/**
 * Предзагрузка модулей React
 */
export const preloadRoutes = (routeModules) => {
  return Promise.all(
    routeModules.map((moduleImport) => {
      try {
        return moduleImport();
      } catch (error) {
        console.warn('Ошибка предзагрузки модуля:', error);
        return null;
      }
    })
  );
};

/**
 * Ленивая загрузка видео с Intersection Observer
 */
export class LazyVideoLoader {
  constructor(videoElement, options = {}) {
    this.video = videoElement;
    this.options = {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    };
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.options
      );
      this.observer.observe(this.video);
    } else {
      // Fallback для старых браузеров
      this.loadVideo();
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.loadVideo();
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadVideo() {
    if (this.video.dataset.src) {
      this.video.src = this.video.dataset.src;
      this.video.load();
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * Throttle функция для оптимизации обработчиков событий
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Debounce функция для оптимизации поиска и ввода
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
};

/**
 * Проверка поддержки WebP формата
 */
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Оптимизированная загрузка шрифтов
 */
export const loadFonts = (fontUrls) => {
  return Promise.all(
    fontUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = url;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
    })
  );
};

/**
 * Создание Resource Hints для оптимизации
 */
export const createResourceHints = (domains, type = 'dns-prefetch') => {
  domains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = type;
    link.href = domain;
    document.head.appendChild(link);
  });
};

/**
 * Проверка возможностей браузера
 */
export const getBrowserCapabilities = () => {
  return {
    webp: 'WebPSupport' in window || supportsWebP(),
    webWorkers: 'Worker' in window,
    serviceWorkers: 'serviceWorker' in navigator,
    intersectionObserver: 'IntersectionObserver' in window,
    requestIdleCallback: 'requestIdleCallback' in window,
    modernJS: 'fetch' in window && 'Promise' in window,
  };
};

/**
 * Адаптивная загрузка в зависимости от соединения
 */
export const getConnectionInfo = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) {
    return { effectiveType: '4g', saveData: false };
  }
  
  return {
    effectiveType: connection.effectiveType,
    saveData: connection.saveData || false,
    downlink: connection.downlink,
    rtt: connection.rtt
  };
};

/**
 * Определение стратегии загрузки на основе соединения
 */
export const getLoadingStrategy = () => {
  const { effectiveType, saveData } = getConnectionInfo();
  
  if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
    return {
      preloadVideo: false,
      imageQuality: 'low',
      lazyLoadThreshold: 0.1,
      prefetchRoutes: false
    };
  }
  
  if (effectiveType === '3g') {
    return {
      preloadVideo: false,
      imageQuality: 'medium',
      lazyLoadThreshold: 0.2,
      prefetchRoutes: true
    };
  }
  
  // 4g и выше
  return {
    preloadVideo: true,
    imageQuality: 'high',
    lazyLoadThreshold: 0.3,
    prefetchRoutes: true
  };
};

/**
 * Хук для управления производительностью
 */
export const usePerformanceOptimization = () => {
  const capabilities = getBrowserCapabilities();
  const loadingStrategy = getLoadingStrategy();
  
  return {
    capabilities,
    loadingStrategy,
    shouldPreload: (type) => {
      if (type === 'video') return loadingStrategy.preloadVideo;
      if (type === 'routes') return loadingStrategy.prefetchRoutes;
      return true;
    }
  };
};
