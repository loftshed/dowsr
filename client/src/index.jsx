import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { MapProvider } from "react-map-gl"; // for react-map-gl
import { MappingProvider } from "./components/Map/MappingContext";
import { AppProvider } from "./AppContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <MapProvider>
    <MappingProvider>
      <Auth0Provider
        domain="dev-mfsyb-f3.us.auth0.com"
        clientId={CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <AppProvider>
          <App />
        </AppProvider>
      </Auth0Provider>
    </MappingProvider>
  </MapProvider>
);
