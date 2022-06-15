import Typography from "@mui/material/Typography";

export default function FuelQuantity({ quantity }) {
  return (
    <Typography variant="subtitle2">
      {quantity.toLocaleString() + "ℓ"}
    </Typography>
  );
}
