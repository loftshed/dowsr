import React from "react";
import { ThemeProvider } from "styled-components/macro";

const theme = {
  colors: {
    whitest: "#fffafb",
    paleteal: "#ccdad1",
    lightcyan: "#7de2d1",
    seagreen: "#339989",
    midgrey: "#788585",
    darkgrey: "#2b2c28",
    darkest: "#131515",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
export default Theme;
