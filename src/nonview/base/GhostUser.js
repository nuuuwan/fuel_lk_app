import axios from "axios";

import Cache from "./Cache";
import Hash from "./Hash";

const URL_GEOLOCATION_DB = "https://geolocation-db.com/json/";
const INFO_Hash_SALT = "adb034fad7a9f45ebc20249cc85eae96";
export const CACHE_KEY_GHOST_USER = "cacheKey:GhostUser";

export default class GhostUser {
  static async getGeoLocationInfo() {
    const res = await axios.get(URL_GEOLOCATION_DB);
    const data = res.data;
    const countryCode = data.country_code;
    const countryName = data.country_name;
    const ipV4 = data.IPv4;
    const latLng = [data.latitude, data.longitude];
    const infoHash = Hash.md5({ countryCode, latLng, ipV4, INFO_Hash_SALT });
    const userID = infoHash;
    return { countryCode, countryName, latLng, ipV4, infoHash, userID };
  }

  static async getInfo() {
    return await Cache.get(CACHE_KEY_GHOST_USER, GhostUser.getGeoLocationInfo);
  }

  static async getUserID() {
    const info = await GhostUser.getInfo();
    return info.userID;
  }
}
