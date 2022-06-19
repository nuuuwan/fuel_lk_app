import BaseShed, { BASE_SHED_IDX } from "../../nonview/core/BaseShed";
import DispatchSchedule from "../../nonview/core/DispatchSchedule";
import FuelGroup from "../../nonview/core/FuelGroup";
import FuelStatus from "../../nonview/core/FuelStatus";

export default class ExtendedShed extends BaseShed {
  constructor(
    // BaseShed
    shedID,
    shedCode,
    shedName,
    shedType,
    address,
    latLng,
    gmapsAddress,
    // ExtendedShedNew only
    timeLastUpdatedByShedUT,
    dispatchScheduleList,
    fuelStatusIdx,
    communityFeedbackIdx
  ) {
    // BaseShed constructor
    super(shedID, shedCode, shedName, shedType, address, latLng, gmapsAddress);

    this.timeLastUpdatedByShedUT = timeLastUpdatedByShedUT;
    this.dispatchScheduleList = dispatchScheduleList;
    this.fuelStatusIdx = fuelStatusIdx;
    this.communityFeedbackIdx = communityFeedbackIdx;
  }

  static fromMultipleData(rawD, communityFeedbackIdx) {
    const shedCode = rawD["shed_code"];
    const communityFeedbackIdxForShed = communityFeedbackIdx[shedCode]
      ? communityFeedbackIdx[shedCode]
      : {};
    const baseShed = BASE_SHED_IDX[shedCode];
    return new ExtendedShed(
      // BaseShed
      baseShed.shedID,
      baseShed.shedCode,
      baseShed.shedName,
      baseShed.shedType,
      baseShed.address,
      baseShed.latLng,
      baseShed.gmapsAddress,

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
      communityFeedbackIdxForShed
    );
  }

  getTimeLastDispatchUT(fuelGroupID) {
    const fuelGroup = FuelGroup.construct(fuelGroupID);

    let timeLastDispatchUT = undefined;
    for (let dispatchSchedule of this.dispatchScheduleList) {
      if (!fuelGroup.includes(dispatchSchedule.fuelType)) {
        continue;
      }
      if (
        !timeLastDispatchUT ||
        timeLastDispatchUT < dispatchSchedule.timeETAUT
      ) {
        timeLastDispatchUT = dispatchSchedule.timeETAUT;
      }
    }
    return timeLastDispatchUT;
  }

  getTimeLastUpdatedUT(fuelGroupID) {
    const timeLastUpdatedByShedUT = this.timeLastUpdatedByShedUT;
    const timeLastDispatchUT = this.getTimeLastDispatchUT(fuelGroupID);
    if (timeLastUpdatedByShedUT && timeLastDispatchUT) {
      return Math.max(timeLastUpdatedByShedUT, timeLastDispatchUT);
    }
    if (timeLastUpdatedByShedUT) {
      return timeLastUpdatedByShedUT;
    }
    if (timeLastDispatchUT) {
      return timeLastDispatchUT;
    }
    return undefined;
  }

  getHasListedStock(fuelGroupID) {
    const fuelGroup = FuelGroup.construct(fuelGroupID);

    for (let fuelStatus of Object.values(this.fuelStatusIdx)) {
      if (!fuelGroup.includes(fuelStatus.fuelType)) {
        continue;
      }
      if (fuelStatus.capacity > 0) {
        return true;
      }
    }
    return false;
  }

  get hasCommunityFeedback() {
    return Object.keys(this.communityFeedbackIdx).length > 0;
  }
}
