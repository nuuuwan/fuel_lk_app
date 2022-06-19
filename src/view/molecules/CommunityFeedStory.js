import Paper from "@mui/material/Paper";

import AlignCenter from "../../view/atoms/AlignCenter";
import HumanTime from "../../view/atoms/HumanTime";
import IDAvatar from "../../view/atoms/IDAvatar";
import PollOptionView from "../../view/molecules/PollOptionView";
import ShedBlurb from "../../view/molecules/ShedBlurb";

const STYLE = {
  m: 1,
  p: 2,
};

export default function CommunityFeedStory({
  communityFeedback,
  extendedShedIdx,
}) {
  const extendedShed = extendedShedIdx[communityFeedback.shedCode];
  return (
    <Paper sx={STYLE}>
      <ShedBlurb extendedShed={extendedShed} />
      <PollOptionView pollOptionID={communityFeedback.pollOptionID} />

      <AlignCenter>
        <HumanTime ut={communityFeedback.timeFeedbackUT} />
        <IDAvatar id={communityFeedback.userID} size={32} />
      </AlignCenter>
    </Paper>
  );
}
