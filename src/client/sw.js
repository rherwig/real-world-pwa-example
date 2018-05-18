const CACHE = CACHE_NAME || 'pstore-cache';
const cacheWhitelist = [CACHE];

const staticAssets = [
    '/',
    '/images/favicon-16x16.png',
    '/images/favicon-32x32.png'
];
const cacheAssets = [...serviceWorkerOption.assets, ...staticAssets];

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then(cache => cache.addAll(cacheAssets))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }

            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(response => {
                if (
                    !response ||
                    response.status !== 200 ||
                    response.type !== 'basic'
                ) {
                    return response;
                }

                const responseToCache = response.clone();

                caches
                    .open(CACHE)
                    .then(cache => cache.put(event.request, responseToCache));

                return response;
            });
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches
            .keys()
            .then(cacheNames =>
                Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            )
            .then(() => self.clients.claim())
    );
});
