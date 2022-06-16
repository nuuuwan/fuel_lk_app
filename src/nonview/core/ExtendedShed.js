import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
import { MAX_RECENCY_HOURS } from "../../nonview/constants/Constants.js";

export default class ExtendedShed {
  static getHasRecentDispatch(extendedShed) {
    const currentTime = TimeX.getUnixTime();
    for (let dispatch of extendedShed["dispatch_schedule_list"]) {
      const deltaToDispatch = dispatch["time_eta_ut"] - currentTime;
      if (deltaToDispatch > -MAX_RECENCY_HOURS * SECONDS_IN.HOUR) {
        return true;
      }
    }
    return false;
  }

  static getHasListedStock(extendedShed) {
    for (let value of Object.values(extendedShed["fuel_status_idx"])) {
      if (value.capacity > 0) {
        return true;
      }
    }
    return false;
  }

  static deltaTimeSinceLastUpdate(extendedShed) {
    const timeLastUpdated = extendedShed["time_last_updated_by_shed_ut"];
    const currentUT = TimeX.getUnixTime();
    return currentUT - timeLastUpdated;
  }
}
