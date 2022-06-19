import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";

import AlignCenter from "../../view/atoms/AlignCenter";
import Link from "../../view/atoms/Link";
import ShedAvatar from "../../view/atoms/ShedAvatar";

export default function ShedBlurb({ extendedShed }) {
  return (
    <Box>
      <Link href={extendedShed.gmapsURL}>
        <Typography variant="subtitle1">{t(extendedShed.city)}</Typography>
      </Link>
      <AlignCenter>
        <ShedAvatar extendedShed={extendedShed} />
        <Typography variant="subtitle2">{t(extendedShed.shedName)}</Typography>
      </AlignCenter>
      <Link href={extendedShed.gmapsURL}>
        <Typography variant="caption">
          {t(extendedShed.gmapsAddress)}
        </Typography>
      </Link>
    </Box>
  );
}

// import ShedBlurb from "../../view/atoms/ShedBlurb";
