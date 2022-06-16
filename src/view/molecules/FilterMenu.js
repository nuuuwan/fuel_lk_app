import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import Fuel, { FUEL_TYPE_GROUP_IDX } from "../../nonview/core/Fuel";

import FilterDetails from "../../view/atoms/FilterDetails";

export default function FilterMenu({
  onSelectFuelTypeList,
  selectedFuelTypeList,
}) {
  const selectedLFuelTypeGroupLabel =
    Fuel.getFuelTypeGroupLabel(selectedFuelTypeList);
  const isAll = selectedLFuelTypeGroupLabel === "All Fuels";
  const iconColor = isAll ? "gray" : "orange";

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
      <IconButton size="large" onClick={onClick}>
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
          const color = isSelected ? "black" : "gray";
          return (
            <MenuItem key={key} onClick={onClickInner}>
              <ListItemText sx={{ color }}>{label}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
