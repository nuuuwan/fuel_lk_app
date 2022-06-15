import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const STYLE = {
  position: "fixed",
  top: "12%",
  left: "2%",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  zIndex: 1000,
};

export default function LoadingView({ nShedsTotal, nShedsLoaded }) {
  if (nShedsTotal > 0 && nShedsTotal === nShedsLoaded) {
    return null;
  }

  let label;
  if (nShedsLoaded) {
    label = `Loaded ${nShedsLoaded} of ${nShedsTotal} sheds... `;
  } else {
    label = `Loading... `;
  }

  return (
    <Box sx={STYLE}>
      <Typography sx={{ fontSize: "small" }}>{label}</Typography>
    </Box>
  );
}
