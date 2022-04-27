import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    /*-------------------------------------------|
    | Some values to be made available globally. |
    --------------------------------------------*/
    :root {
      --color-pink: #ef476f;
      --color-yellow: #ffd166;
      --color-green: #06d6a0;
      --color-med-blue: #118ab2;
      --color-dark-blue: #073b4c;
      --color-darkest-blue: #05161c;
      --color-almost-darkest-blue: #05181e;
      --color-button-bg: #1e2021;

      --color-dark-grey: #393e41;
      --color-less-dark-grey: #444948;
      --color-darkest-grey: #353535;
      --color-extra-medium-grey: #8d8d92;
      --color-super-dark-grey: #1e1e1e;
      --color-medium-grey: #d3d0cb;
      --color-light-grey: #e7e5df;
      --color-teal: #44bba4;
      --color-gold: #e7bb41;

      --color-water: #48cae4;
      --color-toilet: #b2967d;
      --color-hazard: #e76f51;
      --color-police: #118ab2;
    }

    /*-----------------|
    | Some defaults... |
    ------------------*/

    * {
      font-weight: 500;
      color: var(--color-light-grey);
      /* font-family: 'Lato', sans-serif; */
      font-family: "Karla";
    }
    
    .react-icons {
       vertical-align: middle;
    }
    
    p {
      font-size: 20px;
    }

    h1, h2, h3 {
      font-weight: 800;
      font-family: 'M PLUS Rounded 1c', sans-serif;
      text-shadow: 2px 1px 1px var(--color-pink);
    }
    h1 {
      font-size: 60px;
      
    }
    h2 {
      font-size: 30px;
      @media (max-width: 450px) {
        font-size: 22px;
      }
    }
    h3 {
      font-size: 20px;
      @media (min-width: 450px) {
        font-size: 22px;
      }
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
      font-family: 'Lato', sans-serif;

    }
    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }
    input, button, textarea, select {
      font: inherit;
      text-overflow: ellipsis;
    }
    p, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
    }
    #root, #__next {
      isolation: isolate;
    }
    #root {
      height: 100%;
    }
        
    .mapboxgl-popup-content {
      background-color: var(--color-less-dark-grey);
      padding: 5px;
      outline: 1px solid var(--color-super-dark-grey);
    }
    .mapboxgl-popup-anchor-bottom > .mapboxgl-popup-tip {
      border-top-color: var(--color-less-dark-grey);
    }

    /*--------------------------------------------------|
    | Stuff above from Josh W. Comeau CSS reset...      |
    | https://www.joshwcomeau.com/css/custom-css-reset/ |
    ---------------------------------------------------*/
`;

export default GlobalStyle;
