import { Component } from "react";
import * as React from "react";
// import ReactGA from "react-ga";

import Box from "@mui/material/Box";
import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation.js";
import VersionWidget from "../../nonstate/atoms/VersionWidget.js";
import CustomAppBar from "../../nonstate/molecules/CustomAppBar.js";

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

        <VersionWidget />

        <CustomBottomNavigation onClickBack={this.onClickBack.bind(this)} />
      </Box>
    );
  }
}
