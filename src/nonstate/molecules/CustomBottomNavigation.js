import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import UndoIcon from "@mui/icons-material/Undo";

export default function CustomBottomNavigation({ onClickBack }) {
  const navigationItems = [
    {
      name: "Back",
      details: "Go back to previous page",
      Icon: UndoIcon,
      onClick: onClickBack,
    },
  ];

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        {navigationItems.map(function (item, i) {
          const key = "data-" + i;
          const Icon = item.Icon;
          const onClick = item.onClick;
          return (
            <Tooltip
              key={key}
              title={
                <Typography variant="subtitle1">{item.details}</Typography>
              }
            >
              <BottomNavigationAction
                label={item.name}
                icon={<Icon />}
                onClick={onClick}
              />
            </Tooltip>
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}
