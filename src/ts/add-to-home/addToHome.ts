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
