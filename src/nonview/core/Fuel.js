export const FUEL_TYPE_GROUP_IDX = {
  "Petrol-92 only": ["p92"],
  "Petrol-95 only": ["p95"],
  "Any Petrol": ["p92", "p95"],
  "Regular Diesel only": ["d"],
  "Super-Diesel only": ["sd"],
  "Any Diesel": ["d", "sd"],
  Kerosene: ["k"],
  "All Fuels": ["p92", "p95", "d", "sd", "k"],
};

export default class Fuel {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  static getFuelTypeGroupLabel(selectedFuelTypeList) {
    for (let [label, fuelTypeList] of Object.entries(FUEL_TYPE_GROUP_IDX)) {
      if (
        JSON.stringify(selectedFuelTypeList) === JSON.stringify(fuelTypeList)
      ) {
        return label;
      }
    }
    return undefined;
  }
}

export const FUEL_IDX = {
  p92: new Fuel("Petrol-92", "#444"),
  p95: new Fuel("Petrol-95", "#444"),
  d: new Fuel("Regular Diesel", "#888"),
  sd: new Fuel("Super-Diesel", "#888"),
  k: new Fuel("Kerosene", "#ccc"),
  // ik: new Fuel("ik???", SriLankaColors.Tamil),
};
