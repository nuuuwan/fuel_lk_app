import { Component } from "react";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const STYLE_MAP = {
  zIndex: -1000,
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return null;
}

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
        <SetViewOnClick />
      </MapContainer>
    );
  }
}
