import { Component } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";

import CommunityServer from "../../nonview/core/CommunityServer";

const STYLE = { m: 1, p: 1, width: 250 };

export default class CommunityFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { communityFeedbackIdx: undefined };
  }

  async componentDidMount() {
    this.setState({
      communityFeedbackIdx: await CommunityServer.getCommunityFeedbackIdx(),
    });
  }

  renderInner() {
    const { communityFeedbackIdx } = this.state;
    if (!communityFeedbackIdx) {
      return <CircularProgress />;
    }

    return Object.entries(communityFeedbackIdx).map(function ([
      shedCode,
      idxForShed,
    ]) {
      return Object.entries(idxForShed).map(function ([
        fuelType,
        idxForFuelType,
      ]) {
        return Object.values(idxForFuelType).map(function (communityFeedback) {
          return JSON.stringify(communityFeedback);
        });
      });
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
