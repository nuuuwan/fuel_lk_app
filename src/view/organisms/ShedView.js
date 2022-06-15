import { Component } from "react";
import { CircleMarker, Popup } from "react-leaflet";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FuelLKAppServer from "../../nonview/core/FuelLKAppServer";

import FuelsView from "../../view/molecules/FuelsView";

const DEFAULT_CIRLE_RADIUS = 10;

export default class ShedView extends Component {
  constructor(props) {
    super(props);
    this.state = { shed: null };
  }

  async componentDidMount() {
    const { shedBasic, onLoad } = this.props;
    const shed = await FuelLKAppServer.getShed(shedBasic.shedId);
    onLoad(shedBasic.shedId);
    this.setState({ shed });
  }

  render() {
    const { shed } = this.state;
    if (!shed) {
      return null;
    }
    return (
      <CircleMarker
        center={shed.latLng}
        radius={DEFAULT_CIRLE_RADIUS}
        pathOptions={{ color: "red", stroke: null, fillOpacity: 0.5 }}
      >
        <Popup closeButton={false}>
          <Box sx={{ maxHeight: "67vh", overflow: "scroll" }}>
            <Typography variant="caption">
              {"Last updated: " + shed.lastUpdateTimeDate.toLocaleString()}
            </Typography>
            <Typography variant="subtitle1">{shed.shedName}</Typography>
            <Typography variant="caption">{shed.address}</Typography>

            <FuelsView shed={shed} />
          </Box>
        </Popup>
      </CircleMarker>
    );
  }
}
