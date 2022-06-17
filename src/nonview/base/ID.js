import { MathX, DataStructures } from "@nuuuwan/utils-js-dev";

const BASE = 16;
const N_TOTAL_DIGITS = 32;
const N_SEGMENTS = 8;
const N_DIGITS = N_TOTAL_DIGITS / N_SEGMENTS;

export default class ID {
  static getRandomID() {
    return DataStructures.range(0, N_SEGMENTS)
      .map((i) => ID.getRandomIDSegment(N_DIGITS))
      .join("");
  }
  static getRandomIDSegment(nDigits) {
    const minValue = Math.pow(BASE, nDigits - 1);
    const maxValue = Math.pow(BASE, nDigits);
    const value = MathX.randomInt(minValue, maxValue);
    return value.toString(BASE);
  }
}
