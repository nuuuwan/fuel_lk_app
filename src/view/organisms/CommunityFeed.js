import { Component } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";

import CommunityServer from "../../nonview/core/CommunityServer";

import CommunityFeedStory from "../../view/molecules/CommunityFeedStory";

const STYLE = { m: 1, p: 1, width: 250 };

export default class CommunityFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { communityFeedbackIdx: undefined };
  }

  async componentDidMount() {
    this.setState({
      communityFeedbackList: await CommunityServer.getCommunityFeedbackList(),
    });
  }

  renderInner() {
    const { communityFeedbackList } = this.state;
    if (communityFeedbackList === undefined) {
      return <CircularProgress />;
    }

    if (communityFeedbackList.length === 0) {
      return <Alert severity="info">No Recent Community Feedback</Alert>;
    }

    const { extendedShedIdx } = this.props;

    return communityFeedbackList.map(function (communityFeedback, iStory) {
      return (
        <CommunityFeedStory
          key={"feed-story-" + iStory}
          communityFeedback={communityFeedback}
          extendedShedIdx={extendedShedIdx}
        />
      );
    });
  }

  render() {
    const { isOpenFeed, onCloseDrawerFeed } = this.props;
    return (
      <Drawer anchor={"right"} open={isOpenFeed} onClose={onCloseDrawerFeed}>
        <Box sx={STYLE}>{this.renderInner()}</Box>
      </Drawer>
    );
  }
}

// import CommunityFeed from "../../view/organisms/CommunityFeed";
