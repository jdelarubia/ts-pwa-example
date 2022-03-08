(function () {
    'use strict';

    function registerSW() {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", async () => {
                try {
                    const registration = await navigator.serviceWorker.register("/sw.js");
                    console.log("SW registered!");
                }
                catch (e) {
                    console.error(e);
                }
            });
        }
    }
    registerSW();

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuZnVuY3Rpb24gcmVnaXN0ZXJTVygpIHtcclxuICAgIGlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVnaXN0cmF0aW9uID0gYXdhaXQgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIvc3cuanNcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNXIHJlZ2lzdGVyZWQhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxucmVnaXN0ZXJTVygpO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0EsU0FBUyxVQUFVLEdBQUc7SUFDdEIsSUFBSSxJQUFJLGVBQWUsSUFBSSxTQUFTLEVBQUU7SUFDdEMsUUFBUSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFlBQVk7SUFDcEQsWUFBWSxJQUFJO0lBQ2hCLGdCQUFnQixNQUFNLFlBQVksR0FBRyxNQUFNLFNBQVMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RGLGdCQUFnQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDOUMsYUFBYTtJQUNiLFlBQVksT0FBTyxDQUFDLEVBQUU7SUFDdEIsZ0JBQWdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsYUFBYTtJQUNiLFNBQVMsQ0FBQyxDQUFDO0lBQ1gsS0FBSztJQUNMLENBQUM7SUFDRCxVQUFVLEVBQUU7Ozs7OzsifQ==
