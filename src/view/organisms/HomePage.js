import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import FuelLKAppServer from "../../nonview/core/FuelLKAppServer";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import ShedsView from "../../view/molecules/ShedsView";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { shedBasics: null };
  }

  async componentDidMount() {
    const [province, district, fuelType] = [1, 1, "p92"];
    const shedBasics = await FuelLKAppServer.multigetShedBasics(
      province,
      district,
      fuelType
    );
    this.setState({ shedBasics });
  }

  onClickBack() {
    window.history.back();
    window.location.reload(true);
  }

  render() {
    const { shedBasics } = this.state;
    if (!shedBasics) {
      return <CircularProgress />;
    }

    return (
      <Box sx={STYLE}>
        <CustomAppBar />
        <ShedsView shedBasics={shedBasics} />
        <CustomBottomNavigation onClickBack={this.onClickBack.bind(this)} />
      </Box>
    );
  }
}
