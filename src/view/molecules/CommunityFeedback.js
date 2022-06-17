import PeopleIcon from "@mui/icons-material/People";

import AlignCenter from "../../view/atoms/AlignCenter";
import LabelledBox from "../../view/molecules/LabelledBox";
import PollOptionView from "../../view/molecules/PollOptionView";

export default function CommunityFeedback({ summaryFeedback }) {
  if (!summaryFeedback) {
    return null;
  }
  const { validMessageCount, sortedPollOptionIDAndCountPairs } =
    summaryFeedback;
  if (validMessageCount === 0) {
    return null;
  }

  const topPollOptionID = sortedPollOptionIDAndCountPairs[0][0];

  return (
    <LabelledBox
      label={
        <AlignCenter>
          {`Community Feedback (${validMessageCount})`}
          <PeopleIcon
            sx={{
              paddingLeft: 0.5,
              fontSize: "small",
              color: "primary",
            }}
          />
        </AlignCenter>
      }
    >
      <PollOptionView pollOptionID={topPollOptionID} />
    </LabelledBox>
  );
}

// import CommunityFeedback from "../../view/atoms/CommunityFeedback";
