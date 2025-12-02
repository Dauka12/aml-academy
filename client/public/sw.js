/* eslint-env serviceworker */
/* global self */

// Service Worker для кэширования и ускорения загрузки
const CACHE_NAME = 'afm-academy-v1';
const STATIC_CACHE = 'afm-static-v1';
const DYNAMIC_CACHE = 'afm-dynamic-v1';

// Критические ресурсы для предварительного кэширования
const STATIC_ASSETS = [
  '/',
  '/src/index.jsx',
  '/src/App.jsx',
  '/src/pages/home/index-optimized.jsx',
  '/src/components/header/v2/index-optimized.jsx',
  '/src/components/LoadingSpinner/index.jsx',
  '/src/assets/icons/',
  '/favicon.ico',
  '/logo192.png'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Предварительное кэширование статических ресурсов');
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, {
          cache: 'reload' // Обход кэша браузера для получения свежих версий
        })));
      })
      .then(() => {
        console.log('Кэширование завершено');
        return self.skipWaiting(); // Активируем новый SW сразу
      })
      .catch((error) => {
        console.error('Ошибка при кэшировании:', error);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker активирован');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Берем контроль над всеми страницами
    })
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Стратегия "Cache First" для статических ресурсов
  if (
    request.destination === 'image' ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    url.pathname.includes('/static/') ||
    url.pathname.includes('/assets/')
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            console.log('Загрузка из кэша:', request.url);
            return response;
          }
          
          return fetch(request).then((fetchResponse) => {
            if (fetchResponse.ok) {
              const responseClone = fetchResponse.clone();
              cache.put(request, responseClone);
            }
            return fetchResponse;
          });
        });
      })
    );
    return;
  }
  
  // Стратегия "Network First" для API запросов
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }
  
  // Стратегия "Stale While Revalidate" для документов
  if (request.destination === 'document') {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          const fetchPromise = fetch(request).then((fetchResponse) => {
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          });
          
          return response || fetchPromise;
        });
      })
    );
    return;
  }
  
  // По умолчанию используем сеть
  event.respondWith(fetch(request));
});

// Обработка фоновой синхронизации
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Выполнение фоновой синхронизации');
    // Здесь можно добавить логику для синхронизации данных
  }
});

// Обработка push уведомлений (если нужно в будущем)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Новое уведомление',
    icon: '/logo192.png',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('AML Academy', options)
  );
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event) => {
  console.log('Клик по уведомлению');
  event.notification.close();
  
  event.waitUntil(
    self.clients.openWindow('/')
  );
});
