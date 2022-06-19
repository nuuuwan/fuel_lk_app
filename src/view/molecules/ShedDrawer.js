import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";

import AlignCenter from "../../view/atoms/AlignCenter";
import HumanTime from "../../view/atoms/HumanTime";
import Link from "../../view/atoms/Link";
import ShedAvatar from "../../view/atoms/ShedAvatar";
import FuelsView from "../../view/molecules/FuelsView";
import LabelledBox from "../../view/molecules/LabelledBox";

const STYLE = { minWidth: 300, maxWidth: "90%", m: 1, p: 1 };

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
