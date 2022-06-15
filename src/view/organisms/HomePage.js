import * as React from "react";
import { Component } from "react";

import Box from "@mui/material/Box";

import FuelLKAppServer from "../../nonview/core/FuelLKAppServer";

import LoadingView from "../../view/atoms/LoadingView";
import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import GeoMap from "../../view/organisms/GeoMap";
import ShedView from "../../view/organisms/ShedView";
import FuelData from "../../nonview/core/FuelData"

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

const DEFAULT_CENTER = [6.914795590744974, 79.87756643209595];
const DEFAULT_ZOOM = 9;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { shedStatusList: undefined };
  }

  async componentDidMount() {
    const shedStatusList = await FuelData.multigetShedStatusList();
    this.setState({ shedStatusList });
  }

  onClickRefresh() {
    localStorage.clear();
    window.location.reload(true);
  }

  renderInner() {
    const { shedStatusList } = this.state;
    if (!shedStatusList) {
      return null;
    }
    return shedStatusList.map(
      function (shedStatus, iShed) {
        return (
          <ShedView
            key={"shed-" + iShed}
            shedStatus={shedStatus}
          />
        );
      }.bind(this)
    );
  }

  render() {
    return (
      <Box sx={STYLE}>
        <CustomAppBar />
        <GeoMap center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
          {this.renderInner()}
        </GeoMap>
        <CustomBottomNavigation
          onClickRefresh={this.onClickRefresh.bind(this)}
        />
      </Box>
    );
  }
}
