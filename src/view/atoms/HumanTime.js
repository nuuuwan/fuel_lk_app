import Typography from "@mui/material/Typography";

import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";

export default function HumanTime({ ut }) {
  const timeStr = TimeX.formatTime(ut);
  const humanStr = TimeX.getHumanTime(ut);
  let label = humanStr;
  if (ut > SECONDS_IN.DAY) {
    label += " (" + timeStr + ")";
  }

  return (
    <Typography variant="subtitle2" sx={{ color: "gray" }}>
      {label}
    </Typography>
  );
}
