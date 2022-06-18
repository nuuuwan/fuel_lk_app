import { JSONWWW } from "../../nonview/base/WWW";
import Cache from "../../nonview/base/Cache"

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

  static async putMessage(message) {
    const cache = NuntiusServer.multigetMessagesCache(message.destID);
    cache.clear();

    return await NuntiusServer.generic({
      cmd: "put-message",
      message: message,
    });
  }

  static async multigetMessagesNoCache(destID) {
    return await NuntiusServer.generic({
      cmd: "multiget-messages",
      destID: destID,
    });
  }

  static multigetMessagesCache(destID) {
    return new Cache("multigetMessages:" + destID);
  }

  static async multigetMessages(destID) {
    const cache = NuntiusServer.multigetMessagesCache(destID);
    return cache.get(
      async function() {
        return await NuntiusServer.multigetMessagesNoCache(destID);
      }
    );
  }
}
