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
const DEFAULT_ZOOM_NEARBY = 14;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shedStatusList: undefined,
      center: undefined,
      zoom: undefined,
    };
  }

  async componentDidMount() {
    const center = await this.getGeoLocation();
    const zoom = DEFAULT_ZOOM_NEARBY;
    const shedStatusList = await FuelData.multigetExtendedShedList();
    this.setState({ center, zoom, shedStatusList });
  }

  async getGeoLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve([position.coords.latitude, position.coords.longitude]);
      });
    });
  }

  onClickRefresh() {
    localStorage.clear();
    window.location.reload(true);
  }

  async onClickZoomOut() {
    const center = DEFAULT_CENTER;
    const zoom = DEFAULT_ZOOM;
    const shedStatusList = await FuelData.multigetShedStatusList();
    this.setState({ center, zoom, shedStatusList });
  }

  async onClickNearby() {
    const center = await this.getGeoLocation();
    const zoom = DEFAULT_ZOOM_NEARBY;
    this.setState({ center, zoom });
  }

  renderInner() {
    const { shedStatusList } = this.state;
    if (!shedStatusList) {
      return null;
    }
    return shedStatusList.map(function (shedStatus, iShed) {
      return <ShedView key={"shed-" + iShed} shedStatus={shedStatus} />;
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
          onClickRefresh={this.onClickRefresh.bind(this)}
          onClickNearby={this.onClickNearby.bind(this)}
          onClickZoomOut={this.onClickZoomOut.bind(this)}
        />
      </Box>
    );
  }
}
