import IDX from "../../nonview/base/IDX";

export default class Fuel {
  constructor(fuelType, name, color) {
    this.fuelType = fuelType;
    this.name = name;
    this.color = color;
  }
}

export const FUEL_LIST = [
  new Fuel("p92", "Petrol-92", "#444"),
  new Fuel("p95", "Petrol-95", "#444"),
  new Fuel("d", "Regular Diesel", "#888"),
  new Fuel("sd", "Super-Diesel", "#888"),
  new Fuel("k", "Kerosene", "#ccc"),
];

export const FUEL_IDX = IDX.build(
  FUEL_LIST,
  (d) => d.fuelType,
  (d) => d
);
