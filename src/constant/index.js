let id = 0;
function createData(minIncome, maxIncome, taxRate, deduction) {
  id += 1;
  let income;
  if (!minIncome) {
    income = `超过${maxIncome},000的部分`;
  } else if (!maxIncome) {
    income = `不超过${minIncome},000的部分`;
  } else {
    income = `超过${minIncome},000至${maxIncome},000的部分`;
  }
  return { id, income, taxRate, deduction };
}

export const RANGE = [
  createData(36, 0, 3, 0),
  createData(36, 144, 10, 2520),
  createData(144, 300, 20, 16920),
  createData(300, 420, 25, 31920),
  createData(420, 660, 30, 52920),
  createData(660, 960, 35, 85920),
  createData(0, 960, 45, 181920)
];

export const MONTH_RANGE = [
  createData(3, 0, 3, 0),
  createData(3, 12, 10, 210),
  createData(12, 25, 20, 1410),
  createData(25, 35, 25, 2660),
  createData(35, 55, 30, 4410),
  createData(55, 80, 35, 7160),
  createData(0, 80, 45, 15160)
];
