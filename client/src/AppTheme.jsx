import React from "react";
import { ThemeProvider } from "styled-components/macro";

const theme = {
  colors: {
    pink: "#ef476f",
    yellow: "#ffd166",
    green: "#06d6a0",
    medBlue: "#118ab2",
    darkBlue: "#073b4c",
    darkestBlue: "#05161c",
    almostDarkestBlue: "#05181e",
    buttonBg: "#1e2021",
    darkGrey: "#393e41",
    lessDarkGrey: "#444948",
    darkestGrey: "#353535",
    extraMediumGrey: "#8d8d92",
    superDarkGrey: "#1e1e1e",
    mediumGrey: "#d3d0cb",
    lightGrey: "#e7e5df",
    teal: "#44bba4",
    gold: "#e7bb41",
    water: "#48cae4",
    toilet: "#b2967d",
    hazard: "#e76f51",
    police: "#118ab2",
  },
  sizes: {
    widthMax: 1280,
    widthMed: 820,
    widthMin: 450,
    smlHeader: 50,
    lrgHeader: 85,
    menuHeightCompact: 55,
    universalPadding: 20,
    topBottomPadding: 10,
    smallPadding: 10,
    borderRadius: 10,
    iconSize: 25,
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
export default Theme;
