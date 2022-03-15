const cacheVersion = 1;
const cacheName = `PWAEasy-v${cacheVersion}`;
const resources = [
  "/",
  "index.html",
  "/js/bundle.js",
  "https://fonts.googleapis.com/css2?&family=Open+Sans:wght@300&family=Roboto:wght@700&display=swap",
];

type WebWorkerEvent = Partial<
  Event & { request?: Request; waitUntil?: Function }
>;

self.addEventListener("install", async (event: WebWorkerEvent) => {
  console.log("[SW] install event fired!");
  try {
    const cache = await caches.open(cacheName);
    return await cache.addAll(resources);
  } catch (error: any) {
    console.error(error);
  }
  return;
});

// cache-first then network as fallback
self.addEventListener("fetch", async (event: WebWorkerEvent) => {
  try {
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || fetch(event.request);
  } catch (error: any) {
    console.error(error);
  }
  return;
});
