import find from './find';
import { INSURANCE } from '../constant';

export function getIncomeTax(
  income,
  insurance,
  month = 12,
  deduction = 0,
  threshold = 5000
) {
  const totalIncome = +income * month;
  const totalDeduction = +(
    (+insurance + deduction + threshold) *
    month
  ).toFixed(2);
  const totalInsurance = +(+insurance * month).toFixed(2);
  const taxableIncome = totalIncome - totalDeduction;
  const aRange = [0, 36000, 144000, 300000, 420000, 660000, 960000];
  const aTaxRate = [0, 3, 10, 20, 25, 30, 35, 45];
  const aQuickDeduction = [0, 0, 2520, 16920, 31920, 52920, 85920, 181920];
  const index = find(aRange, taxableIncome);
  const taxRate = aTaxRate[index];
  const quickDeduction = aQuickDeduction[index];
  const tax = +((taxableIncome * taxRate) / 100 - quickDeduction).toFixed(2);
  const afterTax = +((+income - +insurance) * month - tax).toFixed(2);

  return {
    taxRate,
    quickDeduction,
    tax,
    afterTax,
    income: totalIncome,
    totalDeduction,
    totalInsurance
  };
}

export function getInsurance(iBase, hACBase, index, checkProvident = true) {
  if (iBase < INSURANCE[index].minMIBase) {
    return +(
      iBase * (INSURANCE[index].tIRates[0] - INSURANCE[index].mIRates[0]) +
      INSURANCE[index].minMIBase * INSURANCE[index].mIRates[0] +
      INSURANCE[index].addMI +
      hACBase * INSURANCE[index].hACRates[0] * Number(checkProvident)
    ).toFixed(2);
  }
  return +(
    iBase * INSURANCE[index].tIRates[0] +
    INSURANCE[index].addMI +
    hACBase * INSURANCE[index].hACRates[0] * Number(checkProvident)
  ).toFixed(2);
}

export function getBonusTax(bonus, forward = true) {
  const aRange = [0, 3000, 12000, 25000, 35000, 55000, 80000];
  const aTaxRate = [0, 3, 10, 20, 25, 30, 35, 45];
  const aQuickDeduction = [0, 0, 210, 1410, 2660, 4410, 7160, 15160];
  if (forward) {
    const bonusPerMonth = bonus / 12;
    const index = find(aRange, bonusPerMonth);
    const taxRate = aTaxRate[index];
    const quickDeduction = aQuickDeduction[index];
    const tax = +((bonus * taxRate) / 100 - quickDeduction).toFixed(2);
    const afterTax = bonus - tax;
    return {
      tax,
      income: bonus,
      taxRate,
      quickDeduction,
      afterTax
    };
  } else {
    let i = 0,
      idx = 0,
      j = aTaxRate.length,
      tax,
      income,
      taxRate,
      quickDeduction;
    for (i; i < j; i++) {
      const beforeTax = +(
        (bonus - aQuickDeduction[i]) /
        (1 - aTaxRate[i] / 100) /
        12
      ).toFixed(2);
      const index = find(aRange, beforeTax);
      if (index === i) {
        idx = i;
        break;
      }
    }
    taxRate = aTaxRate[idx];
    quickDeduction = aQuickDeduction[idx];
    income = +((bonus - quickDeduction) / (1 - taxRate / 100)).toFixed(2);
    tax = +(income - bonus).toFixed(2);
    return {
      taxRate,
      quickDeduction,
      afterTax: bonus,
      income,
      tax
    };
  }
}
