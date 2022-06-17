import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import AlignCenter from "../../view/atoms/AlignCenter";

export const POLL_OPTION_IDX = {
  lessThan30Mins: {
    Icon: SentimentSatisfiedAltIcon,
    label: "< 30mins",
    color: "green",
  },
  from30MinsTo3Hrs: {
    Icon: SentimentDissatisfiedIcon,
    label: "30mins - 3hrs",
    color: "orange",
  },
  moreThan3Hrs: {
    Icon: SentimentVeryDissatisfiedIcon,
    label: "> 3hrs",
    color: "red",
  },
  noFuel: {
    Icon: CancelIcon,
    label: "No Fuel",
    color: "black",
  },
  notSure: {
    Icon: QuestionMarkIcon,
    label: "Not Sure/Don't Know",
    color: "gray",
  },
};

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
