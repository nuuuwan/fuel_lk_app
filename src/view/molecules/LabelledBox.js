import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function LabelledBox({ label, children }) {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ color: "gray", fontSize: "67%" }}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}
