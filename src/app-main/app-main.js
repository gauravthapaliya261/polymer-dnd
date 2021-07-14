import { html, LitElement } from "lit";
import "../app-card/app-card";
import { style } from "./styles";

class AppMain extends LitElement {
  static get properties() {
    return {
      items: { type: Array },
      newClass: { type: String },
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
    this.newClass = "";
    this.counter = 0;
    this.isDragging = false;
    this.items = [
      {
        name: "Item-1",
        listItems: [
          {
            desc: "One",
            title: "City",
            isDraggable: true,
          },
          {
            desc: "Two",
            title: "Chelsea",
            isDraggable: false,
          },
          {
            desc: "Three",
            title: "Barcelona",
            isDraggable: true,
          },
        ],
      },
      {
        name: "Item-2",
        listItems: [
          {
            desc: "Four",
            title: "Barcelona",
            isDraggable: true,
          },
          {
            desc: "Five",
            title: "Madrid",
            isDraggable: true,
          },
          {
            desc: "Six",
            title: "Chelsea",
            isDraggable: true,
          },
        ],
      },
      {
        name: "Item-3",
        listItems: [
          {
            desc: "Seven",
            title: "City",
            isDraggable: true,
          },
          {
            desc: "Eight",
            title: "Chelsea",
            isDraggable: true,
          },
        ],
      },
    ];
  }

  firstUpdated() {
    const draggables = this.shadowRoot.querySelectorAll(".draggable-main");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

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

      draggable.addEventListener("dragover", (e) => {
        e.preventDefault();
        const selectedElement = this.shadowRoot.querySelector(".dragging");
        if (selectedElement.value.title === draggable.value.title) {
          draggable.children[0].newClass = "can-replace";
        } else {
          draggable.children[0].newClass = "cannot-replace";
        }
      });

      draggable.addEventListener("dragleave", () => {
        draggable.children[0].newClass = "";
      });

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
                    ${item.listItems.map((x) => {
                      return html`
                        <div class="draggable-main" .value=${x}>
                          <app-card .item=${x}></app-card>
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
