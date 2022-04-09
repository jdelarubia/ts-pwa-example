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
  // JS way
  // event!.waitUntil(
  //   caches
  //     .open(CACHENAME)
  //     .then((cache) => {
  //       return cache.addAll(ASSETS);
  //     })
  //     .catch((err) => {
  //       console.log(`[SW] Error while opening ${CACHENAME}`);
  //     })
  // );

  // TS Async/Await
  try {
    const cache = <Cache>await caches.open(CACHENAME);
    return await cache.addAll(ASSETS);
  } catch (error: any) {
    console.error("[SW] Install failed", error);
  }

  (self as WebWorkerSelf).skipWaiting(); // Forces activation
});

// fetch event. Cache-first then network as fallback
self.addEventListener("fetch", async (event: WebWorkerEvent) => {
  console.log("[SW] FETCHING", event.request.url); //!debug

  // TS Async/Await
  // See: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
  event.respondWith(
    (async function () {
      try {
        const cache = await caches.open(CACHENAME);
        const cachedResponse = await cache.match(event.request);
        return cachedResponse || fetch(event.request);
      } catch (error: any) {
        console.error("[SW] Fetch failed", error);
      }
    })()
  );

  // JS way
  // event.respondWith(
  //   caches
  //     .match(event.request)
  //     .then((cachedResponse) => cachedResponse || fetch(event!.request))
  //     .catch((error) => {
  //       console.log(`[SW] Error while fetching. ${error}`);
  //     })
  // );
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
