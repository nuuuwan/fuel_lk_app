import { Component } from "react";

import PeopleIcon from "@mui/icons-material/People";

import PollWaitingTime from "../../nonview/core/PollWaitingTime";

import AlignCenter from "../../view/atoms/AlignCenter";
import CommunityViewModal from "../../view/molecules/CommunityViewModal";
import LabelledBox from "../../view/molecules/LabelledBox";

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
    const { showModal } = this.state;

    return (
      <LabelledBox
        label={
          <AlignCenter>
            Community Feedback
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
        <CommunityViewModal
          showModal={showModal}
          label={label}
          onOpenModal={this.onOpenModal.bind(this)}
          onCloseModal={this.onCloseModal.bind(this)}
          onSelectPoll={this.onSelectPoll.bind(this)}
        />
      </LabelledBox>
    );
  }
}
