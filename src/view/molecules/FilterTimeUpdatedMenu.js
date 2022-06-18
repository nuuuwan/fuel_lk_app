import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { t } from "../../nonview/base/I18N";

const TIME_UPDATED_IDX = {
  1: "Last 1 Hour",
  3: "Last 3 Hours",
  6: "Last 6 Hours",
  12: "Last 12 Hours",
  24: "Last 24 Hours",
};

export default function FilterTimeUpdateMenu({
  onSelectMaxDisplayRecencyHours,
  selectedMaxDisplayRecencyHours,
}) {
  const theme = useTheme();

  let selectedLabel = TIME_UPDATED_IDX[selectedMaxDisplayRecencyHours];

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
          {t(selectedLabel)}
        </Typography>
        <Tooltip title={t("Filter by Time Updated")}>
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
        {Object.entries(TIME_UPDATED_IDX).map(function (
          [maxDisplayRecencyHours, label],
          i
        ) {
          const key = "filter-menu-item-" + i;
          const onClickInner = function () {
            onClose();
            onSelectMaxDisplayRecencyHours(maxDisplayRecencyHours);
          };
          const isSelected =
            selectedMaxDisplayRecencyHours === maxDisplayRecencyHours;
          const color = isSelected ? theme.palette.success.main : "neutral";
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
