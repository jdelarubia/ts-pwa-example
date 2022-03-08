const cacheVersion = 1;
const cacheName = `PWAEasy-v${cacheVersion}`;
const resources = [
  "/",
  "index.html",
  "/js/bundle.js",
  "https://fonts.googleapis.com/css2?&family=Open+Sans:wght@300&family=Roboto:wght@700&display=swap",
];

self.addEventListener("install", async (event: Event) => {
  console.log("[SW] install event fired!");
  try {
    const cache = await caches.open(cacheName);
    return await cache.addAll(resources);
  } catch (error: any) {
    console.error(error);
  }
});
