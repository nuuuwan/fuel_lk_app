import { JSONWWW } from "../../nonview/base/WWW";

const URL_DATA_ROOT = "https://raw.githubusercontent.com/nuuuwan/fuel_lk/data";

export default class FuelGovLKServer {
  static async multigetExtendedShedList() {
    return await new JSONWWW(
      URL_DATA_ROOT + "/latest/extended_shed_list.json"
    ).read();
  }
}
