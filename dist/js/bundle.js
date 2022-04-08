(function () {
    'use strict';

    const template = document.createElement("template");
    template.innerHTML = `<span class="close-btn">&#10006;</span>
<p>Add to home screen?</p>
<button class="install-btn">Yes</button>`;
    class AddToHome extends HTMLElement {
        prompt;
        constructor() {
            super();
        } //.
        connectedCallback() {
            this.appendChild(template.content.cloneNode(true));
            const closeBtn = this.querySelector(".close-btn");
            closeBtn.addEventListener("click", async (event) => {
                this.remove();
            });
            this.registerBeforeInstallEvent();
        } //.
        show() {
            this.classList.add("show");
        } //.
        remove() {
            this.classList.remove("show");
        } //.
        registerBeforeInstallEvent() {
            window.addEventListener("beforeinstallprompt", async (event) => {
                event.preventDefault();
                this.prompt = event;
                this.show();
                this.triggerInstallationPrompt();
            });
        } //.
        triggerInstallationPrompt() {
            const addToHomeBtn = this.querySelector(".install-btn");
            addToHomeBtn.addEventListener("click", async (event) => {
                try {
                    const choice = await this.prompt.prompt();
                    console.log(choice);
                    if (choice.outcome === "accepted") {
                        console.log("User agreed to add button to screen");
                    }
                    this.prompt = null;
                    addToHomeBtn.remove();
                }
                catch (err) {
                    console.log(err);
                }
            });
        } //.
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
    // Main App
    // **********************************************
    const addToHomeBtn = new AddToHome();
    const footer = document.querySelector("footer");
    footer.appendChild(addToHomeBtn);
    registerSW();

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYWRkLXRvLWhvbWUvYWRkVG9Ib21lLmpzIiwiLi4vLi4vc3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbnRlbXBsYXRlLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNsb3NlLWJ0blwiPiYjMTAwMDY7PC9zcGFuPlxyXG48cD5BZGQgdG8gaG9tZSBzY3JlZW4/PC9wPlxyXG48YnV0dG9uIGNsYXNzPVwiaW5zdGFsbC1idG5cIj5ZZXM8L2J1dHRvbj5gO1xyXG5jbGFzcyBBZGRUb0hvbWUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBwcm9tcHQ7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfSAvLy5cclxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gdGhpcy5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlLWJ0blwiKTtcclxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckJlZm9yZUluc3RhbGxFdmVudCgpO1xyXG4gICAgfSAvLy5cclxuICAgIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIH0gLy8uXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxuICAgIH0gLy8uXHJcbiAgICByZWdpc3RlckJlZm9yZUluc3RhbGxFdmVudCgpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZWluc3RhbGxwcm9tcHRcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvbXB0ID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJJbnN0YWxsYXRpb25Qcm9tcHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gLy8uXHJcbiAgICB0cmlnZ2VySW5zdGFsbGF0aW9uUHJvbXB0KCkge1xyXG4gICAgICAgIGNvbnN0IGFkZFRvSG9tZUJ0biA9IHRoaXMucXVlcnlTZWxlY3RvcihcIi5pbnN0YWxsLWJ0blwiKTtcclxuICAgICAgICBhZGRUb0hvbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hvaWNlID0gYXdhaXQgdGhpcy5wcm9tcHQucHJvbXB0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjaG9pY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNob2ljZS5vdXRjb21lID09PSBcImFjY2VwdGVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIgYWdyZWVkIHRvIGFkZCBidXR0b24gdG8gc2NyZWVuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9tcHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYWRkVG9Ib21lQnRuLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0gLy8uXHJcbn0gLy8uIEFkZFRvSG9tZVxyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYWRkLXRvLWhvbWVcIiwgQWRkVG9Ib21lKTtcclxuZXhwb3J0IHsgQWRkVG9Ib21lIH07XHJcbiIsImltcG9ydCB7IEFkZFRvSG9tZSB9IGZyb20gXCIuL2FkZC10by1ob21lL2FkZFRvSG9tZVwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vIFJlZ2lzdHJhdGlvblxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyU1coKSB7XHJcbiAgICBpZiAoXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvbiA9IGF3YWl0IG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKFwiL3N3LmpzXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTVyByZWdpc3RlcmVkIVwiLCByZWdpc3RyYXRpb24uc2NvcGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0gLy8uXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuZnVuY3Rpb24gcmVnaXN0ZXJJbnN0YWxsYXRpb25FdmVudCgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYXBwaW5zdGFsbGVkXCIsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQVBQIGlzIGluc3RhbGxlZFwiKTtcclxuICAgIH0pO1xyXG59IC8vLlxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vIE1haW4gQXBwXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuY29uc3QgYWRkVG9Ib21lQnRuID0gbmV3IEFkZFRvSG9tZSgpO1xyXG5jb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9vdGVyXCIpO1xyXG5mb290ZXIuYXBwZW5kQ2hpbGQoYWRkVG9Ib21lQnRuKTtcclxubGV0IGRlZmVycmVkUHJvbXB0OyAvLyBzYXZlIHByb21wdCBmb3IgbGF0ZXIgdXNlXHJcbnJlZ2lzdGVyU1coKTtcclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEQsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDO0FBQ3RCO0FBQ0Esd0NBQXdDLENBQUMsQ0FBQztJQUMxQyxNQUFNLFNBQVMsU0FBUyxXQUFXLENBQUM7SUFDcEMsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLFdBQVcsR0FBRztJQUNsQixRQUFRLEtBQUssRUFBRSxDQUFDO0lBQ2hCLEtBQUs7SUFDTCxJQUFJLGlCQUFpQixHQUFHO0lBQ3hCLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELFFBQVEsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMxRCxRQUFRLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxLQUFLLEtBQUs7SUFDNUQsWUFBWSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDMUIsU0FBUyxDQUFDLENBQUM7SUFDWCxRQUFRLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQzFDLEtBQUs7SUFDTCxJQUFJLElBQUksR0FBRztJQUNYLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsS0FBSztJQUNMLElBQUksTUFBTSxHQUFHO0lBQ2IsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxLQUFLO0lBQ0wsSUFBSSwwQkFBMEIsR0FBRztJQUNqQyxRQUFRLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLEtBQUssS0FBSztJQUN4RSxZQUFZLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQyxZQUFZLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLFlBQVksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLFlBQVksSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDN0MsU0FBUyxDQUFDLENBQUM7SUFDWCxLQUFLO0lBQ0wsSUFBSSx5QkFBeUIsR0FBRztJQUNoQyxRQUFRLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEUsUUFBUSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sS0FBSyxLQUFLO0lBQ2hFLFlBQVksSUFBSTtJQUNoQixnQkFBZ0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFELGdCQUFnQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLGdCQUFnQixJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0lBQ25ELG9CQUFvQixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDdkUsaUJBQWlCO0lBQ2pCLGdCQUFnQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNuQyxnQkFBZ0IsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLGFBQWE7SUFDYixZQUFZLE9BQU8sR0FBRyxFQUFFO0lBQ3hCLGdCQUFnQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLGFBQWE7SUFDYixTQUFTLENBQUMsQ0FBQztJQUNYLEtBQUs7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQzs7SUNoRHREO0lBQ0E7SUFDQTtJQUNBLFNBQVMsVUFBVSxHQUFHO0lBQ3RCLElBQUksSUFBSSxlQUFlLElBQUksU0FBUyxFQUFFO0lBQ3RDLFFBQVEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxZQUFZO0lBQ3BELFlBQVksSUFBSTtJQUNoQixnQkFBZ0IsTUFBTSxZQUFZLEdBQUcsTUFBTSxTQUFTLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RixnQkFBZ0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEUsYUFBYTtJQUNiLFlBQVksT0FBTyxDQUFDLEVBQUU7SUFDdEIsZ0JBQWdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsYUFBYTtJQUNiLFNBQVMsQ0FBQyxDQUFDO0lBQ1gsS0FBSztJQUNMLENBQUM7SUFPRDtJQUNBO0lBQ0E7SUFDQSxNQUFNLFlBQVksR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQ3JDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVqQyxVQUFVLEVBQUU7Ozs7OzsifQ==
