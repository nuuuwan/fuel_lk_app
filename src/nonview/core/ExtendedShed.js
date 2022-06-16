import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
import { MAX_RECENCY_HOURS } from "../../nonview/constants/Constants.js";

const MAX_RECENCY_SECONDS = MAX_RECENCY_HOURS * SECONDS_IN.HOUR;

export default class ExtendedShed {
  static getHasRecentDispatch(extendedShed, fuelTypeList) {
    const currentTime = TimeX.getUnixTime();
    for (let dispatch of extendedShed["dispatch_schedule_list"]) {
      if (!fuelTypeList.includes(dispatch["fuel_type"])) {
        continue;
      }
      const deltaToDispatch = dispatch["time_eta_ut"] - currentTime;
      if (deltaToDispatch > -MAX_RECENCY_SECONDS) {
        return true;
      }
    }
    return false;
  }

  static getHasListedStock(extendedShed, fuelTypeList) {
    for (let [fuelType, status] of Object.entries(
      extendedShed["fuel_status_idx"]
    )) {
      if (!fuelTypeList.includes(fuelType)) {
        continue;
      }
      if (status.capacity > 0) {
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
      return extendedShed["gmaps_address"].replace(", Sri Lanka", "");
    }
    if (extendedShed["address"]) {
      return extendedShed["address"];
    }
    return "Unknown";
  }

  static getURLGmaps(extendedShed) {
    const URL_GMAPS_PREFIX = "https://www.google.com/maps/place";
    const [lat, lng] = extendedShed["lat_lng"];
    return `${URL_GMAPS_PREFIX}/${lat},${lng}`;
  }
}
