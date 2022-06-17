import { Component } from "react";

import Box from "@mui/material/Box";

import PollWaitingTime from "../../nonview/core/PollWaitingTime";

import CommunityViewModal from "../../view/molecules/CommunityViewModal";
import CommunityFeedback from "../../view/molecules/CommunityFeedback";

export default class CommunityView extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, summaryFeedback: undefined };
  }

  async reload() {
    const { extendedShed, fuelType } = this.props;
    const shedCode = extendedShed["shed_code"];
    const summaryFeedback = await PollWaitingTime.getSummaryFeedback(
      shedCode,
      fuelType
    );
    this.setState({ summaryFeedback });
  }

  async componentDidMount() {
    await this.reload();
  }

  async onCloseModal() {
    this.setState({ showModal: false });
    await this.reload();
  }

  onOpenModal() {
    this.setState({ showModal: true });
  }

  async onSelectPoll(pollOptionID) {
    const { extendedShed, fuelType } = this.props;
    const shedCode = extendedShed["shed_code"];
    await PollWaitingTime.addFeedback(shedCode, fuelType, pollOptionID);
    await this.onCloseModal();
  }

  render() {
    const { label } = this.props;
    const { showModal, summaryFeedback } = this.state;

    return (
      <Box>
        <CommunityFeedback summaryFeedback={summaryFeedback} />

        <CommunityViewModal
          showModal={showModal}
          label={label}
          onOpenModal={this.onOpenModal.bind(this)}
          onCloseModal={this.onCloseModal.bind(this)}
          onSelectPoll={this.onSelectPoll.bind(this)}
        />
      </Box>
    );
  }
}
