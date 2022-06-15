import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

export default function FuelView({ label, availlability, capacity, color }) {
  if (!availlability) {
    return null;
  }
  return (
    <ListItem sx={{ p: 0, m: 0, maxHeight: "8vh" }}>
      <ListItemAvatar>
        <Avatar sx={{ color, backgroundColor: "#f8f8f8" }}>
          <LocalGasStationIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography sx={{ fontSize: "small" }}>{label}</Typography>}
        sx={{ color }}
      />
    </ListItem>
  );
}

// import FuelTypeView from "../../view/atoms/FuelTypeView";
