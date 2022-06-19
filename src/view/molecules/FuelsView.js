import List from "@mui/material/List";

import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
import { MAX_RECENCY_HOURS } from "../../nonview/constants/Constants.js";
import { FUEL_IDX } from "../../nonview/core/Fuel";

import FuelView from "../../view/molecules/FuelView";

export default function FuelsView({ extendedShed }) {
  const currentTime = TimeX.getUnixTime();
  return (
    <List>
      {Object.entries(FUEL_IDX).map(function ([fuelType, fuel]) {
        const fuelStatus = extendedShed.fuelStatusIdx[fuelType];

        let mostRecentDispatchSchedule = null;
        for (let dispatchSchedule of extendedShed.dispatchScheduleList) {
          if (dispatchSchedule.fuelType !== fuelType) {
            continue;
          }
          const deltaToDispatch = dispatchSchedule.timeETAUT - currentTime;
          if (deltaToDispatch > -SECONDS_IN.HOUR * MAX_RECENCY_HOURS) {
            mostRecentDispatchSchedule = dispatchSchedule;
          }
        }

        return (
          <FuelView
            extendedShed={extendedShed}
            fuelType={fuelType}
            key={"fuel-" + fuelType}
            label={fuel.name}
            isAvailable={fuelStatus.isAvailable}
            capacity={fuelStatus.capacity}
            mostRecentDispatchSchedule={mostRecentDispatchSchedule}
            color={fuel.color}
          />
        );
      })}
    </List>
  );
}
