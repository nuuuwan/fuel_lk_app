import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";

import FuelData from "../../nonview/core/FuelData";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import ShedView from "../../view/molecules/ShedView";
import GeoMap from "../../view/organisms/GeoMap";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

const DEFAULT_CENTER = [7.6, 80.7]; // Dambulla
const DEFAULT_ZOOM = 7;
const DEFAULT_ZOOM_NEARBY = 15;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extendedShedList: undefined,
      center: undefined,
      zoom: undefined,
    };
  }

  async reload() {
    const center = await this.getGeoLocation();
    const zoom = DEFAULT_ZOOM_NEARBY;
    const extendedShedList = await FuelData.multigetExtendedShedList();
    this.setState({ center, zoom, extendedShedList });
  }

  async componentDidMount() {
    await this.reload();
  }

  async getGeoLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve([position.coords.latitude, position.coords.longitude]);
      });
    });
  }


  async onClickZoomOut() {
    const center = DEFAULT_CENTER;
    const zoom = DEFAULT_ZOOM;
    const extendedShedList = await FuelData.multigetExtendedShedList();
    this.setState({ center, zoom, extendedShedList });
  }

  async onClickNearby() {
    await this.reload();
  }

  renderInner() {
    const { extendedShedList } = this.state;
    if (!extendedShedList) {
      return null;
    }
    return extendedShedList.map(function (extendedShed, iShed) {
      return <ShedView key={"shed-" + iShed} extendedShed={extendedShed} />;
    });
  }

  render() {
    const { center, zoom } = this.state;
    const key = "geo-map-" + center + zoom;
    return (
      <Box sx={STYLE}>
        <CustomAppBar />
        <GeoMap key={key} center={center} zoom={zoom}>
          {this.renderInner()}
        </GeoMap>
        <CustomBottomNavigation
          onClickZoomOut={this.onClickZoomOut.bind(this)}
          onClickNearby={this.onClickNearby.bind(this)}
        />
      </Box>
    );
  }
}
