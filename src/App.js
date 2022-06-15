import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/organisms/HomePage.js";
import SriLankaColors from "./nonview/constants/SriLankaColors"

const THEME = createTheme({
  palette: {
    primary: {
      main: SriLankaColors.Sinhala,
    },
    secondary: {
      main: SriLankaColors.Tamil,
    },
    success: {
      main: SriLankaColors.Muslim,
    },
    info: {
      main: SriLankaColors.Buddhist,
    },
  },
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    fontSize: 15,
  },
});


export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
