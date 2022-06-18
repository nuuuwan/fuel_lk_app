import React from "react";

import { useTheme } from "@mui/material/styles";

import { LANG_IDX } from "../../nonview/base/I18N";

import FilterMenuGeneric from "../../view/molecules/FilterMenuGeneric";

export default function FilterMenuLang({ onSelectLang, selectedLang }) {
  const theme = useTheme();

  return (
    <FilterMenuGeneric
      onSelect={onSelectLang}
      selectedOptionID={selectedLang}
      defaultOptionID={""}
      optionIdx={LANG_IDX}
      Icon={null}
      colorSelected={theme.palette.primary.main}
      skipLabelTranslate={true}
    />
  );
}
