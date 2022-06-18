export default class IDX {
  static build(arr, fArrItemToKey, fArrItemToValue) {
    let idx = {};
    for (let arrItem of arr) {
      idx[fArrItemToKey(arrItem)] = fArrItemToValue(arrItem);
    }
    return idx;
  }
}
