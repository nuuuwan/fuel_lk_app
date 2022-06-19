import { Component } from "react";

import Box from "@mui/material/Box";

import Copy from "../../nonview/base/Copy";
import Geo from "../../nonview/base/Geo";
import I18N, { BASE_LANG } from "../../nonview/base/I18N";
import { HOURS_IN } from "../../nonview/base/TimeX";
import URLContext from "../../nonview/base/URLContext";
import CombinedDataServer from "../../nonview/core/CombinedDataServer";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import ShedDrawer from "../../view/molecules/ShedDrawer";
import ShedView from "../../view/molecules/ShedView";
import TempSourceIsDown from "../../view/molecules/TempSourceIsDown";
import CommunityFeed from "../../view/organisms/CommunityFeed";
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
      extendedShedIdx: undefined,
      context: context,
      isOpenFeed: true,
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
    if (!context.shedCode) {
      context.shedCode = "";
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
    const extendedShedIdx = await CombinedDataServer.getExtendedShedIdx();
    this.setState({ extendedShedIdx });
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

  onClickShed(extendedShed) {
    this.setContext({ shedCode: extendedShed.shedCode, isOpenFeed: false });
  }

  onCloseDrawer() {
    this.setContext({ shedCode: "" });
  }

  onOpenDrawerFeed() {
    this.setState({ isOpenFeed: true, shedCode: "" });
  }

  onCloseDrawerFeed() {
    this.setState({ isOpenFeed: false });
  }

  renderInner() {
    const { extendedShedIdx, context, isOpenFeed } = this.state;
    const { fuelGroupID, maxDisplayRecencyHours, shedCode } = context;

    if (!extendedShedIdx) {
      return null;
    }

    return (
      <Box>
        {Object.values(extendedShedIdx).map(
          function (extendedShed, iShed) {
            return (
              <ShedView
                key={"shed-" + iShed}
                extendedShed={extendedShed}
                fuelGroupID={fuelGroupID}
                maxDisplayRecencyHours={maxDisplayRecencyHours}
                onClickShed={this.onClickShed.bind(this)}
              />
            );
          }.bind(this)
        )}
        <ShedDrawer
          onCloseDrawer={this.onCloseDrawer.bind(this)}
          extendedShed={extendedShedIdx[shedCode]}
        />
        <CommunityFeed
          isOpenFeed={isOpenFeed}
          onCloseDrawerFeed={this.onCloseDrawerFeed.bind(this)}
          extendedShedIdx={extendedShedIdx}
        />
      </Box>
    );
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
          onOpenDrawerFeed={this.onOpenDrawerFeed.bind(this)}
        />

        <TempSourceIsDown />
      </Box>
    );
  }
}
