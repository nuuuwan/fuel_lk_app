import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import Fuel, { FUEL_TYPE_GROUP_IDX } from "../../nonview/core/Fuel";

import FilterDetails from "../../view/atoms/FilterDetails";
import {t} from "../../nonview/base/I18N"

export default function FilterFuelTypeMenu({
  onSelectFuelTypeList,
  selectedFuelTypeList,
}) {
  const selectedLFuelTypeGroupLabel =
    Fuel.getFuelTypeGroupLabel(selectedFuelTypeList);
  const isAll = selectedLFuelTypeGroupLabel === "All Fuels";

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
        <FilterDetails selectedFuelTypeList={selectedFuelTypeList} />
        <Tooltip title="Filter by Fuel Type">
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
        {Object.entries(FUEL_TYPE_GROUP_IDX).map(function (
          [label, fuelTypeList],
          i
        ) {
          const key = "filter-menu-item-" + i;
          const onClickInner = function () {
            onClose();
            onSelectFuelTypeList(fuelTypeList);
          };
          const isSelected = selectedLFuelTypeGroupLabel === label;
          const color = isSelected ? theme.palette.secondary.main : "neutral";
          return (
            <MenuItem key={key} onClick={onClickInner}>
              <ListItemText sx={{ color }}>{t(label)}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
