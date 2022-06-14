export default class FuelInfo {
  constructor(
    shedId,
    shedName,
    lastUpdatedByShed,
    fuelType,
    fuelCapacity,
    bowserDispatch,
    eta,
    shedOwnerUpdateToday
  ) {
    this.shedId = shedId;
    this.shedName = shedName;
    this.lastUpdatedByShed = lastUpdatedByShed;
    this.fuelType = fuelType;
    this.fuelCapacity = fuelCapacity;

    this.bowserDispatch = bowserDispatch;
    this.eta = eta;
    this.shedOwnerUpdateToday = shedOwnerUpdateToday;
  }

  static constructFromDict(d) {
    return new FuelInfo(
      d.shedId,
      d.shedName,
      d.lastupdatebyshed, // != lastUpdatedByShed
      d.fuelType,
      d.fuelCapacity,
      d.bowserDispatch,
      d.eta,
      d.shedownerupdatetoday // != shedOwnerUpdateToday
    );
  }
}
