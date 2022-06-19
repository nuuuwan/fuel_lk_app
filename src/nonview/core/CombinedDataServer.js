import CommunityServer from "../../nonview/core/CommunityServer";
import FuelGovLKServer from "../../nonview/core/FuelGovLKServer";
import ExtendedShed, {ExtendedShedNew} from "../../nonview/core/ExtendedShed"
export default class CombinedDataServer {
  static async multigetExtendedShedList() {
    const rawExtendedShedList =
      await FuelGovLKServer.multigetExtendedShedList();
    const communityFeedbackIdx = await CommunityServer.getCommunityFeedbackIdx();

    return rawExtendedShedList.map(
      function(rawD) {
        return ExtendedShedNew.fromMultipleData(rawD, communityFeedbackIdx);
      },
    );


  }
}
