const template = document.createElement("template");
template.innerHTML = `<span class="close-btn">&#10006;</span>
<p>Add to home screen?</p>
<button class="install-btn">Yes</button>`;

class AddToHome extends HTMLElement {
  prompt: any;

  constructor() {
    super();
  } //.

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    const closeBtn = <HTMLSpanElement>this.querySelector(".close-btn");

    closeBtn.addEventListener("click", async (event: Event) => {
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

  private registerBeforeInstallEvent() {
    window.addEventListener("beforeinstallprompt", async (event: Event) => {
      event.preventDefault();
      this.prompt = event;
      this.show();
      this.triggerInstallationPrompt();
    });
  } //.

  private triggerInstallationPrompt() {
    const addToHomeBtn = <HTMLButtonElement>this.querySelector(".install-btn");

    addToHomeBtn.addEventListener("click", async (event: Event) => {
      try {
        const choice = await this.prompt.prompt();
        console.log(choice);

        if (choice.outcome === "accepted") {
          console.log("User agreed to add button to screen");
        }
        this.prompt = null;
        addToHomeBtn.remove();
      } catch (err) {
        console.log(err);
      }
    });
  } //.
} //. AddToHome

window.customElements.define("add-to-home", AddToHome);

export { AddToHome };
