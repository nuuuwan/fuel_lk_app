import IDX from "../../nonview/base/IDX";

export default class FuelGroup {
  constructor(fuelGroupID, label, fuelTypeList) {
    this.fuelGroupID = fuelGroupID;
    this.label = label;
    this.fuelTypeList = fuelTypeList;
  }

  static getFuelTypeGroupLabel(selectedFuelTypeList) {
    for (let [label, fuelTypeList] of Object.entries(FUEL_GROUP_IDX)) {
      if (
        JSON.stringify(selectedFuelTypeList) === JSON.stringify(fuelTypeList)
      ) {
        return label;
      }
    }
    return undefined;
  }

  includes(fuelType) {
    return this.fuelTypeList.includes(fuelType);
  }

  static construct(fuelGroupID) {
    return FUEL_GROUP_IDX[fuelGroupID];
  }
}

export const ALL_FUEL_GROUP_ID = "p92.p95.d.sd.k";

export const FUEL_GROUP_LIST = [
  new FuelGroup("p92", "Petrol-92 only", ["p92"]),
  new FuelGroup("p95", "Petrol-95 only", ["p95"]),
  new FuelGroup("p92.p95", "Any Petrol", ["p92", "p95"]),
  new FuelGroup("d", "Regular Diesel only", ["d"]),
  new FuelGroup("sd", "Super-Diesel only", ["sd"]),
  new FuelGroup("ds.d", "Any Diesel", ["d", "sd"]),
  new FuelGroup("k", "Kerosene", ["k"]),
  new FuelGroup(ALL_FUEL_GROUP_ID, "All Fuels", ["p92", "p95", "d", "sd", "k"]),
];

export const FUEL_GROUP_IDX = IDX.build(
  FUEL_GROUP_LIST,
  (d) => d.fuelGroupID,
  (d) => d
);
