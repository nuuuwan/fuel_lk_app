export default class Copy {
  static deepCopy(x) {
    return JSON.parse(JSON.stringify(x));
  }
}
