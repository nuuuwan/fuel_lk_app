import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { t } from "../../nonview/base/I18N";

import Link from "../../view/atoms/Link";

export default function TempSourceIsDown() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 10,
        right: 10,
        bottom: 70,
      }}
    >
      <Alert severity="error">
        <Link href="https://fuel.gov.lk/">{"https://fuel.gov.lk/ "}</Link>
        {t(
          "has been temporary shut down. Since this App sources data from fuel.gov.lk, dynamic data will be out of date. Sorry"
        )}
        {" ☹️."}
      </Alert>
    </Box>
  );
}
