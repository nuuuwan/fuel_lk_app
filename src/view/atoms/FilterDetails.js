import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";
import Fuel from "../../nonview/core/Fuel";

const STYLE_TEXT = {
  color: "orange",
  padding: 0.25,
};

export default function FilterDetails({ selectedFuelTypeList }) {
  const label = Fuel.getFuelTypeGroupLabel(selectedFuelTypeList);
  if (label === "All Fuels") {
    return null;
  }
  return (
    <Typography variant="caption" sx={STYLE_TEXT}>
      {t(label)}
    </Typography>
  );
}
