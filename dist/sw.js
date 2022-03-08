(function () {
    'use strict';

    const cacheVersion = 1;
    const cacheName = `PWAEasy-v${cacheVersion}`;
    const resources = [
        "/",
        "index.html",
        "/js/bundle.js",
        "https://fonts.googleapis.com/css2?&family=Open+Sans:wght@300&family=Roboto:wght@700&display=swap",
    ];
    self.addEventListener("install", async (event) => {
        console.log("[SW] install event fired!");
        try {
            const cache = await caches.open(cacheName);
            return await cache.addAll(resources);
        }
        catch (error) {
            console.error(error);
        }
    });
    // cache-first then network
    self.addEventListener("fetch", async (event) => {
        try {
            const cachedResponse = await caches.match(event.request);
            console.log(cachedResponse);
            return cachedResponse || fetch(event.request);
        }
        catch (error) {
            console.error(error);
        }
    });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9zdy9zdy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuY29uc3QgY2FjaGVWZXJzaW9uID0gMTtcclxuY29uc3QgY2FjaGVOYW1lID0gYFBXQUVhc3ktdiR7Y2FjaGVWZXJzaW9ufWA7XHJcbmNvbnN0IHJlc291cmNlcyA9IFtcclxuICAgIFwiL1wiLFxyXG4gICAgXCJpbmRleC5odG1sXCIsXHJcbiAgICBcIi9qcy9idW5kbGUuanNcIixcclxuICAgIFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyPyZmYW1pbHk9T3BlbitTYW5zOndnaHRAMzAwJmZhbWlseT1Sb2JvdG86d2dodEA3MDAmZGlzcGxheT1zd2FwXCIsXHJcbl07XHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImluc3RhbGxcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIltTV10gaW5zdGFsbCBldmVudCBmaXJlZCFcIik7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oY2FjaGVOYW1lKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgY2FjaGUuYWRkQWxsKHJlc291cmNlcyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH1cclxufSk7XHJcbi8vIGNhY2hlLWZpcnN0IHRoZW4gbmV0d29ya1xyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJmZXRjaFwiLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSBhd2FpdCBjYWNoZXMubWF0Y2goZXZlbnQucmVxdWVzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY2FjaGVkUmVzcG9uc2UpO1xyXG4gICAgICAgIHJldHVybiBjYWNoZWRSZXNwb25zZSB8fCBmZXRjaChldmVudC5yZXF1ZXN0KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN2QixNQUFNLFNBQVMsR0FBRyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sU0FBUyxHQUFHO0lBQ2xCLElBQUksR0FBRztJQUNQLElBQUksWUFBWTtJQUNoQixJQUFJLGVBQWU7SUFDbkIsSUFBSSxrR0FBa0c7SUFDdEcsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUFPLEtBQUssS0FBSztJQUNsRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUM3QyxJQUFJLElBQUk7SUFDUixRQUFRLE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxRQUFRLE9BQU8sTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLEtBQUs7SUFDTCxJQUFJLE9BQU8sS0FBSyxFQUFFO0lBQ2xCLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixLQUFLO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSDtJQUNBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxLQUFLLEtBQUs7SUFDaEQsSUFBSSxJQUFJO0lBQ1IsUUFBUSxNQUFNLGNBQWMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLFFBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwQyxRQUFRLE9BQU8sY0FBYyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsS0FBSztJQUNMLElBQUksT0FBTyxLQUFLLEVBQUU7SUFDbEIsUUFBUSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLEtBQUs7SUFDTCxDQUFDLENBQUM7Ozs7OzsifQ==
