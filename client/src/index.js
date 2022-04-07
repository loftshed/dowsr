import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { AppProvider } from "./AppContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-mfsyb-f3.us.auth0.com"
      clientId={CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <AppProvider>
        <App />
      </AppProvider>
    </Auth0Provider>
  </React.StrictMode>
);
