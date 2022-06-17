import { Component } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const POLL_OPTION_LIST = [
  {
    Icon: SentimentSatisfiedAltIcon,
    label: "< 30 min",
    color: "green",
  },
  {
    Icon: SentimentDissatisfiedIcon,
    label: "30min - 3hr",
    color: "orange",
  },
  {
    Icon: SentimentVeryDissatisfiedIcon,
    label: "> 3hr",
    color: "red",
  },
  {
    Icon: CancelIcon,
    label: "No Fuel",
    color: "black",
  },
];

export default class CommunityView extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  async componentDidMount() {}

  render() {
    const { show } = this.state;

    if (show) {
      return this.renderShow();
    }
    return this.renderHide();
  }

  renderHide() {
    const onClick = function () {
      this.setState({ show: true });
    }.bind(this);
    return (
      <Box>
        <Tooltip title="Did you get fuel from this shed in the last 1 hour? Could you like to share your experience?">
          <IconButton onClick={onClick}>
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  renderShow() {
    const onClick = function () {
      this.setState({ show: false });
    }.bind(this);
    return (
      <Paper sx={{ p: 2, m: 2 }}>
        <Box>
          <Typography variant="caption">How long is the wait now?</Typography>
          {POLL_OPTION_LIST.map(function (pollOption) {
            const Icon = pollOption.Icon;
            return (
              <div>
                <Button startIcon={<Icon />} sx={{ color: pollOption.color }}>
                  {pollOption.label}
                </Button>
              </div>
            );
          })}
          <Button onClick={onClick} sx={{ color: "gray" }}>
            I'm done!
          </Button>
        </Box>
      </Paper>
    );
  }
}
