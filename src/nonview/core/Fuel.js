import SriLankaColors from "../../nonview/constants/SriLankaColors";

export default class Fuel {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

export const FUEL_IDX = {
  p92: new Fuel("Petrol-92", SriLankaColors.Sinhala),
  p95: new Fuel("Petrol-95", SriLankaColors.Sinhala),
  d: new Fuel("Diesel", SriLankaColors.Muslim),
  sd: new Fuel("Super-Diesel", SriLankaColors.Muslim),
  k: new Fuel("Kerosene", SriLankaColors.Tamil),
  // ik: new Fuel("ik???", SriLankaColors.Tamil),
};
