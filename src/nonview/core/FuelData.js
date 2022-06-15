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
  static async multigetShedStatusList() {
    const url = URL_DATA_ROOT + "/latest/shed_status_list.all.json";
    return await jsonNonCache(url);
  }
}
