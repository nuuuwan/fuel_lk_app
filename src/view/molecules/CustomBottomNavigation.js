import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function CustomBottomNavigation({ onClickRefresh }) {
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
      </BottomNavigation>
    </Paper>
  );
}
