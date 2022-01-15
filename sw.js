/* eslint-disable no-undef */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);

// self.addEventListener('install', function(event) {
//     event.waitUntil(
//         caches.open(cacheName).then(function(cache) {
//             return cache.addAll(
//                 [
//                     '/index.html',
//                     '/style.css',
//                     '/ctrl/view.control.js',
//                     '/ctrl/lang.control.js',
//                     '/ctrl/form.control.js',
//                     '/ctrl/join.control.js',
//                     '/ctrl/chat.control.js',
//                     '/ctrl/talk.control.js'
//                 ]
//             );
//         })
//     );
// });
