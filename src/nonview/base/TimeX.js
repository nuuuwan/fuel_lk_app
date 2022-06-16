export const SECONDS_IN = {
  MINUTE: 60,
  HOUR: 3_600,
  DAY: 86_400,
};

const DATE_FORMAT_LOCALE = "en-GB";
const DATE_FORMAT_OPTIONS = {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export default class TimeX {
  static getUnixTime() {
    return new Date() / 1_000.0;
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
      return "Never";
    }

    const delta = ut - TimeX.getUnixTime();
    const absStr = TimeX.getHumanTimeAbs(delta);
    if (delta > 0) {
      return `In ${absStr} time`;
    }
    return `${absStr} ago`;
  }

  static getHumanTimeAbs(deltaOriginal) {
    const delta = Math.abs(deltaOriginal);
    if (delta < SECONDS_IN.MINUTE * 2) {
      const x = parseInt(delta);
      return x + " seconds";
    }
    if (delta < SECONDS_IN.HOUR * 2) {
      const x = parseInt(delta / SECONDS_IN.MINUTE);
      return x + " minutes";
    }

    if (delta < SECONDS_IN.DAY * 2) {
      const x = parseInt(delta / SECONDS_IN.HOUR);
      return x + " hours";
    }
    const x = parseInt(delta / SECONDS_IN.DAY);
    return x + " days";
  }
}
