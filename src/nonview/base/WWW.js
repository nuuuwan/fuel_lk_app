import Cache from "../../nonview/base/Cache";
const JSON_HEADERS = {
  headers: {
    Accept: "application/json",
  },
};

export default class WWW {
  constructor(url) {
    this.url = url;
  }
}

export class JSONWWW extends WWW {
  async readNoCache() {
    const response = await fetch(this.url, JSON_HEADERS);
    const data = await response.json();
    return data;
  }

  async read() {
    const cacheKey = "cache-" + this.url;
    const cache = new Cache(cacheKey);
    return await cache.get(cacheKey, this.readNoCache);
  }
}
