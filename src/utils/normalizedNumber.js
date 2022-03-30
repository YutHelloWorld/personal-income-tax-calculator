export default function normalizedNumber(value, interval) {
  const _value = +value;
  const min = interval[0];
  const max = interval[1];
  return _value >= min ? (_value <= max ? _value : max) : min;
}
