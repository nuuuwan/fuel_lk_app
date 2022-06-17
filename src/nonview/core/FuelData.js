import { jsonCache } from "../../nonview/base/CacheX";

const URL_DATA_ROOT = "https://raw.githubusercontent.com/nuuuwan/fuel_lk/data";

export default class FuelData {
  static async multigetExtendedShedList() {
    const url = URL_DATA_ROOT + "/latest/extended_shed_list.json";
    const rawDataList = await jsonCache(url);
    return rawDataList.sort(function (a, b) {
      const ta = a["time_last_updated_by_shed_ut"];
      const tb = b["time_last_updated_by_shed_ut"];

      if (ta && tb) {
        return ta - tb;
      }
      return a["shed_id"] - b["shed_id"];
    });
  }
}
