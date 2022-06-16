import Typography from "@mui/material/Typography";
import Fuel from "../../nonview/core/Fuel";

const STYLE_TEXT = {
  background: "rgba(255, 255, 255, 0.8)",
  borderRadius: 6,
  padding: 0.5,
};

export default function FilterDetails({ selectedFuelTypeList }) {
  const label = Fuel.getFuelTypeGroupLabel(selectedFuelTypeList);
  return (
    <Typography variant="caption" sx={STYLE_TEXT}>
      {label}
    </Typography>
  );
}
