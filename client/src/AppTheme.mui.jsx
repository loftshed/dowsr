import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: "#4cad4c",
  },
});

const ThemeMUI = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeMUI;
