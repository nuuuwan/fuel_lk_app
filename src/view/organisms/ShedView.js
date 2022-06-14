import { Component } from "react";

import Typography from '@mui/material/Typography';
import { CircleMarker, Popup } from "react-leaflet";

import FuelLKAppServer from "../../nonview/core/FuelLKAppServer";

const DEFAULT_CIRLE_RADIUS = 10;


export default class ShedView extends Component {
  constructor(props) {
    super(props);
    this.state = {shed: null};
  }

  async componentDidMount() {
    const {shedBasic} = this.props;
    const shed = await FuelLKAppServer.getShed(shedBasic.shedId);
    this.setState({shed});
  }

  render() {
    const {shed} = this.state;
    if (!shed) {
      return null;
    }
    return (
      <CircleMarker
        center={shed.latLng}
        radius={DEFAULT_CIRLE_RADIUS}
        pathOptions={{ color: 'red', stroke: null, fillOpacity: 0.5 }}
      >
      <Popup>
        <Typography variant="h6">{shed.shedName}</Typography>
        <Typography variant="body1">{shed.address}</Typography>

      </Popup>
      </CircleMarker>
    );
  }
}
