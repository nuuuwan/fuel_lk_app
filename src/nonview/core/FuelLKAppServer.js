import Shed from "../../nonview/core/Shed";
import ShedBasic from "../../nonview/core/ShedBasic";

const JSON_HEADERS = {
  headers: {
    Accept: "application/json",
  },
};

async function jsonNonCache(url) {
  const response = await fetch(url, JSON_HEADERS);
  const dataJson = await response.json();
  return dataJson;
}

export default class FuelLKAppServer {
  static getURLLambda() {
    return process.env.REACT_APP_URL_LAMBDA;
  }

  static async genericRequest(payload) {
    const payloadJSON = JSON.stringify(payload);
    const payloadJSONB64 = btoa(payloadJSON);
    const payloadJSONB64Encoded = encodeURIComponent(payloadJSONB64);
    const url =
      FuelLKAppServer.getURLLambda() +
      "?payload_json_base64=" +
      payloadJSONB64Encoded;

    const response = await jsonNonCache(url);
    if (response["exception"]) {
      console.error(response);
    }
    return response;
  }

  static async getShed(shedID) {
    const payload = {
      cmd: "get_shed",
      shed_id: shedID,
    };
    const rawShed = await FuelLKAppServer.genericRequest(payload);
    return Shed.fromDict(rawShed);
  }

  static async multigetShedBasics(province, district, fuelType) {
    const payload = {
      cmd: "multiget_sheds",
      province,
      district,
      fuel_type: fuelType,
    };
    const rawShedBasics = await FuelLKAppServer.genericRequest(payload);
    const unsortedShedBasics = rawShedBasics.map(function (rawShedBasic) {
      return ShedBasic.fromDict(rawShedBasic);
    });
    return unsortedShedBasics.sort(function (shedA, shedB) {
      return shedB.lastUpdateByShedUT - shedA.lastUpdateByShedUT;
    });
  }
}
