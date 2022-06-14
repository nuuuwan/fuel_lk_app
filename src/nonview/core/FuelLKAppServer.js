import FuelInfo from "../../nonview/core/FuelInfo";

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
    console.debug({ url });

    const response = await jsonNonCache(url);
    if (response["exception"]) {
      console.error(response);
    }
    return response;
  }

  static async multiGetFuelInfoList(province, district, fuelType) {
    const payload = {
      cmd: "search",
      province,
      district,
      fuel_type: fuelType,
    };
    const rawFuelInfoList = await FuelLKAppServer.genericRequest(payload);
    return rawFuelInfoList.map(function (rawFuelInfo) {
      return new FuelInfo(rawFuelInfo);
    });
  }
}
