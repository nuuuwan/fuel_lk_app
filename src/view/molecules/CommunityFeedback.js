import PeopleIcon from "@mui/icons-material/People";

import { t } from "../../nonview/base/I18N";

import AlignCenter from "../../view/atoms/AlignCenter";
import LabelledBox from "../../view/molecules/LabelledBox";
import PollOptionView from "../../view/molecules/PollOptionView";

const MIN_VALID_MESSAGE_COUNT = 1;

export default function CommunityFeedback({ summaryFeedback }) {
  if (!summaryFeedback) {
    return null;
  }
  const { validMessageCount, sortedPollOptionIDAndCountPairs } =
    summaryFeedback;
  if (validMessageCount === 0) {
    return null;
  }

  const [topPollOptionID, topCount] = sortedPollOptionIDAndCountPairs[0];
  const topP = topCount / validMessageCount;
  const isSufficient =
    topP > 0.5 && validMessageCount >= MIN_VALID_MESSAGE_COUNT;

  return (
    <LabelledBox
      label={
        <AlignCenter>
          {t("Recent Community Feedback") + ` (${validMessageCount})`}
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
      {isSufficient ? (
        <PollOptionView pollOptionID={topPollOptionID} />
      ) : (
        t("Need more responses")
      )}
    </LabelledBox>
  );
}

// import CommunityFeedback from "../../view/atoms/CommunityFeedback";
