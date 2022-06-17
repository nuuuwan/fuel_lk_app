import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";

import AlignCenter from "../../view/atoms/AlignCenter";
import FuelQuantity from "../../view/atoms/FuelQuantity";
import HumanTime from "../../view/atoms/HumanTime";
import Place from "../../view/atoms/Place";
import LabelledBox from "../../view/molecules/LabelledBox";
import CommunityView from "../../view/organisms/CommunityView";

export default function FuelView({
  label,
  isAvailable,
  capacity,
  recentDispatch,
  color,
}) {
  const theme = useTheme();
  if (!isAvailable && !recentDispatch) {
    return null;
  }

  const showCommunityView = process.env.REACT_APP_SHOW_COMMUNITY_VIEW === "1";

  return (
    <Paper elevation={2} sx={{ m: 1, p: 1, width: "80%" }}>
      <AlignCenter>
        <LocalGasStationIcon sx={{ color }} />
        <Typography variant="subtitle1" sx={{ color }}>
          {label}
        </Typography>
      </AlignCenter>
      {capacity ? (
        <LabelledBox
          label={
            <AlignCenter>
              Opening Stock
              <OilBarrelIcon
                sx={{
                  paddingLeft: 0.5,
                  fontSize: "small",
                  color: theme.palette.secondary.main,
                }}
              />
            </AlignCenter>
          }
        >
          <FuelQuantity
            quantity={capacity}
            color={theme.palette.secondary.main}
          />
        </LabelledBox>
      ) : null}

      {recentDispatch ? (
        <LabelledBox
          label={
            <AlignCenter>
              Recent Dispatch
              <LocalShippingIcon
                sx={{
                  paddingLeft: 0.5,
                  fontSize: "small",
                  color: theme.palette.success.main,
                }}
              />
            </AlignCenter>
          }
        >
          <FuelQuantity
            quantity={recentDispatch["amount"]}
            color={theme.palette.success.main}
          />
          <Place name={recentDispatch["plant_name"]} />
          <HumanTime ut={recentDispatch["time_eta_ut"]} />
        </LabelledBox>
      ) : null}
      {showCommunityView ? <CommunityView /> : null}
    </Paper>
  );
}
