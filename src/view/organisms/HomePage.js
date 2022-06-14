import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import FuelLKAppServer from "../../nonview/core/FuelLKAppServer";
import FuelInfoListView from "../../view/molecules/FuelInfoListView";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { fuelInfoList: null };
  }

  async componentDidMount() {
    const [province, district, fuelType] = [1, 1, "p92"];
    const fuelInfoList = await FuelLKAppServer.multiGetFuelInfoList(
      province,
      district,
      fuelType
    );
    this.setState({ fuelInfoList });
  }

  onClickBack() {
    window.history.back();
    window.location.reload(true);
  }

  render() {
    const { fuelInfoList } = this.state;
    if (!fuelInfoList) {
      return <CircularProgress />;
    }

    return (
      <Box sx={STYLE}>
        <CustomAppBar />
        <FuelInfoListView fuelInfoList={fuelInfoList} />
        <CustomBottomNavigation onClickBack={this.onClickBack.bind(this)} />
      </Box>
    );
  }
}
