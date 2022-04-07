(function () {
    'use strict';

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
    self.addEventListener("install", async (event) => {
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
            const cache = await caches.open(CACHENAME);
            return await cache.addAll(ASSETS);
        }
        catch (error) {
            console.error("[SW] Install failed", error);
        }
        // return (self as WebWorkerSelf).skipWaiting(); // Forces activation
    });
    // fetch event. Cache-first then network as fallback
    self.addEventListener("fetch", async (event) => {
        console.log("[SW] FETCHING", event.request.url); //!debug
        // TS Async/Await
        // See: https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
        event.respondWith((async function () {
            try {
                const cache = await caches.open(CACHENAME);
                const cachedResponse = await cache.match(event.request);
                return cachedResponse || fetch(event.request);
            }
            catch (error) {
                console.error("[SW] Fetch failed", error);
            }
        })());
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
    self.addEventListener("activate", async (event) => {
        console.log("[SW] ACTIVATE event");
        const keys = await caches.keys();
        keys.forEach((cacheName) => {
            if (cacheName !== CACHENAME) {
                console.log(`deleting cache ${cacheName}`);
                caches.delete(cacheName);
            }
        });
        return self.clients.claim();
    });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9zdy9zdy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDQUNIRVZFUlNJT04gPSAyO1xyXG5jb25zdCBDQUNIRU5BTUUgPSBgUFdBRWFzeS1zdGF0aWMtdiR7Q0FDSEVWRVJTSU9OfWA7XHJcbmNvbnN0IEFTU0VUUyA9IFtcclxuICAgIFwiL1wiLFxyXG4gICAgXCIvaW5kZXguaHRtbFwiLFxyXG4gICAgXCIvbWFuaWZlc3QuanNvblwiLFxyXG4gICAgXCIvY3NzL3N0eWxlLmNzc1wiLFxyXG4gICAgXCIvanMvYnVuZGxlLmpzXCIsXHJcbiAgICBcIi9pbWcvZmF2aWNvbi5wbmdcIixcclxuICAgIFwiL2ltZy9pY29uLTE0NHgxNDQucG5nXCIsXHJcbiAgICBcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj8mZmFtaWx5PU9wZW4rU2Fuczp3Z2h0QDMwMCZmYW1pbHk9Um9ib3RvOndnaHRANzAwJmRpc3BsYXk9c3dhcFwiLFxyXG5dO1xyXG4vLyBpbnN0YWxsIGV2ZW50XHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImluc3RhbGxcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIltTV10gSU5TVEFMTCBldmVudFwiKTtcclxuICAgIC8vIEpTIHdheVxyXG4gICAgLy8gZXZlbnQhLndhaXRVbnRpbChcclxuICAgIC8vICAgY2FjaGVzXHJcbiAgICAvLyAgICAgLm9wZW4oQ0FDSEVOQU1FKVxyXG4gICAgLy8gICAgIC50aGVuKChjYWNoZSkgPT4ge1xyXG4gICAgLy8gICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChBU1NFVFMpO1xyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKGBbU1ddIEVycm9yIHdoaWxlIG9wZW5pbmcgJHtDQUNIRU5BTUV9YCk7XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICk7XHJcbiAgICAvLyBUUyBBc3luYy9Bd2FpdFxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKENBQ0hFTkFNRSk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGNhY2hlLmFkZEFsbChBU1NFVFMpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIltTV10gSW5zdGFsbCBmYWlsZWRcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuIChzZWxmIGFzIFdlYldvcmtlclNlbGYpLnNraXBXYWl0aW5nKCk7IC8vIEZvcmNlcyBhY3RpdmF0aW9uXHJcbn0pO1xyXG4vLyBmZXRjaCBldmVudC4gQ2FjaGUtZmlyc3QgdGhlbiBuZXR3b3JrIGFzIGZhbGxiYWNrXHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImZldGNoXCIsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJbU1ddIEZFVENISU5HXCIsIGV2ZW50LnJlcXVlc3QudXJsKTsgLy8hZGVidWdcclxuICAgIC8vIFRTIEFzeW5jL0F3YWl0XHJcbiAgICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GZXRjaEV2ZW50XHJcbiAgICBldmVudC5yZXNwb25kV2l0aCgoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oQ0FDSEVOQU1FKTtcclxuICAgICAgICAgICAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSBhd2FpdCBjYWNoZS5tYXRjaChldmVudC5yZXF1ZXN0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFJlc3BvbnNlIHx8IGZldGNoKGV2ZW50LnJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIltTV10gRmV0Y2ggZmFpbGVkXCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpKTtcclxuICAgIC8vIEpTIHdheVxyXG4gICAgLy8gZXZlbnQucmVzcG9uZFdpdGgoXHJcbiAgICAvLyAgIGNhY2hlc1xyXG4gICAgLy8gICAgIC5tYXRjaChldmVudC5yZXF1ZXN0KVxyXG4gICAgLy8gICAgIC50aGVuKChjYWNoZWRSZXNwb25zZSkgPT4gY2FjaGVkUmVzcG9uc2UgfHwgZmV0Y2goZXZlbnQhLnJlcXVlc3QpKVxyXG4gICAgLy8gICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKGBbU1ddIEVycm9yIHdoaWxlIGZldGNoaW5nLiAke2Vycm9yfWApO1xyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyApO1xyXG59KTtcclxuLy8gYWN0aXZhdGUgZXZlbnRcclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiYWN0aXZhdGVcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIltTV10gQUNUSVZBVEUgZXZlbnRcIik7XHJcbiAgICBjb25zdCBrZXlzID0gYXdhaXQgY2FjaGVzLmtleXMoKTtcclxuICAgIGtleXMuZm9yRWFjaCgoY2FjaGVOYW1lKSA9PiB7XHJcbiAgICAgICAgaWYgKGNhY2hlTmFtZSAhPT0gQ0FDSEVOQU1FKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBkZWxldGluZyBjYWNoZSAke2NhY2hlTmFtZX1gKTtcclxuICAgICAgICAgICAgY2FjaGVzLmRlbGV0ZShjYWNoZU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHNlbGYuY2xpZW50cy5jbGFpbSgpO1xyXG59KTtcclxuZXhwb3J0IHt9O1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUEsTUFBTSxZQUFZLEdBQUcs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
