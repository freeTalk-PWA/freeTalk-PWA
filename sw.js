/* eslint-disable no-undef */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// workbox.routing.registerRoute(({ request }) => request.destination === 'image', new workbox.strategies.CacheFirst());

const CACHE = 'freeTalk.PS';

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([
                '/',
                '/en.manifest.json',
                '/web.config',
                '/style.css',
                '/sw.js',
                '/icons/favicon.ico',
                '/icons/freeTalk.png',
                '/icons/apple-icon-180.png',
                '/icons/manifest-icon-192.maskable.png',
                '/icons/manifest-icon-512.maskable.png',
                '/ctrl/view.control.js',
                '/ctrl/lang.control.js',
                '/ctrl/join.control.js',
                '/404/offline.html'
            ]);
        })
    );
});

if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResponse = await event.preloadResponse;

                if (preloadResponse) return preloadResponse;

                const networkResponse = await fetch(event.request);

                return networkResponse;
            } catch (e) {
                const cache = await caches.open(CACHE);
                const cacheedResponse = await cache.match('/404/offline.html');

                return cacheedResponse;
            }
        })());
    }
});
