import BaseShed, { BASE_SHED_IDX } from "../../nonview/core/BaseShed";
import DispatchSchedule from "../../nonview/core/DispatchSchedule";
import FuelGroup from "../../nonview/core/FuelGroup";
import FuelStatus from "../../nonview/core/FuelStatus";

export class ExtendedShedNew extends BaseShed {
  constructor(
    // BaseShed
    shedID,
    shedCode,
    shedName,
    shedType,
    address,
    latLng,
    gmapAddress,
    // ExtendedShedNew only
    timeLastUpdatedByShedUT,
    dispatchScheduleList,
    fuelStatusIdx,
    communityFeedbackIdx,
  ) {
    // BaseShed constructor
    super(shedID, shedCode, shedName, shedType, address, latLng, gmapAddress);

    this.timeLastUpdatedByShedUT = timeLastUpdatedByShedUT;
    this.dispatchScheduleList = dispatchScheduleList;
    this.fuelStatusIdx = fuelStatusIdx;
    this.communityFeedbackIdx = communityFeedbackIdx;
  }

  static fromMultipleData(rawD, communityFeedbackIdx) {
    const shedCode = rawD["shed_code"];
    const communityFeedbackIdxForShed = communityFeedbackIdx[shedCode] ? communityFeedbackIdx[shedCode] : {};
    const baseShed = BASE_SHED_IDX[shedCode];
    return new ExtendedShedNew(

      // BaseShed
      baseShed.shedID,
      baseShed.shedCode,
      baseShed.shedName,
      baseShed.shedType,
      baseShed.address,
      baseShed.latLng,
      baseShed.gmapAddress,

      // timeLastUpdatedByShedUT
      rawD["time_last_updated_by_shed_ut"],

      // dispatchScheduleList
      rawD["dispatch_schedule_list"].map(function (d1) {
        return DispatchSchedule.fromDict(d1);
      }),

      // fuelStatusIdx
      Object.entries(rawD["fuel_status_idx"])
        .map(function ([fuelType, d1]) {
          const d2 = {
            fuel_type: fuelType,
            is_available: d1["is_available"],
            capacity: d1["capacity"],
          };
          return [fuelType, FuelStatus.fromDict(d2)];
        })
        .reduce(function (fuelStatusIdx, [fuelType, fuelStatus]) {
          fuelStatusIdx[fuelType] = fuelStatus;
          return fuelStatusIdx;
        }, {}),

      // communityFeedbackIdx
      communityFeedbackIdxForShed,
    );
  }
}

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
