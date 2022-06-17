import { jsonNonCache } from "../../nonview/base/CacheX";

export default class NuntiusServer {
  static getRandomID() {
    const DIGITS = 8;
    const x = Math.random() * 16 ** DIGITS;
    return x.toString(16);
  }

  static getURLLambda() {
    return process.env.REACT_APP_URL_LAMBDA;
  }

  static async generic(payload) {
    const payloadJSON = JSON.stringify(payload);
    const payloadJSONB64 = btoa(payloadJSON);
    const payloadJSONB64Encoded = encodeURIComponent(payloadJSONB64);
    const url =
      NuntiusServer.getURLLambda() +
      "?payload_json_base64=" +
      payloadJSONB64Encoded;
    const response = await jsonNonCache(url);
    if (response["exception"]) {
      console.error(response);
    }
    return response;
  }

  static async putMessage(message) {
    return await NuntiusServer.generic({
      cmd: "put-message",
      message: message,
    });
  }
  static async multigetMessages(destID) {
    return await NuntiusServer.generic({
      cmd: "multiget-messages",
      destID: destID,
    });
  }
}
