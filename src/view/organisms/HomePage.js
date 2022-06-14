import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import FuelLKAppServer from "../../nonview/core/FuelLKAppServer";

import CustomAppBar from "../../view/molecules/CustomAppBar.js";
import CustomBottomNavigation from "../../view/molecules/CustomBottomNavigation.js";
import ShedsView from "../../view/molecules/ShedsView";
import GeoMap from "../../view/organisms/GeoMap"

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
    this.state = { shedBasics: null };
  }

  async componentDidMount() {
    const [province, district, fuelType] = [1, 1, "p92"];
    const shedBasicsAll = await FuelLKAppServer.multigetShedBasics(
      province,
      district,
      fuelType
    );
    const shedBasics = shedBasicsAll.filter(
      function(shedBasic) {
        return shedBasic.shedownerupdatetoday;
      }
    ).splice(0, 5);
    console.debug(shedBasics[0]);

    const sheds = await Promise.all(
      shedBasics.map(
        async function(shedBasic) {
          return await FuelLKAppServer.getShed(shedBasic.shedId);
        },
      )
    );
    console.debug(sheds[0]);

    this.setState({ shedBasics, sheds });
  }

  onClickBack() {
    window.history.back();
    window.location.reload(true);
  }

  render() {
    const { shedBasics } = this.state;
    if (!shedBasics) {
      return <CircularProgress />;
    }

    return (
      <Box sx={STYLE}>
        <CustomAppBar />
        <GeoMap center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} />
        <ShedsView shedBasics={shedBasics} />
        <CustomBottomNavigation onClickBack={this.onClickBack.bind(this)} />
      </Box>
    );
  }
}
