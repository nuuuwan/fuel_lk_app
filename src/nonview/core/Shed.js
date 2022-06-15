export default class Shed {
  constructor(
    address,
    bowserDispatch,
    davailablity,
    dcapacity,
    dispatchSheduleList,
    ikavailablity,
    ikcapacity,
    kavailablity,
    kcapacity,
    lastupdateddate,
    latitude,
    longitude,
    p92Availablity,
    p92Capacity,
    p95Availablity,
    p95Capacity,
    sdavailablity,
    sdcapacity,
    shedCode,
    shedName,
    shedownerupdatetoday
  ) {
    this.address = address;
    this.bowserDispatch = bowserDispatch;
    this.davailablity = davailablity;
    this.dcapacity = dcapacity;
    this.dispatchSheduleList = dispatchSheduleList;
    this.ikavailablity = ikavailablity;
    this.ikcapacity = ikcapacity;
    this.kavailablity = kavailablity;
    this.kcapacity = kcapacity;
    this.lastupdateddate = lastupdateddate;
    this.latitude = latitude;
    this.longitude = longitude;
    this.p92Availablity = p92Availablity;
    this.p92Capacity = p92Capacity;
    this.p95Availablity = p95Availablity;
    this.p95Capacity = p95Capacity;
    this.sdavailablity = sdavailablity;
    this.sdcapacity = sdcapacity;
    this.shedCode = shedCode;
    this.shedName = shedName;
    this.shedownerupdatetoday = shedownerupdatetoday;

    this.latLng = [parseFloat(this.longitude), parseFloat(this.latitude)];
  }

  static fromDict(d) {
    return new Shed(
      d.address,
      d.bowserDispatch,
      d.davailablity,
      d.dcapacity,
      d.dispatchSheduleList,
      d.ikavailablity,
      d.ikcapacity,
      d.kavailablity,
      d.kcapacity,
      d.lastupdateddate,
      d.latitude,
      d.longitude,
      d.p92Availablity,
      d.p92Capacity,
      d.p95Availablity,
      d.p95Capacity,
      d.sdavailablity,
      d.sdcapacity,
      d.shedCode,
      d.shedName,
      d.shedownerupdatetoday
    );
  }
}
