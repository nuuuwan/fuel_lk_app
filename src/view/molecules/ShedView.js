import { CircleMarker, Popup, Marker } from "react-leaflet";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { t } from "../../nonview/base/I18N";
import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";

import AlignCenter from "../../view/atoms/AlignCenter";
import HumanTime from "../../view/atoms/HumanTime";
import Link from "../../view/atoms/Link";
import ShedAvatar from "../../view/atoms/ShedAvatar";
import FuelsView from "../../view/molecules/FuelsView";
import LabelledBox from "../../view/molecules/LabelledBox";
import L from "leaflet";

const DEFAULT_CIRLE_RADIUS = 15;
const STYLE_CIRCLE = {
  stroke: true,
  zIndex: 2000,
};

const FILL_OPACITY_HIDE = 0.7;
const FILL_OPACITY_SHOW = 0.7;

function getFillColorAndOpacity(
  extendedShed,
  fuelGroupID,
  maxDisplayRecencyHours,
  theme
) {
  const timeLastUpdatedUT = extendedShed.getTimeLastUpdatedUT(fuelGroupID);
  const timeLastDispatchUT = extendedShed.getTimeLastDispatchUT(fuelGroupID);
  const hasListedStock = extendedShed.getHasListedStock(fuelGroupID);

  const currentTime = TimeX.getUnixTime();
  const maxDisplayRecencySeconds = maxDisplayRecencyHours * SECONDS_IN.HOUR;

  const timeSinceLastUpdate = currentTime - timeLastUpdatedUT;
  const timeSinceLastDispatch = currentTime - timeLastDispatchUT;

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

function getStrokeOpacity(extendedShed, fuelGroupID) {
  const timeLastUpdatedUT = extendedShed.getTimeLastUpdatedUT(fuelGroupID);
  const timeSinceLastUpdate = TimeX.getUnixTime() - timeLastUpdatedUT;

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
  fuelGroupID,
  maxDisplayRecencyHours,
}) {
  const theme = useTheme();

  const [fillColor, fillOpacity] = getFillColorAndOpacity(
    extendedShed,
    fuelGroupID,
    maxDisplayRecencyHours,
    theme
  );
  const opacity = getStrokeOpacity(extendedShed, fuelGroupID);

  const displayAddress = extendedShed.gmapsAddress;
  const gmapsURL = extendedShed.gmapsURL;

  const faceIcon = new L.Icon({
    iconUrl: process.env.PUBLIC_URL + "/face.png",
    iconSize: [DEFAULT_CIRLE_RADIUS, DEFAULT_CIRLE_RADIUS],
    iconAnchor: [DEFAULT_CIRLE_RADIUS, DEFAULT_CIRLE_RADIUS],
  });

  const communityFeedbackIdx = extendedShed.hasCommunityFeedback;

  const center = extendedShed.latLng;
  return (
    <>
      {communityFeedbackIdx ? (
        <Marker icon={faceIcon} position={center} />
      ) : null}
      <CircleMarker
        center={center}
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
                {t(extendedShed.shedName)}
              </Typography>
            </AlignCenter>
            <Link href={gmapsURL}>
              <Typography variant="caption">{t(displayAddress)}</Typography>
            </Link>
            <FuelsView extendedShed={extendedShed} />
            <LabelledBox label={t("When was the data updated?")}>
              <HumanTime ut={extendedShed.timeLastUpdatedByShedUT} />
            </LabelledBox>
          </Box>
        </Popup>
      </CircleMarker>
    </>
  );
}
