export default class Fuel {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

export const FUEL_IDX = {
  petrol92: new Fuel("Petrol-92", "red"),
  petrol95: new Fuel("Petrol-95", "maroon"),
  diesel: new Fuel("Diesel", "green"),
  superDiesel: new Fuel("Super-Diesel", "darkgreen"),
  kerosene: new Fuel("Kerosene", "blue"),
};
