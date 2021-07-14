import { html, LitElement } from "lit";
import { style } from "./card-styles";

class CardComponent extends LitElement {
  static get properties() {
    return {
      item: { type: Object },
      newClass: { type: String },
      loader: { type: Boolean },
    };
  }

  static get styles() {
    return [style];
  }

  constructor() {
    super();
    this.item = {};
    this.newClass = "";
    this.loader = false;
  }

  render() {
    return html`
      <div
        draggable=${this.item.isDraggable}
        class="card + ${this.newClass} + ${this.item.isDraggable
          ? "draggable"
          : "undraggable"}"
      >
        ${this.loader
          ? html` <span class="loader"></span> `
          : html`
              <p class="card-title">${this.item.desc}</p>
              <h2>${this.item.title}</h2>
            `}
      </div>
    `;
  }
}

window.customElements.define("app-card", CardComponent);
