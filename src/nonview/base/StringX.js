export default class StringX {
  static toTitleCase(s) {
    s = s.replaceAll('.', '. ').replaceAll('  ', ' ');
    return s.replace(/\w\S*/g, function (s1) {
      return s1.charAt(0).toUpperCase() + s1.substr(1).toLowerCase();
    });
  }
}
