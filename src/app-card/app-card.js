import { html, LitElement } from "lit";
import { classMap } from "lit-html/directives/class-map";
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
    const classList = {
      card: true,
      draggable: this.item.isDraggable,
      undraggable: !this.item.isDraggable,
      "can-replace": this.newClass === "can-replace",
      "cannot-replace": this.newClass === "cannot-replace",
    };

    return html`
      <div draggable=${this.item.isDraggable} class=${classMap(classList)}>
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
