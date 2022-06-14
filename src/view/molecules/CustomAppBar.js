import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import CustomAppBarMenu from "./CustomAppBarMenu.js";

const STYLE = {
  backgroundColor: "lightgray",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 50,
};

export default function CustomAppBar() {
  return (
    <AppBar sx={STYLE}>
      <Toolbar variant="dense">
        <CustomAppBarMenu />
      </Toolbar>
    </AppBar>
  );
}
