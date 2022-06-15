import List from "@mui/material/List";

import TimeX, { SECONDS_IN } from "../../nonview/base/TimeX";
import { FUEL_IDX } from "../../nonview/core/Fuel";

import FuelView from "../../view/molecules/FuelView";

export default function FuelsView({ shedStatus }) {
  const currentTime = TimeX.getUnixTime();
  return (
    <List>
      {Object.entries(FUEL_IDX).map(function ([fuelId, fuel]) {
        const shedFuel = shedStatus["fuel_status_idx"][fuelId];

        let recentDispatch = null;
        for (let dispatch of shedStatus["dispatch_schedule_list"]) {
          if (dispatch["fuel_type"] !== fuelId) {
            continue;
          }
          const deltaToDispatch = dispatch["time_eta_ut"] - currentTime;
          if (deltaToDispatch > -SECONDS_IN.DAY) {
            recentDispatch = dispatch;
          }
        }

        return (
          <FuelView
            key={"fuel-" + fuelId}
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
