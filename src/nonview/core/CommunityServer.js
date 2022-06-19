import NuntiusServer from "../../nonview/base/NuntiusServer";
import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
import CommunityFeedback from "../../nonview/core/CommunityFeedback";

const MAX_COMMUNITY_FEEDBACK_AGE_HOURS = 1;

export default class CommunityServer {
  static async getCommunityFeedbackIdx() {
    const currentTimeUT = TimeX.getUnixTime();
    const recentMessageList = await NuntiusServer.multigetRecent();
    const sortedRecentMessageList = recentMessageList.sort(function (a, b) {
      return a.messageTimeUT - b.messageTimeUT;
    });

    let communityFeedbackIdx = {};

    for (let message of sortedRecentMessageList) {
      const timeFeedbackUT = message.messageTimeUT;

      if (!timeFeedbackUT) {
        console.error("Missing message.messageTimeUT");
        continue;
      }

      const messageAge = currentTimeUT - timeFeedbackUT;
      if (messageAge > MAX_COMMUNITY_FEEDBACK_AGE_HOURS * SECONDS_IN.HOUR) {
        continue;
      }

      const tokens = message.destID.split(":");
      if (tokens.length !== 3) {
        console.error("Invalid message.destID: " + message.destID);
        continue;
      }

      const shedCode = tokens[1];
      const fuelType = tokens[2];

      if (!communityFeedbackIdx[shedCode]) {
        communityFeedbackIdx[shedCode] = {};
      }

      if (!communityFeedbackIdx[shedCode][fuelType]) {
        communityFeedbackIdx[shedCode][fuelType] = {};
      }

      const userID = message.sourceID;
      communityFeedbackIdx[shedCode][fuelType][userID] = new CommunityFeedback(
        shedCode,
        fuelType,
        userID,
        timeFeedbackUT, // timeFeedbackUT
        message.messageText // pollOptionID
      );
    }

    return communityFeedbackIdx;
  }

  static async getCommunityFeedbackList() {
    const communityFeedbackIdx =
      await CommunityServer.getCommunityFeedbackIdx();

    return Object.values(communityFeedbackIdx)
      .reduce(function (communityFeedbackList, idxForShed) {
        return Object.values(idxForShed).reduce(function (
          communityFeedbackList,
          idxForFuelType
        ) {
          return [].concat(
            communityFeedbackList,
            Object.values(idxForFuelType)
          );
        },
        communityFeedbackList);
      }, [])
      .sort(function (a, b) {
        return b.timeFeedbackUT - a.timeFeedbackUT;
      });
  }
}
