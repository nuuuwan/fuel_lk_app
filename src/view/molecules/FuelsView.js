import List from "@mui/material/List";

import { FUEL_IDX } from "../../nonview/core/Fuel";

import FuelView from "../../view/molecules/FuelView";

export default function FuelsView({ shed }) {
  console.debug({ shed });
  return (
    <List>
      {Object.entries(FUEL_IDX).map(function ([fuelId, fuel]) {
        const shedFuel = shed.fuels[fuelId];
        return (
          <FuelView
            key={"fuel-" + fuelId}
            label={fuel.name}
            availlability={shedFuel.isAvailable}
            capacity={shedFuel.capacity}
            color={fuel.color}
          />
        );
      })}
    </List>
  );
}

// import FuelsView from "../../view/atoms/FuelsView";
