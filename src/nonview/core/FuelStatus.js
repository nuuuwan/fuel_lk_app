export default class FuelStatus {
  constructor(fuelType, isAvailable, capacity) {
    this.fuelType = fuelType;
    this.isAvailable = isAvailable;
    this.capacity = capacity;
  }

  static fromDict(d) {
    return new FuelStatus(d["fuel_type"], d["is_available"], d["capacity"]);
  }
}
