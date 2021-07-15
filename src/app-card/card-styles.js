import { css } from "@lit/reactive-element";

export const style = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .card {
    margin: 20px;
    padding: 20px;
    min-width: 135px;
    max-width: 200px;
    max-height: 105px;
    display: grid;
    user-select: none;
    grid-template-rows: 20px 50px 1fr 50px;
    border-radius: 10px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.5s;
  }

  .card:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.01);
  }

  .card-title {
    font-weight: 200;
    color: #ffffff;
  }

  .draggable {
    background: radial-gradient(#1fe4f5, #3fbafe);
    /* background: radial-gradient(#1ff57f, #8bfe3f); */

    /* background: radial-gradient(rgb(58 143 249), rgb(4 93 142)) */
    cursor: move;
  }

  .can-replace {
    /* background: radial-gradient(#1ff57f, #8bfe3f); */
    background: radial-gradient(rgb(27 255 0), rgb(94 236 0));
  }

  .undraggable {
    background: radial-gradient(rgb(126 127 128), rgb(126 127 128));
    cursor: not-allowed;
  }

  .cannot-replace {
    background: radial-gradient(#f51f1f, #7c0505);
  }

  h2 {
    margin-top: 1.5rem;
    font-weight: 100;
    color: #ffffff;
  }

  @media (max-width: 1600px) {
    .card-container {
      justify-content: center;
    }
  }

  .loader {
    margin: auto;
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
