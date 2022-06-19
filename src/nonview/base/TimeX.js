import { t } from "../../nonview/base/I18N";

export const SECONDS_IN = {
  MINUTE: 60,
  HOUR: 3_600,
  DAY: 86_400,
};

export const HOURS_IN = {
  DAY: 24,
  YEAR: 24 * 365.25,
};

const DATE_FORMAT_LOCALE = "en-GB";
const DATE_FORMAT_OPTIONS = {
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export default class TimeX {
  static getUnixTime() {
    return parseInt(new Date() / 1_000.0);
  }

  static parseTime(timeStr) {
    return new Date(timeStr) / 1_000.0;
  }

  static formatTime(ut) {
    if (ut < SECONDS_IN.DAY) {
      return "";
    }

    return new Date(ut * 1_000.0).toLocaleString(
      DATE_FORMAT_LOCALE,
      DATE_FORMAT_OPTIONS
    );
  }

  static getHumanTime(ut) {
    if (ut < SECONDS_IN.DAY) {
      return t("Never");
    }

    const delta = ut - TimeX.getUnixTime();
    const absStr = TimeX.getHumanTimeAbs(delta);
    if (delta > 0) {
      return `${t("In")} ${absStr}`;
    }
    return `${absStr} ${t("ago")}`;
  }

  static getHumanTimeAbs(deltaOriginal) {
    const delta = Math.abs(deltaOriginal);
    if (delta < SECONDS_IN.MINUTE * 2) {
      return "Now";
    }
    if (delta < SECONDS_IN.HOUR * 2) {
      const x = parseInt(delta / SECONDS_IN.MINUTE);
      return x + ` ${t("minutes")}`;
    }

    if (delta < SECONDS_IN.DAY * 2) {
      const x = parseInt(delta / SECONDS_IN.HOUR);
      return x + ` ${t("hours")}`;
    }
    const x = parseInt(delta / SECONDS_IN.DAY);
    return x + ` ${t("days")}`;
  }
}
