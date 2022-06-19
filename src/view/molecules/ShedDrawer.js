import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { t } from "../../nonview/base/I18N";

import AlignCenter from "../../view/atoms/AlignCenter";
import HumanTime from "../../view/atoms/HumanTime";
import FuelsView from "../../view/molecules/FuelsView";
import LabelledBox from "../../view/molecules/LabelledBox";
import ShedBlurb from "../../view/molecules/ShedBlurb";

const STYLE = { m: 1, p: 1, width: 250 };

export default function ShedDrawer({ extendedShed, onCloseDrawer }) {
  if (!extendedShed) {
    return null;
  }

  return (
    <Drawer anchor={"right"} open={true} onClose={onCloseDrawer}>
      <Box sx={STYLE}>
        <AlignCenter>
          <ShedBlurb extendedShed={extendedShed} />
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onCloseDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
        </AlignCenter>
        <FuelsView extendedShed={extendedShed} />
        <LabelledBox label={t("When was the data updated?")}>
          <HumanTime ut={extendedShed.timeLastUpdatedByShedUT} />
        </LabelledBox>
      </Box>
    </Drawer>
  );
}
