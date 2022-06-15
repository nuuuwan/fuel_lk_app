import List from "@mui/material/List";

import { FUEL_IDX } from "../../nonview/core/Fuel";

import FuelView from "../../view/molecules/FuelView";

export default function FuelsView({ shedStatus }) {
  return (
    <List>
      {Object.entries(FUEL_IDX).map(function ([fuelId, fuel]) {
        const shedFuel = shedStatus["fuel_status_idx"][fuelId];
        return (
          <FuelView
            key={"fuel-" + fuelId}
            label={fuel.name}
            availlability={shedFuel["is_available"]}
            capacity={shedFuel.capacity}
            color={fuel.color}
          />
        );
      })}
    </List>
  );
}
