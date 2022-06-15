import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";

import FuelLKAppServer from "../../nonview/core/FuelLKAppServer";

import LoadingView from "../../view/atoms/LoadingView";
import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import GeoMap from "../../view/organisms/GeoMap";
import ShedView from "../../view/organisms/ShedView";

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
    this.state = { shedBasics: [], loadedShedIdSet: new Set() };
  }

  async componentDidMount() {
    const [province, district, fuelType] = [1, 1, "p92"];
    const shedBasicsAll = await FuelLKAppServer.multigetShedBasics(
      province,
      district,
      fuelType
    );
    const shedBasics = shedBasicsAll.filter(function (shedBasic) {
      return shedBasic.shedownerupdatetoday;
    });

    this.setState({ shedBasics, loadedShedIdSet: new Set() });
  }

  onClickRefresh() {
    localStorage.clear();
    window.location.reload(true);
  }

  onLoad(shedID) {
    let { loadedShedIdSet } = this.state;
    loadedShedIdSet.add(shedID);
    this.setState({ loadedShedIdSet: loadedShedIdSet });
  }

  renderInner() {
    const { shedBasics } = this.state;
    if (!shedBasics) {
      return null;
    }
    return shedBasics.map(
      function (shedBasic, iShed) {
        return (
          <ShedView
            key={"shed-" + iShed}
            shedBasic={shedBasic}
            onLoad={this.onLoad.bind(this)}
          />
        );
      }.bind(this)
    );
  }

  render() {
    const { loadedShedIdSet, shedBasics } = this.state;
    const nShedsLoaded = loadedShedIdSet.size;
    const nShedsTotal = shedBasics.length;

    return (
      <Box sx={STYLE}>
        <CustomAppBar nShedsLoaded={nShedsLoaded} />
        <GeoMap center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
          {this.renderInner()}
        </GeoMap>
        <LoadingView nShedsLoaded={nShedsLoaded} nShedsTotal={nShedsTotal} />

        <CustomBottomNavigation
          onClickRefresh={this.onClickRefresh.bind(this)}
        />
      </Box>
    );
  }
}
