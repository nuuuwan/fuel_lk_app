import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
import { MAX_RECENCY_HOURS } from "../../nonview/constants/Constants.js";

const MAX_RECENCY_SECONDS = MAX_RECENCY_HOURS * SECONDS_IN.HOUR;

export default class ExtendedShed {
  static getHasRecentDispatch(extendedShed) {
    const currentTime = TimeX.getUnixTime();
    for (let dispatch of extendedShed["dispatch_schedule_list"]) {
      const deltaToDispatch = dispatch["time_eta_ut"] - currentTime;
      if (deltaToDispatch > -MAX_RECENCY_SECONDS) {
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

  static getDeltaTimeSinceLastUpdate(extendedShed) {
    const timeLastUpdated = extendedShed["time_last_updated_by_shed_ut"];
    const currentUT = TimeX.getUnixTime();
    return currentUT - timeLastUpdated;
  }

  static getHasRecentUpdate(extendedShed) {
    const deltaTimeSinceLastUpdate =
      ExtendedShed.getDeltaTimeSinceLastUpdate(extendedShed);
    return deltaTimeSinceLastUpdate < MAX_RECENCY_SECONDS;
  }

  static getDisplayAddress(extendedShed) {
    if (extendedShed["gmaps_address"]) {
      return extendedShed["gmaps_address"];
    }
    if (extendedShed["address"]) {
      return extendedShed["address"];
    }
    return "Unknown";
  }
}
