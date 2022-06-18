export default class Cache {
  constructor(cacheKey) {
    this.cacheKey = cacheKey;
  }

  clear() {
    localStorage.setItem(this.cacheKey, "");
  }

  set(item) {
    localStorage.setItem(this.cacheKey, JSON.stringify(item));
  }

  getHot() {
    const hotJSON = localStorage.getItem(this.cacheKey);
    if (Cache.isValidHotItem(hotJSON)) {
      return JSON.parse(hotJSON);
    }
    throw Error("Item not in cache: " + this.cacheKey);
  }

  async get(asyncFallback) {
    try {
      return this.getHot();
    } catch (e) {}

    const cold = await asyncFallback();
    Cache.set(this.cacheKey, cold);
    return cold;
  }

  static isValidHotItem(itemJSON) {
    return (
      itemJSON && itemJSON !== "" && itemJSON !== null && itemJSON !== "null"
    );
  }
}
