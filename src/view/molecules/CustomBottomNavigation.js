import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import RefreshIcon from "@mui/icons-material/Refresh";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

export default function CustomBottomNavigation({
  onClickRefresh,
  onClickNearby,
  onClickZoomOut,
}) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label={"Refresh"}
          icon={<RefreshIcon />}
          onClick={onClickRefresh}
        />
        <BottomNavigationAction
          label={"Zoom Out"}
          icon={<ZoomOutMapIcon />}
          onClick={onClickZoomOut}
        />
        <BottomNavigationAction
          label={"Nearby"}
          icon={<MyLocationIcon />}
          onClick={onClickNearby}
        />
      </BottomNavigation>
    </Paper>
  );
}
