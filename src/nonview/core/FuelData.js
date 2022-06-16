const URL_DATA_ROOT = "https://raw.githubusercontent.com/nuuuwan/fuel_lk/data";

const JSON_HEADERS = {
  headers: {
    Accept: "application/json",
  },
};

async function jsonNonCache(url) {
  const response = await fetch(url, JSON_HEADERS);
  const data = await response.json();
  return data;
}

async function jsonCache(url) {
  const cacheKey = "cache-" + url;
  const dataJSON = localStorage.getItem(cacheKey);
  if (dataJSON && dataJSON !== "" && dataJSON !== "null") {
    const data = JSON.parse(dataJSON);
    return data;
  }

  const dataHot = await jsonNonCache(url);
  const dataJSONHot = JSON.stringify(dataHot);
  localStorage.setItem(cacheKey, dataJSONHot);
  return dataHot;
}

export default class FuelData {
  static async multigetExtendedShedList() {
    const url = URL_DATA_ROOT + "/latest/extended_shed_list.json";
    const rawDataList = await jsonCache(url);
    return rawDataList.sort(function (a, b) {
      const ta = a["time_last_updated_by_shed_ut"];
      const tb = b["time_last_updated_by_shed_ut"];

      if (ta && tb) {
        return ta - tb;
      }
      return a["shed_id"] - b["shed_id"];
    });
  }
}
