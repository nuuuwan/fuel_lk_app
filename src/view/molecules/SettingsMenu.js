import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import SourceIcon from "@mui/icons-material/Source";

const MENU_ITEM_LIST = [
  {
    name: "Help",
    url: "https://twitter.com/nuuuwan/status/1537072079786369025",
    Icon: HelpIcon,
  },
  {
    name: "Data Source",
    url: "https://fuel.gov.lk/",
    Icon: SourceIcon,
  },
  {
    name: "Code",
    url: "http://github.com/nuuuwan/fuel_lk_app",
    Icon: GitHubIcon,
  },
];

export default function SettingsMenu() {
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
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={onClick}
      >
        <SettingsIcon />
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
        {MENU_ITEM_LIST.map(function (menuItem, i) {
          const key = "app-bar-menu-item-" + i;
          const Icon = menuItem.Icon;
          const onClick = function (e) {
            window.open(menuItem.url, "_blank");
            onClose();
          };

          return (
            <MenuItem key={key} onClick={onClick}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText>{menuItem.name}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
