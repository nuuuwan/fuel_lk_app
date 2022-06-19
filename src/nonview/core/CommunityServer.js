import NuntiusServer from "../../nonview/base/NuntiusServer";
import CommunityFeedback from "../../nonview/core/CommunityFeedback";

export default class CommunityServer {
  static async getCommunityFeedbackIdx() {
    const recentMessageList = await NuntiusServer.multigetRecent();
    const sortedRecentMessageList = recentMessageList.sort(
      function(a, b) {
        return a.messageTimeUT - b.messageTimeUT;
      },
    );

    let communityFeedbackIdx = {};

    for (let message of sortedRecentMessageList) {
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
      communityFeedbackIdx[shedCode][fuelType][userID] =
        new CommunityFeedback(
          shedCode,
          fuelType,
          userID,
          message.messageTimeUT, // timeFeedbackUT
          message.messageText, // pollOptionID
        );
    }

    return communityFeedbackIdx;
  }
}
