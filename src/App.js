import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/organisms/HomePage.js";

const THEME = createTheme({
  palette: {
    primary: {
      main: "#c00",
    },
    secondary: {
      main: "#f80",
    },
    success: {
      main: "#080",
    },
    info: {
      main: "#cc0",
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
