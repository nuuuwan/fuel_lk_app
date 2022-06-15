import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import FuelQuantity from "../../view/atoms/FuelQuantity";
import HumanTime from "../../view/atoms/HumanTime";
import Place from "../../view/atoms/Place";
import LabelledBox from "../../view/molecules/LabelledBox";

export default function FuelView({
  label,
  availlability,
  capacity,
  recentDispatch,
  color,
}) {
  if (!availlability) {
    return null;
  }

  return (
    <Paper sx={{ m: 1, p: 1 }}>
      <Typography variant="subtitle1">{label}</Typography>
      <LabelledBox label="Opening Stock">
        <FuelQuantity quantity={capacity} />
      </LabelledBox>

      {recentDispatch ? (
        <LabelledBox label="Recent Dispatch">
          <FuelQuantity quantity={recentDispatch["amount"]} />
          <Place name={recentDispatch["plant_name"]} />
          <HumanTime ut={recentDispatch["time_eta_ut"]} />
        </LabelledBox>
      ) : null}
    </Paper>
  );
}

// import FuelTypeView from "../../view/atoms/FuelTypeView";
