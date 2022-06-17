const JSON_HEADERS = {
  headers: {
    Accept: "application/json",
  },
};

export async function jsonNonCache(url) {
  const response = await fetch(url, JSON_HEADERS);
  const data = await response.json();
  return data;
}

export async function jsonCache(url) {
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
