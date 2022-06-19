import RAW_BASE_SHED_LIST from "../../data/RAW_BASE_SHED_LIST";

const URL_GMAPS_PREFIX = "https://www.google.com/maps/place";

export default class BaseShed {
  constructor(shedID, shedCode, shedName, address, latLng, gmapAddress) {
    this.shedID = shedID;
    this.shedCode = shedCode;
    this.shedName = shedName;
    this.address = address;
    this.latLng = latLng;
    this.gmapAddress = gmapAddress;
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
