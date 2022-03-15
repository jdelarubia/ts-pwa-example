(function () {
    'use strict';

    const template = document.createElement("template");
    template.innerHTML = `<p>Add to home screen?</p>
<button id="addToHomeScreenBtn">Yes</button>`;
    class AddToHome extends HTMLElement {
        constructor() {
            super();
        } //.
        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
            const btn = this.querySelector("button");
            btn.addEventListener("click", (ev) => {
                ev.preventDefault();
                console.log(ev);
            });
        }
        show() {
            this.classList.add("show");
        }
        remove() {
            this.classList.remove("show");
        }
    } //. AddToHome
    window.customElements.define("add-to-home", AddToHome);

    // **********************************************
    // Registration
    // **********************************************
    function registerSW() {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", async () => {
                try {
                    const registration = await navigator.serviceWorker.register("/sw.js");
                    console.log("SW registered!", registration.scope);
                }
                catch (e) {
                    console.error(e);
                }
            });
        }
    } //.
    // **********************************************
    // Installation
    // **********************************************
    function registerBeforeInstallEvent() {
        window.addEventListener("beforeinstallprompt", async (event) => {
            event.preventDefault();
            deferredPrompt = event;
            addToHomeBtn.show();
            triggerInstallationPrompt();
        });
    } //.
    function triggerInstallationPrompt() {
        const btn = document.querySelector("#addToHomeScreenBtn");
        btn.addEventListener("click", async (event) => {
            try {
                const choice = await deferredPrompt.prompt();
                console.log(choice);
                if (choice.outcome === "accepted") {
                    console.log("User agreed to add button to screen");
                }
                deferredPrompt = null;
                addToHomeBtn.remove();
            }
            catch (err) {
                console.log(err);
            }
        });
    } //.
    // **********************************************
    function registerInstallationEvent() {
        window.addEventListener("appinstalled", async (event) => {
            console.log("APP is installed");
        });
    } //.
    // **********************************************
    // Main App
    // **********************************************
    const addToHomeBtn = new AddToHome();
    const footer = document.querySelector("footer");
    footer.appendChild(addToHomeBtn);
    let deferredPrompt; // save prompt for later use
    registerSW();
    registerBeforeInstallEvent();
    registerInstallationEvent();

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYWRkLXRvLWhvbWUvYWRkVG9Ib21lLmpzIiwiLi4vLi4vc3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbnRlbXBsYXRlLmlubmVySFRNTCA9IGA8cD5BZGQgdG8gaG9tZSBzY3JlZW4/PC9wPlxyXG48YnV0dG9uIGlkPVwiYWRkVG9Ib21lU2NyZWVuQnRuXCI+WWVzPC9idXR0b24+YDtcclxuY2xhc3MgQWRkVG9Ib21lIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH0gLy8uXHJcbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcclxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcclxuICAgICAgICBjb25zdCBidG4gPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXYpID0+IHtcclxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcbiAgICB9XHJcbn0gLy8uIEFkZFRvSG9tZVxyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYWRkLXRvLWhvbWVcIiwgQWRkVG9Ib21lKTtcclxuZXhwb3J0IHsgQWRkVG9Ib21lIH07XHJcbiIsImltcG9ydCB7IEFkZFRvSG9tZSB9IGZyb20gXCIuL2FkZC10by1ob21lL2FkZFRvSG9tZVwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vIFJlZ2lzdHJhdGlvblxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyU1coKSB7XHJcbiAgICBpZiAoXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvbiA9IGF3YWl0IG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKFwiL3N3LmpzXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTVyByZWdpc3RlcmVkIVwiLCByZWdpc3RyYXRpb24uc2NvcGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0gLy8uXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gSW5zdGFsbGF0aW9uXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuZnVuY3Rpb24gcmVnaXN0ZXJCZWZvcmVJbnN0YWxsRXZlbnQoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZWluc3RhbGxwcm9tcHRcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBkZWZlcnJlZFByb21wdCA9IGV2ZW50O1xyXG4gICAgICAgIGFkZFRvSG9tZUJ0bi5zaG93KCk7XHJcbiAgICAgICAgdHJpZ2dlckluc3RhbGxhdGlvblByb21wdCgpO1xyXG4gICAgfSk7XHJcbn0gLy8uXHJcbmZ1bmN0aW9uIHRyaWdnZXJJbnN0YWxsYXRpb25Qcm9tcHQoKSB7XHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZFRvSG9tZVNjcmVlbkJ0blwiKTtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgY2hvaWNlID0gYXdhaXQgZGVmZXJyZWRQcm9tcHQucHJvbXB0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNob2ljZSk7XHJcbiAgICAgICAgICAgIGlmIChjaG9pY2Uub3V0Y29tZSA9PT0gXCJhY2NlcHRlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgYWdyZWVkIHRvIGFkZCBidXR0b24gdG8gc2NyZWVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmVycmVkUHJvbXB0ID0gbnVsbDtcclxuICAgICAgICAgICAgYWRkVG9Ib21lQnRuLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0gLy8uXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuZnVuY3Rpb24gcmVnaXN0ZXJJbnN0YWxsYXRpb25FdmVudCgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYXBwaW5zdGFsbGVkXCIsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQVBQIGlzIGluc3RhbGxlZFwiKTtcclxuICAgIH0pO1xyXG59IC8vLlxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vIE1haW4gQXBwXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuY29uc3QgYWRkVG9Ib21lQnRuID0gbmV3IEFkZFRvSG9tZSgpO1xyXG5jb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9vdGVyXCIpO1xyXG5mb290ZXIuYXBwZW5kQ2hpbGQoYWRkVG9Ib21lQnRuKTtcclxubGV0IGRlZmVycmVkUHJvbXB0OyAvLyBzYXZlIHByb21wdCBmb3IgbGF0ZXIgdXNlXHJcbnJlZ2lzdGVyU1coKTtcclxucmVnaXN0ZXJCZWZvcmVJbnN0YWxsRXZlbnQoKTtcclxucmVnaXN0ZXJJbnN0YWxsYXRpb25FdmVudCgpO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUEsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRCxRQUFRLENBQUMsU0FBUyxHQUFHLENBQUM7QUFDdEIsNENBQTRDLENBQUMsQ0FBQztJQUM5QyxNQUFNLFNBQVMsU0FBUyxXQUFXLENBQUM7SUFDcEMsSUFBSSxXQUFXLEdBQUc7SUFDbEIsUUFBUSxLQUFLLEVBQUUsQ0FBQztJQUNoQixLQUFLO0lBQ0wsSUFBSSxpQkFBaUIsR0FBRztJQUN4QixRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzRCxRQUFRLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsUUFBUSxHQUFHLENBQUMsZ0JBQWdCLENB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
