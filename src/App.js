import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import SriLankaColors from "./nonview/constants/SriLankaColors";

import HomePage from "./view/organisms/HomePage.js";

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
    fontSize: 12,
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
