import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import FilterDetails from "../../view/atoms/FilterDetails";
import FilterMenu from "./FilterMenu.js";
import HelpMenu from "./HelpMenu.js";

export default function CustomAppBar({
  onSelectFuelTypeList,
  selectedFuelTypeList,
}) {
  return (
    <Box>
      <AppBar position="static" style={{ background: "white" }}>
        <Toolbar>
          <HelpMenu />
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
