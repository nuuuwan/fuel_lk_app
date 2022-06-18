import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { t } from "../../nonview/base/I18N";
import {
  FUEL_GROUP_IDX,
  ALL_FUEL_GROUP_ID,
} from "../../nonview/core/FuelGroup";

import FilterDetails from "../../view/atoms/FilterDetails";

export default function FilterFuelTypeMenu({
  onSelectFuelGroupID,
  selectedFuelGroupID,
}) {
  const isAll = selectedFuelGroupID === ALL_FUEL_GROUP_ID;

  const theme = useTheme();
  const iconColor = isAll ? "lightgray" : theme.palette.secondary.main;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onClick = function (e) {
    setAnchorEl(e.currentTarget);
  };

  const onClose = function () {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton size="large" onClick={onClick} sx={{ p: 1 }}>
        <FilterDetails selectedFuelGroupID={selectedFuelGroupID} />
        <Tooltip title={t("Filter by Fuel Type")}>
          <FilterAltIcon sx={{ color: iconColor }} />
        </Tooltip>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Object.entries(FUEL_GROUP_IDX).map(function (
          [fuelGroupID, fuelGroup],
          i
        ) {
          const key = "filter-menu-item-" + i;
          const onClickInner = function () {
            onClose();
            onSelectFuelGroupID(fuelGroupID);
          };
          const isSelected = selectedFuelGroupID === fuelGroupID;
          const color = isSelected ? theme.palette.secondary.main : "neutral";
          return (
            <MenuItem key={key} onClick={onClickInner}>
              <ListItemText sx={{ color }}>{t(fuelGroup.label)}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
