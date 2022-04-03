import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    /*-------------------------------------------|
    | Some values to be made available globally. |
    --------------------------------------------*/
    :root {
      --header-height: 100px;
      --color-pink: #ef476f;
      --color-yellow: #ffd166;
      --color-green: #06d6a0;
      --color-med-blue: #118ab2;
      --color-dark-blue: #073b4c;
    }

    /*--------------------------------------------------|
    | Stuff below from Josh W. Comeau CSS reset...      |
    | https://www.joshwcomeau.com/css/custom-css-reset/ |
    ---------------------------------------------------*/
    *, *::before, *::after {
      box-sizing: border-box;
    }
    * {
      margin: 0;
    }
    html, body {
      height: 100%;
    }
    body {
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }
    input, button, textarea, select {
      font: inherit;
    }
    p, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
    }
    #root, #__next {
      isolation: isolate;
    }
    /*--------------------------------------------------|
    | Stuff above from Josh W. Comeau CSS reset...      |
    | https://www.joshwcomeau.com/css/custom-css-reset/ |
    ---------------------------------------------------*/
`;

export default GlobalStyle;
