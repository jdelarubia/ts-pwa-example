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
}

registerSW();
