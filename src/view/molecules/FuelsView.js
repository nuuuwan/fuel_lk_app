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
        const shedFuel = extendedShed["fuel_status_idx"][fuelType];

        let recentDispatch = null;
        for (let dispatch of extendedShed["dispatch_schedule_list"]) {
          if (dispatch["fuel_type"] !== fuelType) {
            continue;
          }
          const deltaToDispatch = dispatch["time_eta_ut"] - currentTime;
          if (deltaToDispatch > -SECONDS_IN.HOUR * MAX_RECENCY_HOURS) {
            recentDispatch = dispatch;
          }
        }

        return (
          <FuelView
            extendedShed={extendedShed}
            fuelType={fuelType}
            key={"fuel-" + fuelType}
            label={fuel.name}
            isAvailable={shedFuel["is_available"]}
            capacity={shedFuel.capacity}
            recentDispatch={recentDispatch}
            color={fuel.color}
          />
        );
      })}
    </List>
  );
}
