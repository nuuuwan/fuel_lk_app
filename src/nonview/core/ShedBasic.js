export default class Shed {
  constructor(
    shedId,
    shedName,
    bowserDispatch,
    eta,
    fuelCapacity,
    fuelType,
    lastupdatebyshed,
    shedOwnerUpdateToday
  ) {
    this.shedId = shedId;
    this.shedName = shedName;
    this.bowserDispatch = bowserDispatch;
    this.eta = eta;
    this.fuelCapacity = fuelCapacity;
    this.fuelType = fuelType;
    this.lastupdatebyshed = lastupdatebyshed;
    this.shedownerupdatetoday = shedOwnerUpdateToday;

    this.lastUpdateByShedDate = new Date(this.lastupdatebyshed);
    this.lastUpdateByShedUT = this.lastUpdateByShedDate / 1_000.0;
  }

  static fromDict(d) {
    return new Shed(
      d.shedId,
      d.shedName,
      d.bowserDispatch,
      d.eta,
      d.fuelCapacity,
      d.fuelType,
      d.lastupdatebyshed,
      d.shedownerupdatetoday
    );
  }
}
