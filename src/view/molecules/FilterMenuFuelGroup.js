import React from "react";

import { useTheme } from "@mui/material/styles";

import FilterMenuGeneric from "../../view/molecules/FilterMenuGeneric";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import {
  FUEL_GROUP_IDX,
  ALL_FUEL_GROUP_ID,
} from "../../nonview/core/FuelGroup";

export default function FilterMenuFuelGroup({
  onSelectFuelGroupID,
  selectedFuelGroupID,
}) {
  const theme = useTheme();

  return (
    <FilterMenuGeneric
      onSelect={onSelectFuelGroupID}
      selectedOptionID={selectedFuelGroupID}
      defaultOptionID={ALL_FUEL_GROUP_ID}
      optionIdx={FUEL_GROUP_IDX}
      Icon={FilterAltIcon}
      colorSelected={theme.palette.secondary.main}
    />
  );
}
