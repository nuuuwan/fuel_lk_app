import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import { t } from "../../nonview/base/I18N";

import AlignCenter from "../../view/atoms/AlignCenter";
import HumanTime from "../../view/atoms/HumanTime";
import Link from "../../view/atoms/Link";
import ShedAvatar from "../../view/atoms/ShedAvatar";
import FuelsView from "../../view/molecules/FuelsView";
import LabelledBox from "../../view/molecules/LabelledBox";

const STYLE = { m: 1, p: 1, width: 250 };

export default function ShedDrawer({ extendedShed, onCloseDrawer }) {
  if (!extendedShed) {
    return null;
  }

  return (
    <Drawer anchor={"right"} open={true} onClose={onCloseDrawer}>
      <Box sx={STYLE}>
        <AlignCenter>
          <ShedAvatar extendedShed={extendedShed} />
          <Typography variant="subtitle2">
            {t(extendedShed.shedName)}
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onCloseDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
        </AlignCenter>
        <Link href={extendedShed.gmapsURL}>
          <Typography variant="caption">
            {t(extendedShed.gmapsAddress)}
          </Typography>
        </Link>
        <FuelsView extendedShed={extendedShed} />
        <LabelledBox label={t("When was the data updated?")}>
          <HumanTime ut={extendedShed.timeLastUpdatedByShedUT} />
        </LabelledBox>
      </Box>
    </Drawer>
  );
}
