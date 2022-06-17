import Typography from "@mui/material/Typography";

import { t } from "../../nonview/base/I18N";
import { POLL_OPTION_IDX } from "../../nonview/core/PollWaitingTime";

import AlignCenter from "../../view/atoms/AlignCenter";

export default function PollOptionView({ pollOptionID }) {
  const pollOption = POLL_OPTION_IDX[pollOptionID];
  if (!pollOption) {
    return null;
  }
  const Icon = pollOption.Icon;
  return (
    <AlignCenter>
      <Icon sx={{ color: pollOption.color }} />
      <Typography variant="caption" sx={{ color: pollOption.color }}>
        {t(pollOption.label)}
      </Typography>
    </AlignCenter>
  );
}
