import Paper from "@mui/material/Paper";
import PollOptionView from "../../view/molecules/PollOptionView";
import IDAvatar from "../../view/atoms/IDAvatar";
import AlignCenter from "../../view/atoms/AlignCenter";
import HumanTime from "../../view/atoms/HumanTime";

const STYLE = {
  m: 1,
  p: 1,
};

export default function CommunityFeedStory({ communityFeedback }) {
  return (
    <Paper sx={STYLE}>
      {JSON.stringify(communityFeedback)}
      <AlignCenter>
        <IDAvatar id={communityFeedback.userID} size={40} />
        <HumanTime ut={communityFeedback.timeFeedbackUT} />
      </AlignCenter>
      <PollOptionView pollOptionID={communityFeedback.pollOptionID} />
    </Paper>
  );
}
