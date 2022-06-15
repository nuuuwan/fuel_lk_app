import SriLankaColors from "../../nonview/constants/SriLankaColors"

export default class Fuel {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

export const FUEL_IDX = {
  petrol92: new Fuel("Petrol-92", SriLankaColors.Sinhala),
  petrol95: new Fuel("Petrol-95", SriLankaColors.Sinhala),
  diesel: new Fuel("Diesel", SriLankaColors.Muslim),
  superDiesel: new Fuel("Super-Diesel", SriLankaColors.Muslim),
  kerosene: new Fuel("Kerosene", SriLankaColors.Tamil),
};
