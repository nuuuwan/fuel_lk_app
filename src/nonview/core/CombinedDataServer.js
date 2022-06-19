import IDX from "../../nonview/base/IDX";
import CommunityServer from "../../nonview/core/CommunityServer";
import ExtendedShed from "../../nonview/core/ExtendedShed";
import FuelGovLKServer from "../../nonview/core/FuelGovLKServer";

export default class CombinedDataServer {
  static async multigetExtendedShedList() {
    const rawExtendedShedList =
      await FuelGovLKServer.multigetExtendedShedList();
    const communityFeedbackIdx =
      await CommunityServer.getCommunityFeedbackIdx();

    return rawExtendedShedList.map(function (rawD) {
      return ExtendedShed.fromMultipleData(rawD, communityFeedbackIdx);
    });
  }

  static async getExtendedShedIdx() {
    const extendedShedList =
      await CombinedDataServer.multigetExtendedShedList();
    return IDX.build(
      extendedShedList,
      (x) => x.shedCode,
      (x) => x
    );
  }
}
