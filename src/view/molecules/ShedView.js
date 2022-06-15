import { CircleMarker, Popup } from "react-leaflet";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import HumanTime from "../../view/atoms/HumanTime";
import FuelsView from "../../view/molecules/FuelsView";
import LabelledBox from "../../view/molecules/LabelledBox";

const DEFAULT_CIRLE_RADIUS = 10;
const STYLE_CIRCLE = { stroke: null, fillOpacity: 0.6, zIndex: 2000 };

export default function ShedView({ shedStatus }) {
  const currentTime = parseInt(new Date() / 1_000.0);
  let hasRecentDispatch = false;
  for (let dispatch of shedStatus["dispatch_schedule_list"]) {
    const deltaToDispatch = dispatch["time_eta_ut"] - currentTime;
    if (deltaToDispatch > -3600 * 6) {
      hasRecentDispatch = true;
    }
  }

  const color = hasRecentDispatch ? "green" : "red";

  return (
    <CircleMarker
      center={shedStatus["lat_lng"]}
      radius={DEFAULT_CIRLE_RADIUS}
      pathOptions={{ ...STYLE_CIRCLE, ...{ color } }}
    >
      <Popup closeButton={false}>
        <Box sx={{ maxHeight: "67vh", overflow: "scroll" }}>
          <LabelledBox label="Last Updated">
            <HumanTime ut={shedStatus["time_last_updated_ut"]} />
          </LabelledBox>
          <Typography variant="subtitle1">{shedStatus["shed_name"]}</Typography>
          <Typography variant="caption">{shedStatus["address"]}</Typography>

          <FuelsView shedStatus={shedStatus} />
        </Box>
      </Popup>
    </CircleMarker>
  );
}
