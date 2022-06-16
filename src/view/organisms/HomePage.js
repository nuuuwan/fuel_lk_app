import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";

import { FUEL_TYPE_GROUP_IDX } from "../../nonview/core/Fuel";
import FuelData from "../../nonview/core/FuelData";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import ShedView from "../../view/molecules/ShedView";
import GeoMap from "../../view/organisms/GeoMap";

const DEFAULT_CENTER = [7.6, 80.7]; // Dambulla
const DEFAULT_CENTER_NEARBY = [6.911363266102478, 79.877423368697]; // Town Hall
const DEFAULT_ZOOM = 7;
const DEFAULT_ZOOM_NEARBY = 14;
const DEFAULT_FUEL_TYPE_LIST = FUEL_TYPE_GROUP_IDX["All Fuels"];

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extendedShedList: undefined,
      center: undefined,
      zoom: undefined,
      fuelTypeList: DEFAULT_FUEL_TYPE_LIST,
    };
  }

  async reloadDefault() {
    const center = DEFAULT_CENTER_NEARBY;
    const zoom = DEFAULT_ZOOM_NEARBY;
    const extendedShedList = await FuelData.multigetExtendedShedList();
    this.setState({ center, zoom, extendedShedList });
  }

  async reload() {
    const center = await this.getGeoLocation();
    const zoom = DEFAULT_ZOOM_NEARBY;
    const extendedShedList = await FuelData.multigetExtendedShedList();
    this.setState({ center, zoom, extendedShedList });
  }

  async componentDidMount() {
    await this.reloadDefault();
    await this.reload();
  }

  async getGeoLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function (position, error) {
        if (error) {
          resolve(DEFAULT_CENTER_NEARBY);
        } else {
          resolve([position.coords.latitude, position.coords.longitude]);
        }
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
    localStorage.clear();
    window.location.reload();
  }

  onSelectFuelTypeList(fuelTypeList) {
    this.setState({ fuelTypeList });
  }

  renderInner() {
    const { extendedShedList, fuelTypeList } = this.state;
    if (!extendedShedList) {
      return null;
    }
    return extendedShedList.map(function (extendedShed, iShed) {
      return (
        <ShedView
          key={"shed-" + iShed}
          extendedShed={extendedShed}
          fuelTypeList={fuelTypeList}
        />
      );
    });
  }

  render() {
    const { center, zoom, fuelTypeList } = this.state;
    const key = "geo-map-" + center + zoom;
    return (
      <Box>
        <CustomAppBar
          onSelectFuelTypeList={this.onSelectFuelTypeList.bind(this)}
          selectedFuelTypeList={fuelTypeList}
        />

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
