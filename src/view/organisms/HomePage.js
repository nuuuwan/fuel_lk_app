import { Component } from "react";

import Box from "@mui/material/Box";

import { FUEL_TYPE_GROUP_IDX } from "../../nonview/core/Fuel";
import FuelData from "../../nonview/core/FuelData";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import ShedView from "../../view/molecules/ShedView";
import GeoMap from "../../view/organisms/GeoMap";

const DEFAULT_CENTER = [6.9172, 79.8648]; // Town Hall
const DEFAULT_ZOOM = 12;

const DEFAULT_CENTER_ZOOM_OUT = [7.6, 80.7]; // Dambulla
const DEFAULT_ZOOM_ZOOM_OUT = 7;

const DEFAULT_ZOOM_NEARBY = 15;

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

  async reload(center, zoom) {
    const extendedShedList = await FuelData.multigetExtendedShedList();
    this.setState({ center, zoom, extendedShedList });
  }

  async componentDidMount() {
    localStorage.clear();
    await this.reload(DEFAULT_CENTER, DEFAULT_ZOOM);
  }

  async getGeoLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function (position, error) {
        if (error) {
          resolve(DEFAULT_CENTER);
        } else {
          resolve([position.coords.latitude, position.coords.longitude]);
        }
      });
    });
  }

  async onClickZoomOut() {
    await this.reload(DEFAULT_CENTER_ZOOM_OUT, DEFAULT_ZOOM_ZOOM_OUT);
  }

  async onClickNearby() {
    await this.reload(DEFAULT_CENTER, DEFAULT_ZOOM_NEARBY);
    const center = await this.getGeoLocation();
    await this.reload(center, DEFAULT_ZOOM_NEARBY);
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
