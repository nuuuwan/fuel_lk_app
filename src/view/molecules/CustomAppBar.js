import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import LogoAvatar from "../../view/atoms/LogoAvatar";
import FilterFuelTypeMenu from "./FilterFuelTypeMenu.js";
import HelpMenu from "./HelpMenu.js";

export default function CustomAppBar({
  onSelectFuelTypeList,
  selectedFuelTypeList,
}) {
  return (
    <Box>
      <AppBar position="static" style={{ background: "white" }}>
        <Toolbar>
          <LogoAvatar />
          <Typography variant="subtitle1" sx={{ color: "black" }}>
            Fuel in Sri Lanka
          </Typography>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {" "}
          </Typography>
          <FilterFuelTypeMenu
            onSelectFuelTypeList={onSelectFuelTypeList}
            selectedFuelTypeList={selectedFuelTypeList}
          />
          <HelpMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
