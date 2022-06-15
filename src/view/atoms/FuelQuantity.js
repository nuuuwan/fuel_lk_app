import Typography from "@mui/material/Typography";

export default function FuelQuantity({ quantity, color }) {
  let label = "unknown";

  let colorFinal = "gray";
  if (quantity) {
    label = quantity.toLocaleString() + "ℓ";
    colorFinal = color;
  }
  return (
    <Typography variant="subtitle2" sx={{ color: colorFinal }}>
      {label}
    </Typography>
  );
}
