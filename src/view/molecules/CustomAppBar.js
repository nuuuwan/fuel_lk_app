import React from "react";

import Typography from '@mui/material/Typography';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

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
          <Typography variant="body1" sx={{flexGrow: 1}}>
            {" "}
          </Typography>
          <Typography variant="body1" sx={{color: "black"}}>
            #FuelLKApp
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
