import * as React from "react";
import { Component } from "react";

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
const DEFAULT_ZOOM = 9;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { shedBasics: [], shedIdx: {} };
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

    this.setState({ shedBasics, shedIdx: {} });
  }

  onClickRefresh() {
    localStorage.clear();
    window.location.reload(true);
  }

  onLoad(shed) {
    let { shedIdx } = this.state;
    shedIdx[shed.shedCode] = shed;
    this.setState({ shedIdx });
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


  getBounds() {
    let [center, zoom] = [DEFAULT_CENTER, DEFAULT_ZOOM];

    let minLat, maxLat, minLng, maxLng;
    let n = 0;
    for (let shed of Object.values(this.state.shedIdx)) {
      const [lat, lng] = shed.latLng;

      if (minLat === undefined || lat < minLat) {
        minLat = lat;
      }
      if (minLng === undefined || lng < minLng) {
        minLng = lng;
      }

      if (maxLat === undefined || lat > maxLat) {
        maxLat = lat;
      }
      if (maxLng === undefined || lng > maxLng) {
        maxLng = lng;
      }

      n += 1;
    }
    if (n > 1) {
      center = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
      const maxSpan = Math.max(maxLat - minLat, maxLng - minLng);
      const log10MaxSpan = parseInt(-Math.log10(maxSpan))
      zoom = DEFAULT_ZOOM + Math.max(0, log10MaxSpan * 2);
    }
    return {center, zoom};
  }

  render() {
    const { shedIdx, shedBasics } = this.state;
    const nShedsLoaded = Object.keys(shedIdx).length;
    const nShedsTotal = shedBasics.length;

    const {center, zoom} = this.getBounds();
    const key = 'geo-map-' + center + zoom;

    return (
      <Box sx={STYLE}>
        <CustomAppBar nShedsLoaded={nShedsLoaded} />
        <GeoMap key={key} center={center} zoom={zoom}>
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
