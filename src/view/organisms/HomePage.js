import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";

import FuelLKAppServer from "../../nonview/core/FuelLKAppServer";
import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import GeoMap from "../../view/organisms/GeoMap"
import ShedView from "../../view/organisms/ShedView"

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

const DEFAULT_CENTER = [6.914795590744974, 79.87756643209595];
const DEFAULT_ZOOM = 10;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { shedBasics: null };
  }

  async componentDidMount() {
    const [province, district, fuelType] = [1, 1, "p92"];
    const shedBasicsAll = await FuelLKAppServer.multigetShedBasics(
      province,
      district,
      fuelType
    );
    const shedBasics = shedBasicsAll.filter(
      function(shedBasic) {
        return shedBasic.shedownerupdatetoday;
      }
    );

    this.setState({ shedBasics });
  }

  onClickBack() {
    window.history.back();
    window.location.reload(true);
  }


  renderInner() {
    const { shedBasics } = this.state;
    if (!shedBasics) {
      return null;
    }
    return shedBasics.map(
      function(shedBasic, iShed) {
        return (
          <ShedView key={"shed-" + iShed} shedBasic={shedBasic} />
        );
      }
    );
  }

  render() {
    return (
      <Box sx={STYLE}>
        <CustomAppBar />
        <GeoMap center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
          {this.renderInner()}
        </GeoMap>
        <CustomBottomNavigation onClickBack={this.onClickBack.bind(this)} />
      </Box>
    );
  }
}
