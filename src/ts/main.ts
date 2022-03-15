import { AddToHome } from "./add-to-home/addToHome";

function registerSW() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("SW registered!");
      } catch (e: any) {
        console.error(e);
      }
    });
  }
} //.

function registerBeforeInstallEvent() {
  window.addEventListener("beforeinstallprompt", async (event: Event) => {
    event.preventDefault();
    deferredPrompt = event;
    addToHomeBtn.show();
    triggerInstallationPrompt();
  });
} //.

function triggerInstallationPrompt() {
  const btn = <HTMLButtonElement>document.querySelector("#addToHomeScreenBtn");
  btn.addEventListener("click", async (event: Event) => {
    try {
      const choice = await deferredPrompt.prompt();
      console.log(choice);

      if (choice.outcome === "accepted") {
        console.log("User agreed to add button to screen");
      }
      deferredPrompt = null;
      addToHomeBtn.remove();
    } catch (err) {
      console.log(err);
    }
  });
} //.

// **********************************************
// Main App
// **********************************************
const addToHomeBtn = new AddToHome();
const footer = <HTMLElement>document.querySelector("footer");
footer.appendChild(addToHomeBtn);

let deferredPrompt: any; // save prompt for later use
registerSW();
registerBeforeInstallEvent();
registerInstallationEvent();
