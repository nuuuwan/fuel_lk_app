import { CircleMarker, Popup } from "react-leaflet";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FuelsView from "../../view/molecules/FuelsView";

const DEFAULT_CIRLE_RADIUS = 10;
const STYLE_CIRCLE = { color: "red", stroke: null, fillOpacity: 0.75 };

export default function ShedView({ shedStatus }) {
  return (
    <CircleMarker
      center={shedStatus["lat_lng"]}
      radius={DEFAULT_CIRLE_RADIUS}
      pathOptions={STYLE_CIRCLE}
    >
      <Popup closeButton={false}>
        <Box sx={{ maxHeight: "67vh", overflow: "scroll" }}>
          <Typography variant="caption">
            {"Last updated: " + shedStatus["time_last_updated"]}
          </Typography>
          <Typography variant="subtitle1">{shedStatus["shed_name"]}</Typography>
          <Typography variant="caption">{shedStatus["address"]}</Typography>

          <FuelsView shedStatus={shedStatus} />
        </Box>
      </Popup>
    </CircleMarker>
  );
}
