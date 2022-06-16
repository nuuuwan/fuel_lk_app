import Typography from "@mui/material/Typography";

import Fuel from "../../nonview/core/Fuel";

const STYLE_TEXT = {
  borderRadius: 6,
  padding: 0.5,
  color: "orange",
};

export default function FilterDetails({ selectedFuelTypeList }) {
  const label = Fuel.getFuelTypeGroupLabel(selectedFuelTypeList);
  if (label === "All Fuels") {
    return null;
  }
  return (
    <Typography variant="caption" sx={STYLE_TEXT}>
      {label}
    </Typography>
  );
}
