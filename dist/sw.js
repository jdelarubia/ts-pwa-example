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
        self.skipWaiting(); // Forces activation
    });
    // fetch event. Cache-first then network as fallback
    self.addEventListener("fetch", async (event) => {
        // console.log("[SW] FETCHING", event.request.url); //!debug
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9zdy9zdy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDQUNIRVZFUlNJT04gPSAyO1xyXG5jb25zdCBDQUNIRU5BTUUgPSBgUFdBRWFzeS1zdGF0aWMtdiR7Q0FDSEVWRVJTSU9OfWA7XHJcbmNvbnN0IEFTU0VUUyA9IFtcclxuICAgIFwiL1wiLFxyXG4gICAgXCIvaW5kZXguaHRtbFwiLFxyXG4gICAgXCIvbWFuaWZlc3QuanNvblwiLFxyXG4gICAgXCIvY3NzL3N0eWxlLmNzc1wiLFxyXG4gICAgXCIvanMvYnVuZGxlLmpzXCIsXHJcbiAgICBcIi9pbWcvZmF2aWNvbi5wbmdcIixcclxuICAgIFwiL2ltZy9pY29uLTE0NHgxNDQucG5nXCIsXHJcbiAgICBcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj8mZmFtaWx5PU9wZW4rU2Fuczp3Z2h0QDMwMCZmYW1pbHk9Um9ib3RvOndnaHRANzAwJmRpc3BsYXk9c3dhcFwiLFxyXG5dO1xyXG4vLyBpbnN0YWxsIGV2ZW50XHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImluc3RhbGxcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIltTV10gSU5TVEFMTCBldmVudFwiKTtcclxuICAgIC8vIEpTIHdheVxyXG4gICAgLy8gZXZlbnQhLndhaXRVbnRpbChcclxuICAgIC8vICAgY2FjaGVzXHJcbiAgICAvLyAgICAgLm9wZW4oQ0FDSEVOQU1FKVxyXG4gICAgLy8gICAgIC50aGVuKChjYWNoZSkgPT4ge1xyXG4gICAgLy8gICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChBU1NFVFMpO1xyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgIC8vICAgICAgIGNvbnNvbGUubG9nKGBbU1ddIEVycm9yIHdoaWxlIG9wZW5pbmcgJHtDQUNIRU5BTUV9YCk7XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICk7XHJcbiAgICAvLyBUUyBBc3luYy9Bd2FpdFxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKENBQ0hFTkFNRSk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGNhY2hlLmFkZEFsbChBU1NFVFMpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIltTV10gSW5zdGFsbCBmYWlsZWRcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2VsZi5za2lwV2FpdGluZygpOyAvLyBGb3JjZXMgYWN0aXZhdGlvblxyXG59KTtcclxuLy8gZmV0Y2ggZXZlbnQuIENhY2hlLWZpcnN0IHRoZW4gbmV0d29yayBhcyBmYWxsYmFja1xyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJmZXRjaFwiLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiW1NXXSBGRVRDSElOR1wiLCBldmVudC5yZXF1ZXN0LnVybCk7IC8vIWRlYnVnXHJcbiAgICAvLyBUUyBBc3luYy9Bd2FpdFxyXG4gICAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmV0Y2hFdmVudFxyXG4gICAgZXZlbnQucmVzcG9uZFdpdGgoKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKENBQ0hFTkFNRSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlZFJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2goZXZlbnQucmVxdWVzdCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRSZXNwb25zZSB8fCBmZXRjaChldmVudC5yZXF1ZXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbU1ddIEZldGNoIGZhaWxlZFwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKSk7XHJcbiAgICAvLyBKUyB3YXlcclxuICAgIC8vIGV2ZW50LnJlc3BvbmRXaXRoKFxyXG4gICAgLy8gICBjYWNoZXNcclxuICAgIC8vICAgICAubWF0Y2goZXZlbnQucmVxdWVzdClcclxuICAgIC8vICAgICAudGhlbigoY2FjaGVkUmVzcG9uc2UpID0+IGNhY2hlZFJlc3BvbnNlIHx8IGZldGNoKGV2ZW50IS5yZXF1ZXN0KSlcclxuICAgIC8vICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAvLyAgICAgICBjb25zb2xlLmxvZyhgW1NXXSBFcnJvciB3aGlsZSBmZXRjaGluZy4gJHtlcnJvcn1gKTtcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gKTtcclxufSk7XHJcbi8vIGFjdGl2YXRlIGV2ZW50XHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImFjdGl2YXRlXCIsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJbU1ddIEFDVElWQVRFIGV2ZW50XCIpO1xyXG4gICAgY29uc3Qga2V5cyA9IGF3YWl0IGNhY2hlcy5rZXlzKCk7XHJcbiAgICBrZXlzLmZvckVhY2goKGNhY2hlTmFtZSkgPT4ge1xyXG4gICAgICAgIGlmIChjYWNoZU5hbWUgIT09IENBQ0hFTkFNRSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgZGVsZXRpbmcgY2FjaGUgJHtjYWNoZU5hbWV9YCk7XHJcbiAgICAgICAgICAgIGNhY2hlcy5kZWxldGUoY2FjaGVOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzZWxmLmNsaWVudHMuY2xhaW0oKTtcclxufSk7XHJcbmV4cG9ydCB7fTtcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN2QixNQUFNLFNBQVMs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
