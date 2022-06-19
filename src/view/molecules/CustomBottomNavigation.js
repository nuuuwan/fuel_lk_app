import React from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ForumIcon from "@mui/icons-material/Forum";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

import { t } from "../../nonview/base/I18N";
import URLContext from "../../nonview/base/URLContext";

const STYLE = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
};

export default function CustomBottomNavigation({
  onClickNearby,
  onClickZoomOut,
  onOpenDrawerFeed,
}) {
  const onClickCopy = function () {
    navigator.clipboard.writeText(URLContext.getURL());
  };

  return (
    <Paper sx={STYLE}>
      <BottomNavigation showLabels>
        <Tooltip title={t("Copy App Link")}>
          <BottomNavigationAction
            icon={<ContentCopyIcon />}
            onClick={onClickCopy}
          />
        </Tooltip>
        <Tooltip title={t("Community Feed")}>
          <BottomNavigationAction
            icon={<ForumIcon />}
            onClick={onOpenDrawerFeed}
          />
        </Tooltip>
        <Tooltip title={t("Zoom Out")}>
          <BottomNavigationAction
            icon={<ZoomOutMapIcon />}
            onClick={onClickZoomOut}
          />
        </Tooltip>
        <Tooltip title={t("Nearby")}>
          <BottomNavigationAction
            icon={<MyLocationIcon />}
            onClick={onClickNearby}
          />
        </Tooltip>
      </BottomNavigation>
    </Paper>
  );
}
