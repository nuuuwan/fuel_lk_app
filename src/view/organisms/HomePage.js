import { Component } from "react";

import Box from "@mui/material/Box";

import Copy from "../../nonview/base/Copy";
import Geo from "../../nonview/base/Geo";
import I18N from "../../nonview/base/I18N";
import { BASE_LANG } from "../../nonview/base/I18N";
import { HOURS_IN } from "../../nonview/base/TimeX";
import URLContext from "../../nonview/base/URLContext";
import FuelData from "../../nonview/core/FuelData";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import ShedView from "../../view/molecules/ShedView";
import TempSourceIsDown from "../../view/molecules/TempSourceIsDown";
import GeoMap from "../../view/organisms/GeoMap";

const DEFAULT_CENTER = [6.91, 79.86]; // Town Hall
const DEFAULT_ZOOM = 15;

const DEFAULT_CENTER_ZOOM_OUT = [7.6, 80.7]; // Dambulla
const DEFAULT_ZOOM_ZOOM_OUT = 7;

const DEFAULT_ZOOM_NEARBY = 15;

const DEFAULT_FUEL_GROUP_ID = "p92.p95.d.sd.k";
const DEFAUL_MAX_DISPLAY_RECENCY_HOURS = HOURS_IN.DAY;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = this.getContext();
    this.isComponentMounted = false;
    this.state = {
      extendedShedList: undefined,
      context: context,
    };
    this.setContext(context);
  }

  getContextURL() {
    const contextURL = URLContext.getContext();
    let context = Copy.deepCopy(contextURL);
    if (context.centerStr) {
      context.center = context.centerStr.split(",").map((x) => parseFloat(x));
      delete context["centerStr"];
    }
    if (context.maxDisplayRecencyHours) {
      context.maxDisplayRecencyHours = parseInt(context.maxDisplayRecencyHours);
    }
    return context;
  }

  getContext() {
    const context = this.getContextURL();

    if (!context.fuelGroupID) {
      context.fuelGroupID = DEFAULT_FUEL_GROUP_ID;
    }
    if (!context.maxDisplayRecencyHours) {
      context.maxDisplayRecencyHours = DEFAUL_MAX_DISPLAY_RECENCY_HOURS;
    }
    if (!context.lang) {
      context.lang = BASE_LANG;
    }
    if (!context.center) {
      context.center = DEFAULT_CENTER;
    }
    if (!context.zoom) {
      context.zoom = DEFAULT_ZOOM;
    }
    return context;
  }

  setContext(newContext) {
    let context = this.getContext();
    for (let [k, v] of Object.entries(newContext)) {
      context[k] = v;
    }
    if (this.isComponentMounted) {
      this.setState({ context });
    }
    this.setContextURL(context);
  }

  setContextURL(context) {
    let contextURL = Copy.deepCopy(context);
    if (contextURL.center) {
      contextURL.centerStr = contextURL.center.join(",");
    }
    delete contextURL["center"];
    URLContext.setContext(contextURL);
  }

  async reload() {
    const extendedShedList = await FuelData.multigetExtendedShedList();
    this.setState({ extendedShedList });
  }

  async componentDidMount() {
    localStorage.clear();
    await this.reload();
    this.isComponentMounted = true;
  }

  async onClickZoomOut() {
    this.setContext({
      center: DEFAULT_CENTER_ZOOM_OUT,
      zoom: DEFAULT_ZOOM_ZOOM_OUT,
    });
  }

  async onClickNearby() {
    const center = await Geo.getGeoLocation();
    this.setContext({
      center,
      zoom: DEFAULT_ZOOM_NEARBY,
    });
  }

  onSelectFuelGroupID(fuelGroupID) {
    this.setContext({ fuelGroupID });
  }

  onSelectMaxDisplayRecencyHours(maxDisplayRecencyHours) {
    this.setContext({ maxDisplayRecencyHours });
  }

  onSelectLang(lang) {
    this.setContext({ lang });
  }

  renderInner() {
    const { extendedShedList, context } = this.state;
    const { fuelGroupID, maxDisplayRecencyHours } = context;

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
    const { context } = this.state;
    const { fuelGroupID, maxDisplayRecencyHours, lang, center, zoom } = context;
    I18N.setLang(lang);

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
          onSelectLang={this.onSelectLang.bind(this)}
          selectedLang={lang}
        />

        <GeoMap key={key} center={center} zoom={zoom}>
          {this.renderInner()}
        </GeoMap>

        <CustomBottomNavigation
          onClickZoomOut={this.onClickZoomOut.bind(this)}
          onClickNearby={this.onClickNearby.bind(this)}
        />

        <TempSourceIsDown />
      </Box>
    );
  }
}
