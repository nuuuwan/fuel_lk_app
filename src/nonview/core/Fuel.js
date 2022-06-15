export default class Fuel {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

export const FUEL_IDX = {
  p92: new Fuel("Petrol-92", "red"),
  p95: new Fuel("Petrol-95", "red"),
  d: new Fuel("Diesel", "maroon"),
  sd: new Fuel("Super-Diesel", "maroon"),
  k: new Fuel("Kerosene", "blue"),
  // ik: new Fuel("ik???", SriLankaColors.Tamil),
};
