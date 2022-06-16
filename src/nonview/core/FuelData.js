const URL_DATA_ROOT = "https://raw.githubusercontent.com/nuuuwan/fuel_lk/data";

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

export default class FuelData {
  static async multigetExtendedShedList() {
    const url = URL_DATA_ROOT + "/latest/extended_shed_list.json";
    const rawDataList = await jsonNonCache(url);
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
