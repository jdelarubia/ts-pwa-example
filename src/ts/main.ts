import { WebWorkerEvent } from "./sw/types";
import { AddToHome } from "./add-to-home/addToHome";

// **********************************************
// Registration
// **********************************************
function registerSW() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration: ServiceWorkerRegistration =
          await navigator.serviceWorker.register("/sw.js");
        console.log("SW registered!", registration.scope);
      } catch (e: any) {
        console.error(e);
      }
    });
  }
} //.

// **********************************************
function registerInstallationEvent() {
  window.addEventListener("appinstalled", async (event: WebWorkerEvent) => {
    console.log("APP is installed");
  });
} //.

// **********************************************
// Main App
// **********************************************
// doesn't show dialog if the event is not supported
if ("onbeforeinstallprompt" in window) { 
  const addToHomeDiv = new AddToHome(); // triggers the show method.
  const footer = <HTMLDivElement>document.querySelector("footer");
  footer.appendChild(addToHomeDiv);
}

registerSW();
registerInstallationEvent();
