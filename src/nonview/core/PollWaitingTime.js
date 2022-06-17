import CancelIcon from "@mui/icons-material/Cancel";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import GhostUser from "../../nonview/base/GhostUser";
import ID from "../../nonview/base/ID";
import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
import NuntiusServer from "../../nonview/core/NuntiusServer";

export const POLL_OPTION_IDX = {
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

const POLL_NAME = "WaitTime";
const CUTTOFF_TIME_ELAPSED = SECONDS_IN.HOUR * 6;

export default class PollWaitingTime {
  static getDestID(shedCode, fuelType) {
    return [POLL_NAME, shedCode, fuelType].join(":");
  }

  static async addFeedback(shedCode, fuelType, pollOptionID) {
    const userID = await GhostUser.getUserID();
    const message = {
      messageID: ID.getRandomID(),
      destID: PollWaitingTime.getDestID(shedCode, fuelType),
      sourceID: userID,
      messageText: pollOptionID,
      messageTimeUT: TimeX.getUnixTime(),
    };
    await NuntiusServer.putMessage(message);
  }

  static async getSummaryFeedback(shedCode, fuelType) {
    const messages = await NuntiusServer.multigetMessages(
      PollWaitingTime.getDestID(shedCode, fuelType)
    );

    const currentUT = TimeX.getUnixTime();
    const validMessages = messages
      .filter(function (message) {
        return currentUT - message.messageTimeUT < CUTTOFF_TIME_ELAPSED;
      })
      .filter(function (message) {
        const pollOptionID = message.messageText;
        return POLL_OPTION_IDX[pollOptionID] !== null;
      })
      .sort(function (a, b) {
        return a.messageTimeUT - b.messageTimeUT;
      });

    let sourceIDToPollOptionID = {};
    for (let message of validMessages) {
      const pollOptionID = message.messageText;
      const sourceID = message.sourceID;
      sourceIDToPollOptionID[sourceID] = pollOptionID;
    }

    const pollOptionIDToCount = Object.values(sourceIDToPollOptionID).reduce(
      function (pollOptionIDToCount, pollOptionID) {
        if (!pollOptionIDToCount[pollOptionID]) {
          pollOptionIDToCount[pollOptionID] = 0;
        }
        pollOptionIDToCount[pollOptionID] += 1;
        return pollOptionIDToCount;
      },
      {}
    );

    const sortedPollOptionIDAndCountPairs = Object.entries(
      pollOptionIDToCount
    ).sort(function (a, b) {
      return b[1] - a[1];
    });

    return {
      validMessageCount: Object.keys(sourceIDToPollOptionID).length,
      sortedPollOptionIDAndCountPairs,
    };
  }
}
