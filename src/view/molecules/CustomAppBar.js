import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";

import LogoAvatar from "../../view/atoms/LogoAvatar";
import FilterMenuFuelGroup from "./FilterMenuFuelGroup.js";
import FilterMenuLang from "../../view/molecules/FilterMenuLang";
import FilterMenuTimeUpdated from "./FilterMenuTimeUpdated.js";
import HelpMenu from "./HelpMenu.js";

export default function CustomAppBar({
  onSelectFuelGroupID,
  selectedFuelGroupID,
  onSelectMaxDisplayRecencyHours,
  selectedMaxDisplayRecencyHours,
  onSelectLang,
  selectedLang,
}) {
  return (
    <Box>
      <AppBar position="static" style={{ background: "white" }}>
        <Toolbar>
          <LogoAvatar />
          <Typography variant="subtitle1" sx={{ color: "black" }}>
            {t("Fuel")}
          </Typography>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {" "}
          </Typography>
          <FilterMenuFuelGroup
            onSelectFuelGroupID={onSelectFuelGroupID}
            selectedFuelGroupID={selectedFuelGroupID}
          />
          <FilterMenuTimeUpdated
            onSelectMaxDisplayRecencyHours={onSelectMaxDisplayRecencyHours}
            selectedMaxDisplayRecencyHours={selectedMaxDisplayRecencyHours}
          />
          <FilterMenuLang
            onSelectLang={onSelectLang}
            selectedLang={selectedLang}
          />
          <HelpMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
