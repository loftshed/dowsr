import { ThemeProvider, createTheme } from '@mui/material/styles';
import { cyan, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: cyan[200],
    },
    secondary: {
      main: pink[900],
    },
  },
  typography: {
    fontFamily: 'Karla',
  },
  components: {
    MuiDialog: {},
  },
});

const ThemeMUI = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeMUI;
