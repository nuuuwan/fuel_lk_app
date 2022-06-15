export default class Fuel {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

export const FUEL_IDX = {
  p92: new Fuel("Petrol-92", "#444"),
  p95: new Fuel("Petrol-95", "#444"),
  d: new Fuel("Diesel", "#888"),
  sd: new Fuel("Super-Diesel", "#888"),
  k: new Fuel("Kerosene", "#ccc"),
  // ik: new Fuel("ik???", SriLankaColors.Tamil),
};
