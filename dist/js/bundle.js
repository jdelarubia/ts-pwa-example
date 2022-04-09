(function () {
  'use strict';

  /**
   * addToHome.ts
   * Add to home screen component.
   */
  const css = `<style>
add-to-home {
  display: flex;
  align-items: center;
  justify-self: center;
  justify-content: space-between;
  flex-wrap: wrap;

  background: var(--dark-blue);
  border-radius: var(--border-radius);
  margin: 0.3em 0;
  opacity: 0;
  overflow: hidden;
  padding: 0.2em 0.5em;
  transition: opacity 2s, visibility 2s;
  visibility: hidden;
}
add-to-home span.close-btn {
  width: 100%;
  text-align: end;
  color:white;
  margin-bottom: 1em;
}
add-to-home button.install-btn {
  color: white;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--camel);
  padding: 0.3rem;
  font-size: large;
  font-weight: bold;
  height: calc(var(--btn-thumb-size) - 1.5rem);
  width: var(--btn-thumb-size);
}
add-to-home.show {
  visibility: visible;
  opacity: 0.9;
}
</style>`;
  const template = document.createElement("template");
  template.innerHTML =
      css +
          `<span class="close-btn">&#10006;</span>
<p>Add to home screen?</p>
<button class="install-btn">Yes</button>`;
  class AddToHome extends HTMLElement {
      prompt;
      constructor() {
          super();
          this.show();
      } //.
      connectedCallback() {
          this.appendChild(template.content.cloneNode(true));
          const closeBtn = this.querySelector(".close-btn");
          closeBtn.addEventListener("click", async (event) => {
              event.preventDefault();
              this.remove();
          });
          const addToHomeBtn = this.querySelector(".install-btn");
          addToHomeBtn.addEventListener("click", async (event) => {
              event.preventDefault();
              try {
                  const choice = await this.prompt.prompt();
              }
              catch (err) {
                  console.log(err);
              }
              this.prompt = null;
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
              this.prompt = event; // save prompt for later use
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYWRkLXRvLWhvbWUvYWRkVG9Ib21lLmpzIiwiLi4vLi4vc3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGFkZFRvSG9tZS50c1xyXG4gKiBBZGQgdG8gaG9tZSBzY3JlZW4gY29tcG9uZW50LlxyXG4gKi9cclxuY29uc3QgY3NzID0gYDxzdHlsZT5cclxuYWRkLXRvLWhvbWUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG5cclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1kYXJrLWJsdWUpO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMpO1xyXG4gIG1hcmdpbjogMC4zZW0gMDtcclxuICBvcGFjaXR5OiAwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgcGFkZGluZzogMC4yZW0gMC41ZW07XHJcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAycywgdmlzaWJpbGl0eSAycztcclxuICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbn1cclxuYWRkLXRvLWhvbWUgc3Bhbi5jbG9zZS1idG4ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGVuZDtcclxuICBjb2xvcjp3aGl0ZTtcclxuICBtYXJnaW4tYm90dG9tOiAxZW07XHJcbn1cclxuYWRkLXRvLWhvbWUgYnV0dG9uLmluc3RhbGwtYnRuIHtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMpO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNhbWVsKTtcclxuICBwYWRkaW5nOiAwLjNyZW07XHJcbiAgZm9udC1zaXplOiBsYXJnZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBoZWlnaHQ6IGNhbGModmFyKC0tYnRuLXRodW1iLXNpemUpIC0gMS41cmVtKTtcclxuICB3aWR0aDogdmFyKC0tYnRuLXRodW1iLXNpemUpO1xyXG59XHJcbmFkZC10by1ob21lLnNob3cge1xyXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XHJcbiAgb3BhY2l0eTogMC45O1xyXG59XHJcbjwvc3R5bGU+YDtcclxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XHJcbnRlbXBsYXRlLmlubmVySFRNTCA9XHJcbiAgICBjc3MgK1xyXG4gICAgICAgIGA8c3BhbiBjbGFzcz1cImNsb3NlLWJ0blwiPiYjMTAwMDY7PC9zcGFuPlxyXG48cD5BZGQgdG8gaG9tZSBzY3JlZW4/PC9wPlxyXG48YnV0dG9uIGNsYXNzPVwiaW5zdGFsbC1idG5cIj5ZZXM8L2J1dHRvbj5gO1xyXG5jbGFzcyBBZGRUb0hvbWUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgICBwcm9tcHQ7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfSAvLy5cclxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gdGhpcy5xdWVyeVNlbGVjdG9yKFwiLmNsb3NlLWJ0blwiKTtcclxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgYWRkVG9Ib21lQnRuID0gdGhpcy5xdWVyeVNlbGVjdG9yKFwiLmluc3RhbGwtYnRuXCIpO1xyXG4gICAgICAgIGFkZFRvSG9tZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaG9pY2UgPSBhd2FpdCB0aGlzLnByb21wdC5wcm9tcHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJvbXB0ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyQmVmb3JlSW5zdGFsbEV2ZW50KCk7XHJcbiAgICB9IC8vLlxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xyXG4gICAgfSAvLy5cclxuICAgIHJlbW92ZSgpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gICAgfSAvLy5cclxuICAgIHJlZ2lzdGVyQmVmb3JlSW5zdGFsbEV2ZW50KCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JlaW5zdGFsbHByb21wdFwiLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9tcHQgPSBldmVudDsgLy8gc2F2ZSBwcm9tcHQgZm9yIGxhdGVyIHVzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSAvLy5cclxufSAvLy4gQWRkVG9Ib21lXHJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhZGQtdG8taG9tZVwiLCBBZGRUb0hvbWUpO1xyXG5leHBvcnQgeyBBZGRUb0hvbWUgfTtcclxuIiwiaW1wb3J0IHsgQWRkVG9Ib21lIH0gZnJvbSBcIi4vYWRkLXRvLWhvbWUvYWRkVG9Ib21lXCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gUmVnaXN0cmF0aW9uXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuZnVuY3Rpb24gcmVnaXN0ZXJTVygpIHtcclxuICAgIGlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVnaXN0cmF0aW9uID0gYXdhaXQgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIvc3cuanNcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNXIHJlZ2lzdGVyZWQhXCIsIHJlZ2lzdHJhdGlvbi5zY29wZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSAvLy5cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5mdW5jdGlvbiByZWdpc3Rlckluc3RhbGxhdGlvbkV2ZW50KCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhcHBpbnN0YWxsZWRcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBUFAgaXMgaW5zdGFsbGVkXCIpO1xyXG4gICAgfSk7XHJcbn0gLy8uXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gTWFpbiBBcHBcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5jb25zdCBhZGRUb0hvbWVCdG4gPSBuZXcgQWRkVG9Ib21lKCk7XHJcbmNvbnN0IGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb290ZXJcIik7XHJcbmZvb3Rlci5hcHBlbmRDaGlsZChhZGRUb0hvbWVCdG4pO1xyXG5yZWdpc3RlclNXKCk7XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQyxDQUFDO0VBQ1YsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUNwRCxRQUFRLENBQUMsU0FBUztFQUNsQixJQUFJLEdBQUc7RUFDUCxRQUFRLENBQUM7QUFDVDtBQUNBLHdDQUF3QyxDQUFDLENBQUM7RUFDMUMsTUFBTSxTQUFTLFNBQVMsV0FBVyxDQUFDO0VBQ3BDLElBQUksTUFBTSxDQUFDO0VBQ1gsSUFBSSxXQUFXLEdBQUc7RUFDbEIsUUFBUSxLQUFLLEVBQUUsQ0FBQztFQUNoQixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztFQUNwQixLQUFLO0VBQ0wsSUFB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
