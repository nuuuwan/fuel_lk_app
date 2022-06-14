import * as React from "react";
import { Component } from "react";

import Box from "@mui/material/Box";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";

// import ReactGA from "react-ga";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

export default class HomePage extends Component {
  componentDidMount() {
    // ReactGA.pageview(window.location.pathname);
  }

  onClickBack() {
    window.history.back();
    window.location.reload(true);
  }

  render() {
    return (
      <Box sx={STYLE}>
        <CustomAppBar />
        <CustomBottomNavigation onClickBack={this.onClickBack.bind(this)} />
      </Box>
    );
  }
}
