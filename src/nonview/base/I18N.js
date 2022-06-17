import DICTIONARY from "../../nonview/base/DICTIONARY";
export const BASE_LANG = "en";

export default class I18N {
  static getCurrentLang() {
    return "si";
  }

  static translate(s) {
    const currentLang = I18N.getCurrentLang();
    const entry = DICTIONARY[s];
    if (!s) {
      console.warning(`[I18N] Not in DICTIONARY: ${s}`);
      return s;
    }

    const translation = entry[currentLang];
    if (!translation) {
      console.warning(`[I18N] No ${currentLang} translation: ${s}`);
      return s;
    }

    return translation;
  }
}

export function t(s) {
  return I18N.translate(s);
}
