export default function nomarlizeNumber(value, min, max) {
  const _value = +value;
  return _value >= min ? (_value <= max ? _value : max) : min;
}
