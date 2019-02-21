import find from './find';

export function getYearIncomeTax(
  income,
  insurance,
  deduction = 0,
  threshold = 5000,
  month = 12
) {
  const yearIncome = +income * month;
  const yearDeduction = +((+insurance + deduction + threshold) * month).toFixed(
    2
  );
  const yearInsurance = +(+insurance * month).toFixed(2);
  const taxableIncome = yearIncome - yearDeduction;
  const aRange = [0, 36000, 144000, 300000, 420000, 660000, 960000];
  const aTaxRate = [0, 3, 10, 20, 25, 30, 35, 45];
  const aQuickDeduction = [0, 0, 2520, 16920, 31920, 52920, 85920, 181920];
  const index = find(aRange, taxableIncome);
  const taxRate = aTaxRate[index];
  const quickDeduction = aQuickDeduction[index];
  const yearTax = +((taxableIncome * taxRate) / 100 - quickDeduction).toFixed(
    2
  );
  const aferTaxIncome = +((+income - +insurance) * month - yearTax).toFixed(2);

  return {
    taxRate,
    quickDeduction,
    yearTax,
    aferTaxIncome,
    yearIncome,
    yearDeduction,
    yearInsurance
  };
}

export function getInsurance(
  insuranceBase,
  providentFundBase,
  checkProvident = true
) {
  return +(
    insuranceBase * 0.11 +
    providentFundBase * 0.12 * Number(checkProvident)
  ).toFixed(2);
}
