import * as React from "react";
import { Component } from "react";

import Box from "@mui/material/Box";
import MyLocationIcon from "@mui/icons-material/MyLocation";

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

const STYLE_MY_LOCATION = {
  position: "fixed",
  top: "47.5vh",
  left: "47.5%",
};

const DEFAULT_CENTER = [7.6, 80.7]; // Dambulla
const DEFAULT_ZOOM = 7;
const DEFAULT_ZOOM_NEARBY = 13;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shedStatusList: undefined,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    };
  }

  async componentDidMount() {
    const shedStatusList = await FuelData.multigetShedStatusList();
    this.setState({ shedStatusList });
  }

  onClickRefresh() {
    localStorage.clear();
    window.location.reload(true);
  }

  onClickNearby() {
    const onShowPosition = function (position) {
      const center = [position.coords.latitude, position.coords.longitude];
      const zoom = DEFAULT_ZOOM_NEARBY;
      this.setState({ center, zoom });
    }.bind(this);
    navigator.geolocation.getCurrentPosition(onShowPosition);
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
        />
        <MyLocationIcon style={STYLE_MY_LOCATION} />
      </Box>
    );
  }
}
