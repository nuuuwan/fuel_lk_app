const DELIM_CONTEXT_ITEM = "&";
const DELIM_KV = "=";
export default class URLContext {
  static getURL() {
    return window.location.href;
  }
  static setURL(url) {
    window.history.pushState("", "", url);
  }

  static contextToStr(context) {
    return Object.entries(context)
      .map(function (kv) {
        return kv.join(DELIM_KV);
      })
      .join(DELIM_CONTEXT_ITEM);
  }

  static strToContext(contextStr) {
    return contextStr
      .split(DELIM_CONTEXT_ITEM)
      .map(function (kvStr) {
        return kvStr.split(DELIM_KV);
      })
      .reduce(function (context, [k, v]) {
        context[k] = v;
        return context;
      }, {});
  }

  static contextToURL(context) {
    const origin = window.location.origin;
    let urlBase = origin + process.env.PUBLIC_URL; // TODO: Is origin needed?
    return urlBase + "#" + URLContext.contextToStr(context);
  }

  static urlToContext(url) {
    const urlTokens = url.split("#");
    if (urlTokens.length !== 2) {
      return {};
    }
    const contextStr = urlTokens[1];
    return URLContext.strToContext(contextStr);
  }

  static setContext(context) {
    const url = URLContext.contextToURL(context);
    URLContext.setURL(url);
  }

  static getContext() {
    const url = URLContext.getURL();
    return URLContext.urlToContext(url);
  }
}
