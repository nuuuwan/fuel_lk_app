export default class Shed {
  constructor(shedId, shedName) {
    this.shedId = shedId;
    this.shedName = shedName;
  }

  static fromDict(d) {
    return new Shed(d.shedId, d.shedName);
  }
}
