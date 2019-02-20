function find(array, val) {
  if (val <= Math.min.apply(null, array)) {
    return 0;
  }

  if (val > Math.max.apply(null, array)) {
    return array.length;
  }

  let idx = 0,
    i = 0,
    j = array.length;

  for (i; i < j; i++) {
    if (array[i] >= val) {
      idx = i;

      break;
    }
  }

  return idx;
}
export default find;
