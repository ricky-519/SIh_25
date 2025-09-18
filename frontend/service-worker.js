// Import the idb library and our db helper
importScripts('https://cdn.jsdelivr.net/npm/idb@7/build/umd.js');
importScripts('db.js');

const CACHE_NAME = 'ocean-intel-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/db.js',
  'https://cdn.jsdelivr.net/npm/idb@7/build/umd.js'
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('sync', event => {
  if (event.tag === 'sos-sync') {
    console.log('Service Worker: Received sos-sync event');
    event.waitUntil(sendSosReports());
  }
});

async function sendSosReports() {
  const reports = await getAllSosReports();
  for (const report of reports) {
    try {
      // The service worker runs in the browser, so it must use the host-accessible URL
      const response = await fetch('http://localhost:5002/sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      });

      if (response.ok) {
        console.log('Successfully sent SOS report:', report.id);
        // If the report was sent successfully, delete it from IndexedDB
        await deleteSosReport(report.id);
      } else {
        console.error('Failed to send SOS report:', report.id, response.statusText);
      }
    } catch (error) {
      console.error('Error sending SOS report:', error);
      // If there's a network error, the report will remain in IndexedDB
      // and the browser will try the sync again later.
    }
  }
}
