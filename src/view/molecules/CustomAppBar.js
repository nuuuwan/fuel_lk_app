import React from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import CustomAppBarMenu from "./CustomAppBarMenu.js";

const STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 50,
  zIndex: 1000,
};

export default function CustomAppBar() {
  return (
    <Box sx={STYLE}>
      <Toolbar variant="dense">
        <CustomAppBarMenu />
      </Toolbar>
    </Box>
  );
}
