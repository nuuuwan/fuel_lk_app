export default class DispatchSchedule {
  constructor(
    fuelType,
    plantName,
    timeDispatchUT,
    amount,
    timeLastUpdatedUT,
    timeETAUT
  ) {
    this.fuelType = fuelType;
    this.plantName = plantName;
    this.timeDispatchUT = timeDispatchUT;
    this.amount = timeDispatchUT;
    this.timeLastUpdatedUT = timeLastUpdatedUT;
    this.timeETAUT = timeETAUT;
  }

  static fromDict(d) {
    return new DispatchSchedule(
      d["fuel_type"],
      d["plant_name"],
      d["time_dispatch_ut"],
      d["amount"],
      d["time_last_updated_ut"],
      d["time_eta_ut"]
    );
  }
}
