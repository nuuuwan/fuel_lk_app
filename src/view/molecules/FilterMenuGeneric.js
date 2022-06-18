import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";

export default function FilterMenuGeneric({
  onSelect,
  selectedOptionID,
  defaultOptionID,
  optionIdx,
  Icon,
  colorSelected,
  skipLabelTranslate,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const selectionOption = optionIdx[selectedOptionID];
  const isSelectedDefault = selectedOptionID === defaultOptionID;
  const colorIcon = isSelectedDefault ? "neutral" : colorSelected;

  const onClick = function (e) {
    setAnchorEl(e.currentTarget);
  };

  const onClose = function () {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton size="large" onClick={onClick} sx={{ p: 1 }}>
        <Typography variant="caption" sx={{ padding: 0.25, color: colorIcon }}>
          {t(selectionOption.label, skipLabelTranslate)}
        </Typography>
        {Icon ? <Icon sx={{ color: colorIcon }} /> : null}
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
        {Object.entries(optionIdx).map(function ([optionID, option], iOption) {
          const key = "option-" + iOption;
          const onClickInner = function () {
            onClose();
            onSelect(optionID);
          };
          const isSelected = selectedOptionID === optionID;
          const color = isSelected ? colorSelected : "neutral";
          const displayLabel = t(option.label, skipLabelTranslate);
          return (
            <MenuItem key={key} onClick={onClickInner}>
              <ListItemText sx={{ color }}>{displayLabel}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
