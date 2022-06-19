import { JSONWWW } from "../../nonview/base/WWW";
import { ExtendedShedNew } from "../../nonview/core/ExtendedShed";

const URL_DATA_ROOT = "https://raw.githubusercontent.com/nuuuwan/fuel_lk/data";

export default class FuelGovLKServer {
  static async multigetRawExtendedShedList() {
    return await new JSONWWW(
      URL_DATA_ROOT + "/latest/extended_shed_list.json"
    ).read();
  }

  static async multigetExtendedShedList() {
    const rawExtendedShedList =
      await FuelGovLKServer.multigetRawExtendedShedList();
    return rawExtendedShedList.slice(0, 1).map(function (d) {
      return ExtendedShedNew.fromDict(d);
    });
  }
}
