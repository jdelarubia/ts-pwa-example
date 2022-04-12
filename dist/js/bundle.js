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
/* Don't show once installed */
@media all and (display-mode: standalone) {
  add-to-home {
    visibility: hidden;
    display: none;
  }
  add-to-home.show {
    display: none;
  }
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
          window.addEventListener("beforeinstallprompt", async (event) => {
              event.preventDefault();
              this.prompt = await event; // save prompt for later use
          });
          const closeBtn = this.querySelector(".close-btn");
          closeBtn.addEventListener("click", async (event) => {
              event.preventDefault();
              this.hide();
          });
          const addToHomeBtn = this.querySelector(".install-btn");
          addToHomeBtn.addEventListener("click", async (event) => {
              event.preventDefault();
              await this.triggerPrompt();
          });
      } //.
      async triggerPrompt() {
          try {
              const userChoice = await this.prompt.prompt();
              console.log("choice", userChoice);
          }
          catch (err) {
              console.log(err);
          }
          this.prompt = null;
          this.hide();
      } //.
      show() {
          this.classList.add("show");
      } //.
      hide() {
          this.classList.remove("show");
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
  function registerInstallationEvent() {
      window.addEventListener("appinstalled", async (event) => {
          console.log("APP is installed");
      });
  } //.
  // **********************************************
  // Main App
  // **********************************************
  // doesn't show dialog if the event is not supported
  if ("onbeforeinstallprompt" in window) {
      const addToHomeDiv = new AddToHome(); // triggers the show method.
      const footer = document.querySelector("footer");
      footer.appendChild(addToHomeDiv);
  }
  registerSW();
  registerInstallationEvent();

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvYWRkLXRvLWhvbWUvYWRkVG9Ib21lLmpzIiwiLi4vLi4vc3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGFkZFRvSG9tZS50c1xyXG4gKiBBZGQgdG8gaG9tZSBzY3JlZW4gY29tcG9uZW50LlxyXG4gKi9cclxuY29uc3QgY3NzID0gYDxzdHlsZT5cclxuYWRkLXRvLWhvbWUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG5cclxuICBiYWNrZ3JvdW5kOiB2YXIoLS1kYXJrLWJsdWUpO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMpO1xyXG4gIG1hcmdpbjogMC4zZW0gMDtcclxuICBvcGFjaXR5OiAwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgcGFkZGluZzogMC4yZW0gMC41ZW07XHJcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAycywgdmlzaWJpbGl0eSAycztcclxuICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbn1cclxuYWRkLXRvLWhvbWUgc3Bhbi5jbG9zZS1idG4ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGVuZDtcclxuICBjb2xvcjp3aGl0ZTtcclxuICBtYXJnaW4tYm90dG9tOiAxZW07XHJcbn1cclxuYWRkLXRvLWhvbWUgYnV0dG9uLmluc3RhbGwtYnRuIHtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMpO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNhbWVsKTtcclxuICBwYWRkaW5nOiAwLjNyZW07XHJcbiAgZm9udC1zaXplOiBsYXJnZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBoZWlnaHQ6IGNhbGModmFyKC0tYnRuLXRodW1iLXNpemUpIC0gMS41cmVtKTtcclxuICB3aWR0aDogdmFyKC0tYnRuLXRodW1iLXNpemUpO1xyXG59XHJcbmFkZC10by1ob21lLnNob3cge1xyXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XHJcbiAgb3BhY2l0eTogMC45O1xyXG59XHJcbi8qIERvbid0IHNob3cgb25jZSBpbnN0YWxsZWQgKi9cclxuQG1lZGlhIGFsbCBhbmQgKGRpc3BsYXktbW9kZTogc3RhbmRhbG9uZSkge1xyXG4gIGFkZC10by1ob21lIHtcclxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG4gIGFkZC10by1ob21lLnNob3cge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbn1cclxuPC9zdHlsZT5gO1xyXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcclxudGVtcGxhdGUuaW5uZXJIVE1MID1cclxuICAgIGNzcyArXHJcbiAgICAgICAgYDxzcGFuIGNsYXNzPVwiY2xvc2UtYnRuXCI+JiMxMDAwNjs8L3NwYW4+XHJcbjxwPkFkZCB0byBob21lIHNjcmVlbj88L3A+XHJcbjxidXR0b24gY2xhc3M9XCJpbnN0YWxsLWJ0blwiPlllczwvYnV0dG9uPmA7XHJcbmNsYXNzIEFkZFRvSG9tZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICAgIHByb21wdDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG93KCk7XHJcbiAgICB9IC8vLlxyXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmVpbnN0YWxscHJvbXB0XCIsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnByb21wdCA9IGF3YWl0IGV2ZW50OyAvLyBzYXZlIHByb21wdCBmb3IgbGF0ZXIgdXNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2UtYnRuXCIpO1xyXG4gICAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgYWRkVG9Ib21lQnRuID0gdGhpcy5xdWVyeVNlbGVjdG9yKFwiLmluc3RhbGwtYnRuXCIpO1xyXG4gICAgICAgIGFkZFRvSG9tZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudHJpZ2dlclByb21wdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSAvLy5cclxuICAgIGFzeW5jIHRyaWdnZXJQcm9tcHQoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdXNlckNob2ljZSA9IGF3YWl0IHRoaXMucHJvbXB0LnByb21wdCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNob2ljZVwiLCB1c2VyQ2hvaWNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb21wdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9IC8vLlxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xyXG4gICAgfSAvLy5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxuICAgIH0gLy8uXHJcbn0gLy8uIEFkZFRvSG9tZVxyXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYWRkLXRvLWhvbWVcIiwgQWRkVG9Ib21lKTtcclxuZXhwb3J0IHsgQWRkVG9Ib21lIH07XHJcbiIsImltcG9ydCB7IEFkZFRvSG9tZSB9IGZyb20gXCIuL2FkZC10by1ob21lL2FkZFRvSG9tZVwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vIFJlZ2lzdHJhdGlvblxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyU1coKSB7XHJcbiAgICBpZiAoXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvbiA9IGF3YWl0IG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKFwiL3N3LmpzXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTVyByZWdpc3RlcmVkIVwiLCByZWdpc3RyYXRpb24uc2NvcGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0gLy8uXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuZnVuY3Rpb24gcmVnaXN0ZXJJbnN0YWxsYXRpb25FdmVudCgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYXBwaW5zdGFsbGVkXCIsIGFzeW5jIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQVBQIGlzIGluc3RhbGxlZFwiKTtcclxuICAgIH0pO1xyXG59IC8vLlxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vIE1haW4gQXBwXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gZG9lc24ndCBzaG93IGRpYWxvZyBpZiB0aGUgZXZlbnQgaXMgbm90IHN1cHBvcnRlZFxyXG5pZiAoXCJvbmJlZm9yZWluc3RhbGxwcm9tcHRcIiBpbiB3aW5kb3cpIHtcclxuICAgIGNvbnN0IGFkZFRvSG9tZURpdiA9IG5ldyBBZGRUb0hvbWUoKTsgLy8gdHJpZ2dlcnMgdGhlIHNob3cgbWV0aG9kLlxyXG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvb3RlclwiKTtcclxuICAgIGZvb3Rlci5hcHBlbmRDaGlsZChhZGRUb0hvbWVEaXYpO1xyXG59XHJcbnJlZ2lzdGVyU1coKTtcclxucmVnaXN0ZXJJbnN0YWxsYXRpb25FdmVudCgpO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0VBQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQSxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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
