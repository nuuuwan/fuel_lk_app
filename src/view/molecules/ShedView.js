import { CircleMarker, Popup } from "react-leaflet";

import TimeX, {SECONDS_IN} from "../../nonview/base/TimeX"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import HumanTime from "../../view/atoms/HumanTime";
import FuelsView from "../../view/molecules/FuelsView";
import LabelledBox from "../../view/molecules/LabelledBox";

const DEFAULT_CIRLE_RADIUS = 10;
const STYLE_CIRCLE = { stroke: null, fillOpacity: 0.8, zIndex: 2000 };
const MAX_RECENCY_HOURS = 12;
function getHasRecentDispatch(shedStatus) {
  const currentTime = TimeX.getUnixTime();
  for (let dispatch of shedStatus["dispatch_schedule_list"]) {
    const deltaToDispatch = dispatch["time_eta_ut"] - currentTime;
    if (deltaToDispatch > -MAX_RECENCY_HOURS * SECONDS_IN.HOUR) {
      return true;
    }
  }
  return false;
}

function getHasListedStock(shedStatus) {
  for (let value of Object.values(shedStatus['fuel_status_idx'])) {
    if (value.capacity > 0) {
      return true;
    }
  }
  return false;
}

export default function ShedView({ shedStatus }) {
  const hasRecentDispatch = getHasRecentDispatch(shedStatus);
  const hasListedStock = getHasListedStock(shedStatus);

  let color = "red";
  if (hasRecentDispatch) {
    color = "green";
  } else if (hasListedStock) {
    color = "orange";
  }

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
