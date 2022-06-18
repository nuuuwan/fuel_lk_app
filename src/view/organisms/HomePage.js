import { Component } from "react";

import Box from "@mui/material/Box";

import { HOURS_IN } from "../../nonview/base/TimeX";
import FuelData from "../../nonview/core/FuelData";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import ShedView from "../../view/molecules/ShedView";
import GeoMap from "../../view/organisms/GeoMap";
import URLContext from "../../nonview/base/URLContext";
import I18N from "../../nonview/base/I18N";

const DEFAULT_CENTER = [6.9172, 79.8648]; // Town Hall
const DEFAULT_ZOOM = 15;

const DEFAULT_CENTER_ZOOM_OUT = [7.6, 80.7]; // Dambulla
const DEFAULT_ZOOM_ZOOM_OUT = 7;

const DEFAULT_ZOOM_NEARBY = 15;

const DEFAULT_FUEL_GROUP_ID = "p92.p95.d.sd.k";
const DEFAUL_MAX_DISPLAY_RECENCY_HOURS = HOURS_IN.DAY;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const fuelGroupID = DEFAULT_FUEL_GROUP_ID;
    const maxDisplayRecencyHours = DEFAUL_MAX_DISPLAY_RECENCY_HOURS;
    const lang = I18N.getLang();

    this.state = {
      extendedShedList: undefined,
      center: undefined,
      zoom: undefined,
      fuelGroupID,
      maxDisplayRecencyHours,
    };

    URLContext.setContext({
      fuelGroupID,
      maxDisplayRecencyHours,
      lang,
    });
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

  onSelectFuelGroupID(fuelGroupID) {
    this.setState({ fuelGroupID });
  }

  onSelectMaxDisplayRecencyHours(maxDisplayRecencyHours) {
    this.setState({ maxDisplayRecencyHours });
  }

  renderInner() {
    const { extendedShedList, fuelGroupID, maxDisplayRecencyHours } =
      this.state;
    if (!extendedShedList) {
      return null;
    }
    return extendedShedList.map(function (extendedShed, iShed) {
      return (
        <ShedView
          key={"shed-" + iShed}
          extendedShed={extendedShed}
          fuelGroupID={fuelGroupID}
          maxDisplayRecencyHours={maxDisplayRecencyHours}
        />
      );
    });
  }

  render() {
    const { center, zoom, fuelGroupID, maxDisplayRecencyHours } = this.state;
    const key = "geo-map-" + center + zoom;
    return (
      <Box>
        <CustomAppBar
          onSelectFuelGroupID={this.onSelectFuelGroupID.bind(this)}
          selectedFuelGroupID={fuelGroupID}
          onSelectMaxDisplayRecencyHours={this.onSelectMaxDisplayRecencyHours.bind(
            this
          )}
          selectedMaxDisplayRecencyHours={maxDisplayRecencyHours}
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
