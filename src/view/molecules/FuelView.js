import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import FuelQuantity from "../../view/atoms/FuelQuantity";
import HumanTime from "../../view/atoms/HumanTime";
import Place from "../../view/atoms/Place";
import LabelledBox from "../../view/molecules/LabelledBox";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AlignCenter from "../../view/atoms/AlignCenter";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";

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
    <Paper sx={{ m: 1, p: 1, width: "80%" }}>
      <AlignCenter>
        <LocalGasStationIcon sx={{ color }} />
        <Typography variant="subtitle1">{label}</Typography>
      </AlignCenter>
      {capacity ? (
        <LabelledBox
          label={
            <AlignCenter>
              Opening Stock
              <OilBarrelIcon
                sx={{ paddingLeft: 0.5, fontSize: "small", color: "orange" }}
              />
            </AlignCenter>
          }
        >
          <FuelQuantity quantity={capacity} color="orange" />
        </LabelledBox>
      ) : null}

      {recentDispatch ? (
        <LabelledBox
          label={
            <AlignCenter>
              Recent Dispatch
              <LocalShippingIcon
                sx={{ paddingLeft: 0.5, fontSize: "small", color: "green" }}
              />
            </AlignCenter>
          }
        >
          <FuelQuantity quantity={recentDispatch["amount"]} color="green" />
          <Place name={recentDispatch["plant_name"]} />
          <HumanTime ut={recentDispatch["time_eta_ut"]} />
        </LabelledBox>
      ) : null}
    </Paper>
  );
}

// import FuelTypeView from "../../view/atoms/FuelTypeView";
