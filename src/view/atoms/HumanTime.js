import Typography from "@mui/material/Typography";

import TimeX from "../../nonview/base/TimeX";

export default function HumanTime({ ut }) {
  const timeStr = TimeX.formatTime(ut);
  const humanStr = TimeX.getHumanTime(ut);
  return (
    <Typography variant="subtitle2" sx={{ color: "gray", fontSize: "67%" }}>
      {humanStr} ({timeStr} )
    </Typography>
  );
}
