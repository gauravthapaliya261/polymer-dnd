import { css } from "@lit/reactive-element";

export const style = css`
  :host {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  }

  h1 {
    font-size: 3em;
    font-weight: 300;
    line-height: 1em;
    text-align: center;
    color: #4dc3fa;
  }

  .container th h1 {
    font-weight: bold;
    font-size: 1em;
    text-align: left;
    color: #185875;
  }

  .container td {
    font-weight: normal;
    font-size: 1em;
    -webkit-box-shadow: 0 2px 2px -2px #0e1119;
    -moz-box-shadow: 0 2px 2px -2px #0e1119;
    box-shadow: 0 2px 2px -2px #0e1119;
  }

  .container {
    text-align: left;
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
    display: table;
    padding: 0 0 8em 0;
  }

  .container td,
  .container th {
    padding-bottom: 2%;
    padding-top: 2%;
    padding-left: 2%;
    color: #ffffff;
  }

  /* Background-color of the odd rows */
  .container tr:nth-child(odd) {
    background-color: #64676b;
  }

  /* Background-color of the even rows */
  .container tr:nth-child(even) {
    background-color: #acb5c9;
  }

  .container th {
    background-color: #edeff3;
  }

  .container td:first-child {
    color: #ffffff;
    display: table-cell !important;
  }

  @media (max-width: 800px) {
    .container td:nth-child(4),
    .container th:nth-child(4) {
      display: none;
    }
  }
  .main-container {
    padding: 10px;
  }

  .card-container {
    display: flex;
    min-height: 400px;
    width: 80%;
    flex-wrap: wrap;
    justify-content: center;
    border: 3px solid black;
    border-radius: 10px;
    margin: 20px;
  }

  tbody td{
    display: inline-flex;
  }
  .draggable-main {
    display: inline-table;
  }

  .dragging {
    opacity: 0.5;
  }
`;
