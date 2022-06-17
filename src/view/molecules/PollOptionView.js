import Typography from "@mui/material/Typography";
import AlignCenter from "../../view/atoms/AlignCenter";
import { POLL_OPTION_IDX } from "../../nonview/core/PollWaitingTime";

export default function PollOptionView({ pollID }) {
  const pollOption = POLL_OPTION_IDX[pollID];
  if (!pollOption) {
    return null;
  }
  const Icon = pollOption.Icon;
  return (
    <AlignCenter>
      <Icon sx={{ color: pollOption.color }} />
      <Typography variant="caption" sx={{ color: pollOption.color }}>
        {pollOption.label}
      </Typography>
    </AlignCenter>
  );
}
