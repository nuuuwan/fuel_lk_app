import { Component } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import PeopleIcon from "@mui/icons-material/People";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
import NuntiusServer from "../../nonview/core/NuntiusServer";

import AlignCenter from "../../view/atoms/AlignCenter";
import LabelledBox from "../../view/molecules/LabelledBox";

const STYLE_MODAL = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  maxWidth: "67%",
  bgcolor: "background.paper",
  p: 4,
};

const POLL_OPTION_IDX = {
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

function PollOptionView({ pollID }) {
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

  render() {
    const { messages } = this.state;
    if (!messages) {
      return null;
    }
    const onClick = function () {
      this.setState({ showModal: true });
    }.bind(this);

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
            <IconButton onClick={onClick}>
              <SentimentNeutralIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {this.renderModal()}
      </LabelledBox>
    );
  }

  renderModal() {
    const { showModal } = this.state;
    const { label } = this.props;
    const onClose = function () {
      this.setState({ showModal: false });
    }.bind(this);

    return (
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={STYLE_MODAL}>
          <Typography variant="caption">
            How long is the wait for
            <strong>{" " + label + " "}</strong>
            now?
          </Typography>
          {Object.entries(POLL_OPTION_IDX).map(
            function ([pollID, pollOption], iPollOption) {
              const onClick = async function () {
                const message = {
                  messageID: NuntiusServer.getRandomID(),
                  destID: this.destID,
                  sourceID: "GenericUser",
                  messageText: "WaitTime:" + pollID,
                  messageTimeUT: TimeX.getUnixTime(),
                };
                await NuntiusServer.putMessage(message);
                onClose();
                this.reload();
              }.bind(this);

              return (
                <div key={"poll-option-" + iPollOption}>
                  <Button onClick={onClick} sx={{ color: pollOption.color }}>
                    <PollOptionView pollID={pollID} />
                  </Button>
                </div>
              );
            }.bind(this)
          )}
        </Box>
      </Modal>
    );
  }
}
