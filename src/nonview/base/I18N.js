import DICTIONARY from "../../nonview/base/DICTIONARY";

export const BASE_LANG = "en";
const CACHE_KEY_LANG = "CACHE_KEY_LANG";
export const LANG_LIST = ["en", "si", "ta"];
export default class I18N {
  static getCurrentLang() {
    let browserLang = localStorage.getItem(CACHE_KEY_LANG);
    if (!browserLang) {
      browserLang = "en";
      localStorage.setItem(CACHE_KEY_LANG, browserLang);
    }
    return browserLang;
  }

  static setCurrentLang(browserLang) {
    localStorage.setItem(CACHE_KEY_LANG, browserLang);
  }

  static getLangName(lang) {
    return {
      en: "English",
      si: "සිංහල",
      ta: "தமிழ்",
    }[lang];
  }

  static translate(s) {
    const currentLang = I18N.getCurrentLang();
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

export function t(s) {
  return I18N.translate(s);
}
