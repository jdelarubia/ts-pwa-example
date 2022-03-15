import { WebWorkerEvent } from "./types";

const CACHEVERSION = 2;
const CACHENAME = `PWAEasy-static-v${CACHEVERSION}`;
const RESOURCES = [
  "/",
  "index.html",
  "/js/bundle.js",
  "https://fonts.googleapis.com/css2?&family=Open+Sans:wght@300&family=Roboto:wght@700&display=swap",
];

// install event
self.addEventListener("install", async (event: WebWorkerEvent) => {
  console.log("[SW] install event fired!");
  // console.log(event);
  try {
    const cache = await caches.open(CACHENAME);
    return await cache.addAll(RESOURCES);
  } catch (error: any) {
    console.error(error);
  }
  return;
});

// fetch event. Cache-first then network as fallback
self.addEventListener("fetch", async (event: WebWorkerEvent) => {
  try {
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || fetch(event.request);
  } catch (error: any) {
    console.error(error);
  }
  return;
});
