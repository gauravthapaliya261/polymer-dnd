import { html, LitElement } from "lit";
import "../app-card/app-card";
import { style } from "./styles";
import { items } from "../models/items";

class AppMain extends LitElement {
  static get properties() {
    return {
      items: { type: Array },
      fromParent: { type: Number },
      fromChild: { type: Number },
      toParent: { type: Number },
      toChild: { type: Number },
      counter: { type: Number },
      isDragging: { type: Boolean },
    };
  }

  static get styles() {
    return [style];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.counter = 0;
    this.isDragging = false;
    this.items = items;
  }

  firstUpdated() {
    const draggables = this.shadowRoot.querySelectorAll(".draggable-main");

    draggables.forEach((draggable) => {
      // Called when you start to drag an element

      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      // Called when an drag event has ended

      draggable.addEventListener("dragend", () => {
        if (this.isDragging) {
          this.isDragging = false;
          setTimeout(() => {
            draggable.classList.remove("dragging");
          }, 800);
        } else {
          draggable.classList.remove("dragging");
        }
      });

      // Called when an element is being dragged over a valid drop target

      draggable.addEventListener("dragover", (e) => {
        e.preventDefault();
        const selectedElement = this.shadowRoot.querySelector(".dragging");
        if (selectedElement.value.title === draggable.value.title) {
          draggable.children[0].newClass = "can-replace";
        } else {
          draggable.children[0].newClass = "cannot-replace";
        }
      });

      // Called when an element leaves a valid drop target

      draggable.addEventListener("dragleave", () => {
        draggable.children[0].newClass = "";
      });

      // Called when an element is dropped on a valid drop target

      draggable.addEventListener("drop", () => {
        const selectedElement = this.shadowRoot.querySelector(".dragging");
        draggable.children[0].newClass = "";
        if (selectedElement !== draggable && draggable.value.isDraggable) {
          if (selectedElement.value.title === draggable.value.title) {
            draggable.children[0].loader = true;
            this.isDragging = true;
            setTimeout(() => {
              selectedElement.classList.remove("dragging");
              draggable.children[0].loader = false;
              this.items.forEach((item) => {
                this.counter++;
                if (item.listItems.includes(selectedElement.value)) {
                  this.fromParent = this.items.indexOf(item);
                  this.fromChild = item.listItems.indexOf(
                    selectedElement.value
                  );
                }
                if (item.listItems.includes(draggable.value)) {
                  this.toParent = this.items.indexOf(item);
                  this.toChild = item.listItems.indexOf(draggable.value);
                }
                if (this.counter === this.items.length) {
                  console.log("from" + this.fromParent + this.fromChild);
                  console.log("to" + this.toParent + this.toChild);
                  this.counter = 0;
                  const temp = this.items.slice();
                  const x = temp[this.fromParent].listItems[this.fromChild];
                  temp[this.toParent].listItems[this.toChild] = x;
                  temp[this.fromParent].listItems.splice(this.fromChild, 1);
                  this.items = temp.slice();
                  console.log(this.items);
                }
              });
            }, 800);
          }
        }
      });
    });
  }

  render() {
    return html`
      <div class="main-container">
        <div class="loader"></div>
        <table class="container">
          <thead>
            <tr>
              <th><h1>Parent</h1></th>
              <th><h1>Children</h1></th>
            </tr>
          </thead>
          <tbody>
            ${this.items.map((item) => {
              return html`
                <tr>
                  <td>${item.name}</td>
                  <td>
                    ${item.listItems.map((data) => {
                      return html`
                        <div class="draggable-main" .value=${data}>
                          <app-card .item=${data}></app-card>
                        </div>
                      `;
                    })}
                  </td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>
    `;
  }
}

window.customElements.define("app-main", AppMain);
