import { CircleMarker, Popup } from "react-leaflet";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";

import AlignCenter from "../../view/atoms/AlignCenter";
import HumanTime from "../../view/atoms/HumanTime";
import ShedAvatar from "../../view/atoms/ShedAvatar";
import FuelsView from "../../view/molecules/FuelsView";
import LabelledBox from "../../view/molecules/LabelledBox";

const DEFAULT_CIRLE_RADIUS = 15;
const STYLE_CIRCLE = {
  stroke: true,
  fillOpacity: 0.4,
  zIndex: 2000,
};
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
  for (let value of Object.values(shedStatus["fuel_status_idx"])) {
    if (value.capacity > 0) {
      return true;
    }
  }
  return false;
}

export default function ShedView({ shedStatus }) {
  const hasRecentDispatch = getHasRecentDispatch(shedStatus);
  const hasListedStock = getHasListedStock(shedStatus);

  let fillColor = "red";
  if (hasRecentDispatch) {
    fillColor = "green";
  } else if (hasListedStock) {
    fillColor = "orange";
  }

  const color = shedStatus["shed_type"] === 1 ? "black" : "gray";

  return (
    <CircleMarker
      center={shedStatus["lat_lng"]}
      radius={DEFAULT_CIRLE_RADIUS}
      pathOptions={{ ...STYLE_CIRCLE, ...{ fillColor, color } }}
    >
      <Popup closeButton={false}>
        <Box sx={{ maxHeight: "50vh", overflow: "scroll", width: 240 }}>
          <AlignCenter>
            <ShedAvatar shedStatus={shedStatus} />
            <Typography variant="subtitle2">
              {shedStatus["shed_name"]}
            </Typography>
          </AlignCenter>
          <Typography variant="caption">{shedStatus["address"]}</Typography>
          <FuelsView shedStatus={shedStatus} />
          <LabelledBox label="Last Updated by Shed">
            <HumanTime ut={shedStatus["time_last_updated_by_shed_ut"]} />
          </LabelledBox>
        </Box>
      </Popup>
    </CircleMarker>
  );
}
