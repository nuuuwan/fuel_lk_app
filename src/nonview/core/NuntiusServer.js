import Cache from "../../nonview/base/Cache";
import { SECONDS_IN } from "../../nonview/base/TimeX";
import { JSONWWW } from "../../nonview/base/WWW";

export default class NuntiusServer {
  static getURLLambda() {
    return process.env.REACT_APP_URL_LAMBDA;
  }

  static async generic(payload) {
    const payloadJSON = JSON.stringify(payload);
    const payloadJSONB64 = btoa(payloadJSON);
    const payloadJSONB64Encoded = encodeURIComponent(payloadJSONB64);
    const jsonWWW = new JSONWWW(
      NuntiusServer.getURLLambda() +
        `?payload_json_base64=${payloadJSONB64Encoded}`
    );
    const response = await jsonWWW.readNoCache();
    if (response["exception"]) {
      console.error(response);
    }
    return response;
  }

  // put-message
  static async put(message) {
    NuntiusServer.getCacheMultigetByDestID(message.destID).clear();
    NuntiusServer.getCacheMultigetRecent().clear();

    return await NuntiusServer.generic({
      cmd: "put-message",
      message: message,
    });
  }

  // multiget-messages-by-destid
  static async multigetByDestIDNoCache(destID) {
    return await NuntiusServer.generic({
      cmd: "multiget-messages-by-destid",
      destID: destID,
    });
  }

  static getCacheMultigetByDestID(destID) {
    return new Cache("multigetByDestID:" + destID);
  }

  static async multigetByDestID(destID) {
    const cache = NuntiusServer.getCacheMultigetByDestID(destID);
    return cache.get(async function () {
      return await NuntiusServer.multigetByDestIDNoCache(destID);
    });
  }

  // multiget-messages-recent

  static async multigetRecentNoCache() {
    return await NuntiusServer.generic({
      cmd: "multiget-messages-recent",
      maxTimeElapsed: SECONDS_IN.DAY,
    });
  }

  static getCacheMultigetRecent(destID) {
    return new Cache("multigetRecent");
  }

  static async multigetRecent(destID) {
    const cache = NuntiusServer.getCacheMultigetRecent(destID);
    return cache.get(async function () {
      return await NuntiusServer.multigetRecentNoCache(destID);
    });
  }
}
