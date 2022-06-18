import FuelGroup from "../../nonview/core/FuelGroup";

export default class ExtendedShed {
  static getLastDispatchTime(extendedShed, fuelGroupID) {
    const fuelGroup = FuelGroup.construct(fuelGroupID);

    let lastUpdateTime = undefined;
    for (let dispatch of extendedShed["dispatch_schedule_list"]) {
      if (!fuelGroup.includes(dispatch["fuel_type"])) {
        continue;
      }
      if (!lastUpdateTime || lastUpdateTime < dispatch["time_eta_ut"]) {
        lastUpdateTime = dispatch["time_eta_ut"];
      }
    }
    return lastUpdateTime;
  }

  static getLastUpdateTime(extendedShed, fuelGroupID) {
    const lastUpdateTimeOnly = extendedShed["time_last_updated_by_shed_ut"];
    const lastDispatchTime = ExtendedShed.getLastDispatchTime(
      extendedShed,
      fuelGroupID
    );
    if (lastDispatchTime && lastUpdateTimeOnly) {
      return Math.max(lastDispatchTime, lastUpdateTimeOnly);
    }
    if (lastDispatchTime) {
      return lastDispatchTime;
    }
    if (lastUpdateTimeOnly) {
      return lastUpdateTimeOnly;
    }
    return undefined;
  }

  static getHasListedStock(extendedShed, fuelGroupID) {
    const fuelGroup = FuelGroup.construct(fuelGroupID);

    for (let [fuelType, status] of Object.entries(
      extendedShed["fuel_status_idx"]
    )) {
      if (!fuelGroup.includes(fuelType)) {
        continue;
      }
      if (status.capacity > 0) {
        return true;
      }
    }
    return false;
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
