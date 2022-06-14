export default class Shed {
  constructor(
    shedId,
    shedName,
    bowserDispatch,
    eta,
    fuelCapacity,
    fuelType,
    lastUpdateByShed,
    shedOwnerUpdateToday
  ) {
    this.shedId = shedId;
    this.shedName = shedName;
    this.bowserDispatch = bowserDispatch;
    this.eta = eta;
    this.fuelCapacity = fuelCapacity;
    this.fuelType = fuelType;
    this.lastUpdateByShed = lastUpdateByShed;
    this.lastUpdateByShedDate = new Date(this.lastUpdateByShed);
    this.lastUpdateByShedUT = this.lastUpdateByShedDate / 1_000.0;

    this.shedOwnerUpdateToday = shedOwnerUpdateToday;
  }

  static fromDict(d) {
    console.debug(d);
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
