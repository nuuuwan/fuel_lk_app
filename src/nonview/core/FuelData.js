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
    return await jsonNonCache(url);
  }
}
