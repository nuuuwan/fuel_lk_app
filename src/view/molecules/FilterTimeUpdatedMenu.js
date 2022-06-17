import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TIME_UPDATED_LIST = [
  {
    maxDisplayRecencyHours: 1,
    label: "<1 Hr Ago",
  },
  {
    maxDisplayRecencyHours: 3,
    label: "<3 Hrs Ago",
  },
  {
    maxDisplayRecencyHours: 6,
    label: "<6 Hrs Ago",
  },
  {
    maxDisplayRecencyHours: 12,
    label: "<12 Hrs Ago",
  },
  {
    maxDisplayRecencyHours: 24,
    label: "<24 Hrs Ago",
  },
  {
    maxDisplayRecencyHours: 24 * 7,
    label: "<1 Week Ago",
  },
];

export default function FilterTimeUpdateMenu({
  onSelectMaxDisplayRecencyHours,
  selectedMaxDisplayRecencyHours,
}) {
  const theme = useTheme();

  let selectedLabel;
  for (let item of TIME_UPDATED_LIST) {
    if (item.maxDisplayRecencyHours === selectedMaxDisplayRecencyHours) {
      selectedLabel = item.label;
      break;
    }
  }
  let iconColor = theme.palette.success.main;
  if (selectedMaxDisplayRecencyHours === 24) {
    selectedLabel = "";
    iconColor = "lightgray";
  }

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
        <Typography
          variant="caption"
          sx={{ padding: 0.25, color: theme.palette.success.main }}
        >
          {selectedLabel}
        </Typography>
        <Tooltip title="Filter by Time Updated">
          <AccessTimeIcon sx={{ color: iconColor }} />
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
        {TIME_UPDATED_LIST.map(function (item, i) {
          const key = "filter-menu-item-" + i;
          const onClickInner = function () {
            onClose();
            onSelectMaxDisplayRecencyHours(item.maxDisplayRecencyHours);
          };
          const isSelected =
            selectedMaxDisplayRecencyHours === item.maxDisplayRecencyHours;
          const color = isSelected ? theme.palette.success.main : "neutral";
          return (
            <MenuItem key={key} onClick={onClickInner}>
              <ListItemText sx={{ color }}>{item.label}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
