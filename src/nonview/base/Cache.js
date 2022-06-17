export default class Cache {
  static isValidHotItem(hotItem) {
    return hotItem && hotItem !== "" && hotItem !== null && hotItem !== "null";
  }

  static async get(cacheKey, asyncFallback) {
    const hotItem = localStorage.getItem(cacheKey);
    if (Cache.isValidHotItem(hotItem)) {
      return JSON.parse(hotItem);
    }

    const coldItem = await asyncFallback();
    Cache.set(cacheKey, coldItem);
    return coldItem;
  }

  static set(cacheKey, item) {
    localStorage.setItem(cacheKey, JSON.stringify(item));
  }

  static clear(cacheKey) {
    localStorage.setItem(cacheKey, "");
  }
}
