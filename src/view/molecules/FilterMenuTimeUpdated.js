import React from "react";

import { useTheme } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import FilterMenuGeneric from "../../view/molecules/FilterMenuGeneric";

const TIME_UPDATED_OPTION_IDX = {
  1: { label: "Last 1 Hour" },
  3: { label: "Last 3 Hours" },
  6: { label: "Last 6 Hours" },
  12: { label: "Last 12 Hours" },
  24: { label: "Last 24 Hours" },
};

export default function FilterMenuTimeUpdated({
  onSelectMaxDisplayRecencyHours,
  selectedMaxDisplayRecencyHours,
}) {
  const theme = useTheme();

  return (
    <FilterMenuGeneric
      onSelect={onSelectMaxDisplayRecencyHours}
      selectedOptionID={selectedMaxDisplayRecencyHours}
      defaultOptionID={24}
      optionIdx={TIME_UPDATED_OPTION_IDX}
      Icon={AccessTimeIcon}
      colorSelected={theme.palette.success.main}
    />
  );
}
