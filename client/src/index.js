import React from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./AppContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

// React 17
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import AppContext from "./AppContext";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
