import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";
import {
  FUEL_GROUP_IDX,
  ALL_FUEL_GROUP_ID,
} from "../../nonview/core/FuelGroup";

const STYLE_TEXT = {
  color: "orange",
  padding: 0.25,
};

export default function FilterDetails({ selectedFuelGroupID }) {
  if (selectedFuelGroupID === ALL_FUEL_GROUP_ID) {
    return null;
  }
  const selectedFuelGroup = FUEL_GROUP_IDX[selectedFuelGroupID];
  return (
    <Typography variant="caption" sx={STYLE_TEXT}>
      {t(selectedFuelGroup.label)}
    </Typography>
  );
}
