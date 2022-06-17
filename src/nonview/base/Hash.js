import md5 from "crypto-js/md5";

export default class Hash {
  static md5(data) {
    return md5(JSON.stringify(data)).toString();
  }
}
