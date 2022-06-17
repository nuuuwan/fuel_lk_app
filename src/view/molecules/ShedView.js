import { CircleMarker, Popup } from "react-leaflet";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import StringX from "../../nonview/base/StringX";
import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
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
  zIndex: 2000,
};

const FILL_OPACITY_HIDE = 0.7;
const FILL_OPACITY_SHOW = 0.7;

function getFillColorAndOpacity(
  extendedShed,
  fuelTypeList,
  maxDisplayRecencyHours,
  theme
) {
  const lastUpdateTime = ExtendedShed.getLastUpdateTime(
    extendedShed,
    fuelTypeList
  );
  const lastDispatchTime = ExtendedShed.getLastDispatchTime(
    extendedShed,
    fuelTypeList
  );
  const hasListedStock = ExtendedShed.getHasListedStock(
    extendedShed,
    fuelTypeList
  );

  const currentTime = TimeX.getUnixTime();
  const maxDisplayRecencySeconds = maxDisplayRecencyHours * SECONDS_IN.HOUR;

  const timeSinceLastUpdate = currentTime - lastUpdateTime;
  const timeSinceLastDispatch = currentTime - lastDispatchTime;

  if (!timeSinceLastUpdate || timeSinceLastUpdate > maxDisplayRecencySeconds) {
    return ["gray", FILL_OPACITY_HIDE];
  }

  if (timeSinceLastDispatch < maxDisplayRecencySeconds) {
    return [theme.palette.success.main, FILL_OPACITY_SHOW];
  }

  if (hasListedStock) {
    return [theme.palette.secondary.main, FILL_OPACITY_SHOW];
  }

  return [theme.palette.primary.main, FILL_OPACITY_SHOW];
}

function getStrokeOpacity(extendedShed, fuelTypeList) {
  const lastUpdateTime = ExtendedShed.getLastUpdateTime(
    extendedShed,
    fuelTypeList
  );
  const timeSinceLastUpdate = TimeX.getUnixTime() - lastUpdateTime;

  for (let [delta, opacity] of [
    [SECONDS_IN.HOUR, 1],
    [SECONDS_IN.HOUR * 3, 0.75],
  ]) {
    if (timeSinceLastUpdate < delta) {
      return opacity;
    }
  }
  return 0.1;
}

export default function ShedView({
  extendedShed,
  fuelTypeList,
  maxDisplayRecencyHours,
}) {
  const theme = useTheme();

  const [fillColor, fillOpacity] = getFillColorAndOpacity(
    extendedShed,
    fuelTypeList,
    maxDisplayRecencyHours,
    theme
  );
  const opacity = getStrokeOpacity(extendedShed, fuelTypeList);

  const displayAddress = ExtendedShed.getDisplayAddress(extendedShed);
  const gmapsURL = ExtendedShed.getURLGmaps(extendedShed);

  return (
    <CircleMarker
      center={extendedShed["lat_lng"]}
      radius={DEFAULT_CIRLE_RADIUS}
      pathOptions={{
        ...STYLE_CIRCLE,
        ...{ fillColor, fillOpacity, color: "black", opacity },
      }}
    >
      <Popup closeButton={false}>
        <Box sx={{ maxHeight: "50vh", overflow: "scroll", width: 240 }}>
          <AlignCenter>
            <ShedAvatar extendedShed={extendedShed} />
            <Typography variant="subtitle2">
              {StringX.toTitleCase(extendedShed["shed_name"])}
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
