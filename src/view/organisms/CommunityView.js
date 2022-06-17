import { Component } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

import CommunityViewModal from "../../view/molecules/CommunityViewModal";

import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
import NuntiusServer from "../../nonview/core/NuntiusServer";

import AlignCenter from "../../view/atoms/AlignCenter";
import LabelledBox from "../../view/molecules/LabelledBox";

import PollOptionView, {
  POLL_OPTION_IDX,
} from "../../view/molecules/PollOptionView";
import PeopleIcon from "@mui/icons-material/People";

export default class CommunityView extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, messages: undefined };
  }

  get destID() {
    const { extendedShed, fuelType } = this.props;
    return extendedShed["shed_code"] + "-" + fuelType;
  }

  async reload() {
    const messages = await NuntiusServer.multigetMessages(this.destID);
    this.setState({ messages });
  }

  async componentDidMount() {
    await this.reload();
  }

  async onCloseModal() {
    this.setState({ showModal: false });
    await this.reload();
  }

  async onSelectPoll(pollID) {
    const message = {
      messageID: NuntiusServer.getRandomID(),
      destID: this.destID,
      sourceID: "GenericUser",
      messageText: "WaitTime:" + pollID,
      messageTimeUT: TimeX.getUnixTime(),
    };
    await NuntiusServer.putMessage(message);
    await this.onCloseModal();
  }

  onOpenModal() {
    this.setState({ showModal: true });
  }

  render() {
    const { label } = this.props;
    const { messages, showModal } = this.state;
    if (!messages) {
      return null;
    }

    const messageCount = messages.length;
    let pollResultText = "Insufficient information";
    if (messageCount > 0) {
      const currentUT = TimeX.getUnixTime();
      let pollIDToCount = {};
      for (let message of messages) {
        const timeElapsed = currentUT - message.messageTimeUT;
        if (timeElapsed > SECONDS_IN.HOUR * 6) {
          continue;
        }
        const messageText = message.messageText;
        const pollID = messageText.substring(9);

        if (!POLL_OPTION_IDX[pollID]) {
          continue;
        }

        if (!pollIDToCount[pollID]) {
          pollIDToCount[pollID] = 0;
        }
        pollIDToCount[pollID] += 1;
      }

      const sortedPollIDAndCount = Object.entries(pollIDToCount).sort(function (
        a,
        b
      ) {
        return b[1] - a[1];
      });

      if (sortedPollIDAndCount.length > 0) {
        const mostCommonPollId = sortedPollIDAndCount[0][0];
        const pollOption = POLL_OPTION_IDX[mostCommonPollId];
        if (pollOption) {
          pollResultText = <PollOptionView pollID={mostCommonPollId} />;
        }
      }
    }

    return (
      <LabelledBox
        label={
          <AlignCenter>
            Community Feedback
            {" (" + messageCount + ")"}
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
        <Typography variant="caption" component="div">
          {pollResultText}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Tooltip title={<Typography>Share your feedback!</Typography>}>
            <IconButton onClick={this.onOpenModal.bind(this)}>
              <SentimentNeutralIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <CommunityViewModal
          showModal={showModal}
          label={label}
          onCloseModal={this.onCloseModal.bind(this)}
          onSelectPoll={this.onSelectPoll.bind(this)}
        />
      </LabelledBox>
    );
  }
}
