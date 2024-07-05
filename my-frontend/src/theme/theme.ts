import { createTheme } from "@mui/material/styles";

const primaryFont = "Josefin Sans, sans-serif";
const secondaryFont = "Poppins, sans-serif";

const theme = createTheme({
  palette: {
    primary: {
        main: '#856885',
        light: '#cfc2cf',
        dark: '#742574',
        contrastText: '#fff'
    },
    secondary: {
      main: "#241b35",
      dark: "#241b35",
      light: "rgba(0, 0, 0, 0.04);"
    },
  },
  typography: {
    fontFamily: secondaryFont,
    h1: {
      fontFamily: primaryFont,
    },
    h2: {
      fontFamily: primaryFont,
    },
    h3: {
      fontFamily: primaryFont,
    },
    h4: {
      fontFamily: primaryFont,
    },
    h5: {
      fontFamily: primaryFont,
    },
    h6: {
      fontFamily: primaryFont,
    },
  },
});

export default theme;
