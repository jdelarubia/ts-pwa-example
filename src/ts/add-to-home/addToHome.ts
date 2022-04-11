/**
 * addToHome.ts
 * Add to home screen component.
 */

import { ExtendableEvent, WebWorkerEvent } from "../sw/types";

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
  prompt: any;

  constructor() {
    super();
    this.show();
  } //.

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));

    window.addEventListener("beforeinstallprompt", async (event: Event) => {
      event.preventDefault();
      this.prompt = await event; // save prompt for later use
    });

    const closeBtn = <HTMLSpanElement>this.querySelector(".close-btn");
    closeBtn.addEventListener("click", async (event: Event) => {
      event.preventDefault();
      this.remove();
    });

    const addToHomeBtn = <HTMLButtonElement>this.querySelector(".install-btn");
    addToHomeBtn.addEventListener("click", async (event: Event) => {
      event.preventDefault();
      this.triggerPrompt();
    });
  } //.

  private async triggerPrompt() {
    try {
      const userChoice = await this.prompt.prompt();
      console.log("choice", userChoice);
    } catch (err: any) {
      console.log(err);
    }
    this.prompt = null;
    this.remove();
  } //.

  show() {
    this.classList.add("show");
  } //.

  remove() {
    this.classList.remove("show");
  } //.
} //. AddToHome

window.customElements.define("add-to-home", AddToHome);

export { AddToHome };
