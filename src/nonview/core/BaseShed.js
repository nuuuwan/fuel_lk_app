import IDX from "../../nonview/base/IDX";
import RAW_BASE_SHED_LIST from "../../nonview/data/RAW_BASE_SHED_LIST";

const URL_GMAPS_PREFIX = "https://www.google.com/maps/place";

export default class BaseShed {
  constructor(
    //
    shedID,
    shedCode,
    shedName,
    shedType,
    address,
    latLng,
    gmapsAddress
  ) {
    this.shedID = shedID;
    this.shedCode = shedCode;
    this.shedName = shedName;
    this.shedType = shedType;
    this.address = address;

    this.latLng = latLng;
    this.gmapsAddress = gmapsAddress;
  }

  get gmapsURL() {
    const [lat, lng] = this.latLng;
    return `${URL_GMAPS_PREFIX}/${lat},${lng}`;
  }

  static fromDict(d) {
    return new BaseShed(
      d["shed_id"],
      d["shed_code"],
      d["shed_name"],
      d["shed_type"],
      d["address"],
      d["lat_lng"],
      d["gmaps_address"]
    );
  }
}

export const BASE_SHED_LIST = RAW_BASE_SHED_LIST.map(function (d) {
  return BaseShed.fromDict(d);
});

export const BASE_SHED_IDX = IDX.build(
  BASE_SHED_LIST,
  (x) => x.shedCode,
  (x) => x
);
