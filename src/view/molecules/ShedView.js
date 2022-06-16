import { CircleMarker, Popup } from "react-leaflet";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ExtendedShed from "../../nonview/core/ExtendedShed";

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

export default function ShedView({ extendedShed }) {
  const hasRecentDispatch = ExtendedShed.getHasRecentDispatch(extendedShed);
  const hasListedStock = ExtendedShed.getHasListedStock(extendedShed);

  let fillColor = "red";
  if (hasRecentDispatch) {
    fillColor = "green";
  } else if (hasListedStock) {
    fillColor = "orange";
  }

  const color = extendedShed["shed_type"] === 1 ? "black" : "gray";

  return (
    <CircleMarker
      center={extendedShed["lat_lng"]}
      radius={DEFAULT_CIRLE_RADIUS}
      pathOptions={{ ...STYLE_CIRCLE, ...{ fillColor, color } }}
    >
      <Popup closeButton={false}>
        <Box sx={{ maxHeight: "50vh", overflow: "scroll", width: 240 }}>
          <AlignCenter>
            <ShedAvatar extendedShed={extendedShed} />
            <Typography variant="subtitle2">
              {extendedShed["shed_name"]}
            </Typography>
          </AlignCenter>
          <Typography variant="caption">{extendedShed["address"]}</Typography>
          <FuelsView extendedShed={extendedShed} />
          <LabelledBox label="Last Updated by Shed">
            <HumanTime ut={extendedShed["time_last_updated_by_shed_ut"]} />
          </LabelledBox>
        </Box>
      </Popup>
    </CircleMarker>
  );
}
