import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const STYLE = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
};

export default function CustomBottomNavigation({
  onClickNearby,
  onClickZoomOut,
}) {
  return (
    <Paper sx={STYLE}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          icon={<ZoomOutMapIcon />}
          onClick={onClickZoomOut}
        />
        <BottomNavigationAction
          icon={<MyLocationIcon />}
          onClick={onClickNearby}
        />
      </BottomNavigation>
    </Paper>
  );
}
