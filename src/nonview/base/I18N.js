import DICTIONARY from "../../nonview/base/DICTIONARY";
import IDX from "../../nonview/base/IDX";

export const BASE_LANG = "en";
const CACHE_KEY_LANG = "CACHE_KEY_LANG";

class Lang {
  constructor(lang, label) {
    this.lang = lang;
    this.label = label;
  }
}

export const LANG_LIST = [
  new Lang("en", "English"),
  new Lang("si", "සිංහල"),
  new Lang("ta", "தமிழ்"),
];

export const LANG_IDX = IDX.build(
  LANG_LIST,
  (d) => d.lang,
  (d) => d
);

export default class I18N {
  static getLang() {
    let browserLang = localStorage.getItem(CACHE_KEY_LANG);
    if (!browserLang) {
      browserLang = "en";
      localStorage.setItem(CACHE_KEY_LANG, browserLang);
    }
    return browserLang;
  }

  static setLang(browserLang) {
    localStorage.setItem(CACHE_KEY_LANG, browserLang);
  }

  static translate(s) {
    const currentLang = I18N.getLang();
    if (!s || !s.trim() || currentLang === BASE_LANG) {
      return s;
    }
    const entry = DICTIONARY[s];
    if (!entry) {
      console.warn(`[I18N] ${s}`);
      return s;
    }

    const translation = entry[currentLang];
    if (!translation) {
      console.warn(`[I18N] ${s}`);
      return s;
    }

    return translation;
  }
}

export function t(s, skip = false) {
  if (skip) {
    return s;
  }
  return I18N.translate(s);
}
