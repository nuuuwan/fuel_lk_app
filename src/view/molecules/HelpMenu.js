import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpIcon from "@mui/icons-material/Help";
import RefreshIcon from "@mui/icons-material/Refresh";
import LanguageIcon from '@mui/icons-material/Language';
import TwitterIcon from "@mui/icons-material/Twitter";

const MENU_ITEM_LIST = [
  {
    name: "Help (Twitter Thread)",
    url: "https://twitter.com/nuuuwan/status/1537072079786369025",
    Icon: TwitterIcon,
  },
  {
    name: "fuel.gov.lk",
    url: "https://fuel.gov.lk/",
    Icon: LanguageIcon,
  },
  {
    name: "Code - React App",
    url: "http://github.com/nuuuwan/fuel_lk_app",
    Icon: GitHubIcon,
  },
  {
    name: "Code - Data",
    url: "https://github.com/nuuuwan/fuel_lk/tree/data",
    Icon: GitHubIcon,
  },
];

export default function HelpMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onClick = function (e) {
    setAnchorEl(e.currentTarget);
  };

  const onClose = function () {
    setAnchorEl(null);
  };

  const onClickRefresh = function () {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <IconButton onClick={onClick}>
        <HelpIcon />
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
        <MenuItem onClick={onClickRefresh}>
          <ListItemIcon>
            <RefreshIcon />
          </ListItemIcon>
          <ListItemText>Refresh App</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
