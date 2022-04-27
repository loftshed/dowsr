import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    /*-------------------------------------------|
    | Some values to be made available globally. |
    --------------------------------------------*/
    :root {
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
      color: ${(props) => props.theme.colors.lightGrey};
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
      text-shadow: 2px 1px 1px ${(props) => props.theme.colors.pink};
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
      background-color: ${(props) => props.theme.colors.lessDarkGrey};
      padding: 5px;
      outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
    }
    .mapboxgl-popup-anchor-bottom > .mapboxgl-popup-tip {
      border-top-color: ${(props) => props.theme.colors.lessDarkGrey};
    }

    /*--------------------------------------------------|
    | Stuff above from Josh W. Comeau CSS reset...      |
    | https://www.joshwcomeau.com/css/custom-css-reset/ |
    ---------------------------------------------------*/
`;

export default GlobalStyle;
