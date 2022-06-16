import React from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import FilterDetails from "../../view/atoms/FilterDetails";

import SettingsMenu from "./SettingsMenu.js";
import FilterMenu from "./FilterMenu.js";

export default function CustomAppBar({
  onSelectFuelTypeList,
  selectedFuelTypeList,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <SettingsMenu />
          <FilterMenu
            onSelectFuelTypeList={onSelectFuelTypeList}
            selectedFuelTypeList={selectedFuelTypeList}
          />
          <FilterDetails selectedFuelTypeList={selectedFuelTypeList} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
