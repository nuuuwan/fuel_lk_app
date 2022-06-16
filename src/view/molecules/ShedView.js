import { CircleMarker, Popup } from "react-leaflet";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { SECONDS_IN } from "../../nonview/base/TimeX";
import ExtendedShed from "../../nonview/core/ExtendedShed";

import AlignCenter from "../../view/atoms/AlignCenter";
import HumanTime from "../../view/atoms/HumanTime";
import Link from "../../view/atoms/Link";
import ShedAvatar from "../../view/atoms/ShedAvatar";
import FuelsView from "../../view/molecules/FuelsView";
import LabelledBox from "../../view/molecules/LabelledBox";

const DEFAULT_CIRLE_RADIUS = 15;
const STYLE_CIRCLE = {
  stroke: true,
  fillOpacity: 0.4,
  zIndex: 2000,
};

function getFillColor(extendedShed, fuelTypeList) {
  const hasRecentUpdate = ExtendedShed.getHasRecentUpdate(extendedShed);
  const hasRecentDispatch = ExtendedShed.getHasRecentDispatch(
    extendedShed,
    fuelTypeList
  );
  const hasListedStock = ExtendedShed.getHasListedStock(
    extendedShed,
    fuelTypeList
  );

  if (hasRecentUpdate || hasRecentDispatch) {
    if (hasRecentDispatch) {
      return "green";
    }
    if (hasListedStock) {
      return "orange";
    }
  }
  return "red";
}

function getStrokeOpacity(extendedShed) {
  const deltaTimeSinceLastUpdate =
    ExtendedShed.getDeltaTimeSinceLastUpdate(extendedShed);

  for (let [delta, color] of [
    [SECONDS_IN.HOUR, 1],
    [SECONDS_IN.HOUR * 3, 0.75],
    [SECONDS_IN.HOUR * 6, 0.5],
    [SECONDS_IN.HOUR * 12, 0.25],
  ]) {
    if (deltaTimeSinceLastUpdate < delta) {
      return color;
    }
  }
  return 0;
}

export default function ShedView({ extendedShed, fuelTypeList }) {
  const fillColor = getFillColor(extendedShed, fuelTypeList);
  const strokeOpacity = getStrokeOpacity(extendedShed);

  const displayAddress = ExtendedShed.getDisplayAddress(extendedShed);
  const gmapsURL = ExtendedShed.getURLGmaps(extendedShed);

  return (
    <CircleMarker
      center={extendedShed["lat_lng"]}
      radius={DEFAULT_CIRLE_RADIUS}
      pathOptions={{
        ...STYLE_CIRCLE,
        ...{ fillColor, color: "black", opacity: strokeOpacity },
      }}
    >
      <Popup closeButton={false}>
        <Box sx={{ maxHeight: "50vh", overflow: "scroll", width: 240 }}>
          <AlignCenter>
            <ShedAvatar extendedShed={extendedShed} />
            <Typography variant="subtitle2">
              {extendedShed["shed_name"]}
            </Typography>
          </AlignCenter>
          <Link href={gmapsURL}>
            <Typography variant="caption">{displayAddress}</Typography>
          </Link>
          <FuelsView extendedShed={extendedShed} />
          <LabelledBox label="Last Updated by Shed">
            <HumanTime ut={extendedShed["time_last_updated_by_shed_ut"]} />
          </LabelledBox>
        </Box>
      </Popup>
    </CircleMarker>
  );
}
