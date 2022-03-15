const template = document.createElement("template");
template.innerHTML = `<p>Add to home screen?</p>
<button id="addToHomeScreenBtn">Yes</button>`;

class AddToHome extends HTMLElement {
  constructor() {
    super();
  } //.

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    const btn = <HTMLButtonElement>this.querySelector("button");
    btn.addEventListener("click", (ev: Event) => {
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

export { AddToHome };
