import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import LogoAvatar from "../../view/atoms/LogoAvatar";
import FilterFuelTypeMenu from "./FilterFuelTypeMenu.js";
import FilterTimeUpdatedMenu from "./FilterTimeUpdatedMenu.js";
import HelpMenu from "./HelpMenu.js";

export default function CustomAppBar({
  onSelectFuelTypeList,
  selectedFuelTypeList,
  onSelectMaxDisplayRecencyHours,
  selectedMaxDisplayRecencyHours,
}) {
  return (
    <Box>
      <AppBar position="static" style={{ background: "white" }}>
        <Toolbar>
          <LogoAvatar />
          <Typography variant="subtitle1" sx={{ color: "black" }}>
            Fuel in SL
          </Typography>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {" "}
          </Typography>
          <FilterFuelTypeMenu
            onSelectFuelTypeList={onSelectFuelTypeList}
            selectedFuelTypeList={selectedFuelTypeList}
          />
          <FilterTimeUpdatedMenu
            onSelectMaxDisplayRecencyHours={onSelectMaxDisplayRecencyHours}
            selectedMaxDisplayRecencyHours={selectedMaxDisplayRecencyHours}
          />
          <HelpMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
