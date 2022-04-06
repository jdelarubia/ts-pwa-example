import { WebWorkerEvent, WebWorkerSelf } from "./types";

const CACHEVERSION = 2;
const CACHENAME = `PWAEasy-static-v${CACHEVERSION}`;
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/style.css",
  "/js/bundle.js",
  "/img/favicon.png",
  "/img/icon-144x144.png",
  "https://fonts.googleapis.com/css2?&family=Open+Sans:wght@300&family=Roboto:wght@700&display=swap",
];

// install event
self.addEventListener("install", async (event: WebWorkerEvent) => {
  console.log("[SW] INSTALL event");
  try {
    return await cache.addAll(ASSETS);
  } catch (error: any) {
    console.error("[SW] Install failed", error);
  }
  return;
});

// fetch event. Cache-first then network as fallback
self.addEventListener("fetch", async (event: WebWorkerEvent) => {
  try {
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || (await fetch(event.request));
  } catch (error: any) {
    console.error("[SW] Fetch failed", error);
  }
  return;
});

// activate event
self.addEventListener("activate", async (event: WebWorkerEvent) => {
  console.log("[SW] ACTIVATE event");
  const keys: string[] = await caches.keys();
  keys.forEach((cacheName) => {
    if (cacheName !== CACHENAME) {
      console.log(`deleting cache ${cacheName}`);
      caches.delete(cacheName);
    }
  });

  return (self as any).clients!.claim();
});
