import { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const STYLE_MAP = {
  zIndex: 0,
  width: "100%",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};
export default class GeoMap extends Component {
  render() {
    const { center, zoom } = this.props;
    return (
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        style={STYLE_MAP}
      >
        <TileLayer url={URL_FORMAT} />
        {this.props.children}
      </MapContainer>
    );
  }
}
