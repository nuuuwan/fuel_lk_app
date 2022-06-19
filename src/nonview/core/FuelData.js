import IDX from "../../nonview/base/IDX";
import { JSONWWW } from "../../nonview/base/WWW";
import NuntiusServer from "../../nonview/base/NuntiusServer";

const URL_DATA_ROOT = "https://raw.githubusercontent.com/nuuuwan/fuel_lk/data";

export default class FuelData {
  static async multigetExtendedShedList() {
    const rawDataList = await new JSONWWW(
      URL_DATA_ROOT + "/latest/extended_shed_list.json"
    ).read();

    const extendedShedList = rawDataList.sort(function (a, b) {
      const ta = a["time_last_updated_by_shed_ut"];
      const tb = b["time_last_updated_by_shed_ut"];

      if (ta && tb) {
        return ta - tb;
      }
      return a["shed_id"] - b["shed_id"];
    });

    let extendedShedIdx = IDX.build(
      extendedShedList,
      (x) => x["shed_code"],
      (x) => x
    );

    const recentMessageList = await NuntiusServer.multigetRecent();
    for (let message of recentMessageList) {
      const tokens = message.destID.split(":");
      if (tokens.length !== 3) {
        console.error("Invalid message.destID: " + message.destID);
        continue;
      }

      const shedCode = tokens[1];
      const fuelType = message.destID.split(":")[2];

      if (!extendedShedIdx[shedCode]) {
        console.error("No extendedShedIdx entry for shedCode: " + shedCode);
        continue;
      }

      if (!extendedShedIdx[shedCode]["recentMessageList"]) {
        extendedShedIdx[shedCode]["recentMessageList"] = {};
      }
      if (!extendedShedIdx[shedCode]["recentMessageList"][fuelType]) {
        extendedShedIdx[shedCode]["recentMessageList"][fuelType] = [];
      }
      extendedShedIdx[shedCode]["recentMessageList"][fuelType].push({
        sourceID: message.sourceID,
        messageTimeUT: message.messageTimeUT,
        messageText: message.messageText,
      });
    }

    const extendedShedListWithMessages = Object.values(extendedShedIdx);
    return extendedShedListWithMessages;
  }
}
