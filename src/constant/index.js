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

export const HAC_RATE = [
  [0.05, '5%'],
  [0.06, '6%'],
  [0.07, '7%'],
  [0.08, '8%'],
  [0.09, '9%'],
  [0.1, '10%'],
  [0.11, '11%'],
  [0.12, '12%']
];
/**
 *  endowment insurance（养老保险) EI
 *  medical insurance（医疗保险） MI
 *  unemployment insurance（失业保险） UI
 *  work-related injury insurance（工伤保险） WII
 *  childbirth insurance（生育保险） CI
 *  housing accumulation funds（住房公积金） HAC
 */
export const INSURANCE = [
  {
    city: '北京',
    IBases: [3613, 27786],
    MIBases: [5557, 27786],
    EIBases: [3613, 23565],
    UIBases: [3613, 23565],
    CIBase: [5557, 27786],
    WIIBase: [4713, 23565],
    HACBases: [2200, 27786],
    addMI: 3, // 大病
    HACRates: [0.12, 0.12],
    EIRates: [0.08, 0.16],
    MIRates: [0.02, 0.1],
    UIRates: [0.002, 0.008],
    WIIRates: [0, 0.004],
    CIRates: [0, 0.008]
  },
  {
    city: '杭州',
    IBases: [3321.6, 16608],
    MIBases: [3321.6, 16608],
    EIBases: [3321.6, 16608],
    UIBases: [3321.6, 16608],
    CIBase: [3321.6, 16608],
    WIIBase: [3321.6, 16608],
    HACBases: [2010, 25950],
    addMI: 0, // 大病
    HACRates: [0.12, 0.12],
    EIRates: [0.08, 0.14],
    MIRates: [0.02, 0.105],
    UIRates: [0.005, 0.005],
    WIIRates: [0, 0.002],
    CIRates: [0, 0.012]
  },
  {
    city: '上海',
    IBases: [4699, 23496],
    MIBases: [4699, 23496],
    EIBases: [4699, 23496],
    UIBases: [4699, 23496],
    CIBase: [4699, 23496],
    WIIBase: [4699, 23496],
    HACBases: [2420, 23496],
    addMI: 0, // 大病
    HACRates: [0.07, 0.07],
    EIRates: [0.08, 0.2],
    MIRates: [0.02, 0.095],
    UIRates: [0.005, 0.005],
    WIIRates: [0, 0.001],
    CIRates: [0, 0.01]
  },
  {
    city: '广州',
    IBases: [2100, 27960], // 社保基数
    MIBases: [5592, 27960], // 医保基数
    EIBases: [3803, 19014], // 养老基数
    UIBases: [2100, 27960], // 失业险基数
    HACBases: [2100, 27960], // 公积金基数
    addMI: 0, // 大病
    HACRates: [0.07, 0.07],
    EIRates: [0.08, 0.14],
    MIRates: [0.02, 0.055],
    UIRates: [0.002, 0.0064]
  },
  {
    city: '深圳',
    IBases: [2200, 27927],
    MIBases: [5585, 27927],
    EIBases: [2200, 19014],
    UIBases: [2200, 2200],
    CIBase: [2200, 27927],
    WIIBase: [2200, 19014],
    HACBases: [2200, 27927],
    addMI: 0, // 大病
    HACRates: [0.05, 0.05],
    EIRates: [0.08, 0.14],
    MIRates: [0.02, 0.062],
    UIRates: [0.003, 0.007],
    WIIRates: [0, 0.0014],
    CIRates: [0, 0.0045]
  },
  {
    city: '宁波',
    IBases: [3539, 17694], // 社保基数
    MIBases: [3539, 17694], // 医保基数
    EIBases: [3539, 17694], // 养老基数
    UIBases: [3539, 17694], // 失业险基数
    CIBase: [3539, 17694], // 生育险基数
    WIIBase: [3539, 17694], // 工伤险基数
    HACBases: [2010, 27237], // 公积金基数
    addMI: 0, // 大病
    HACRates: [0.08, 0.08],
    EIRates: [0.08, 0.14],
    MIRates: [0.02, 0.08],
    UIRates: [0.005, 0.005],
    WIIRates: [0, 0.0014],
    CIRates: [0, 0.0067]
  },
  {
    city: '苏州',
    IBases: [3368, 16842], // 社保基数
    MIBases: [3368, 16842], // 医保基数
    EIBases: [3368, 16842], // 养老基数
    UIBases: [3368, 16842], // 失业险基数
    HACBases: [3030, 23700], // 公积金基数
    addMI: 5, // 大病
    HACRates: [0.08, 0.08],
    EIRates: [0.08, 0.16],
    MIRates: [0.02, 0.07],
    UIRates: [0.005, 0.005]
  },
  {
    city: '无锡',
    IBases: [2788, 18171], // 社保基数
    MIBases: [2788, 18171], // 医保基数
    EIBases: [2788, 18171], // 养老基数
    UIBases: [2788, 18171], // 失业险基数
    HACBases: [2020, 23100], // 公积金基数
    addMI: 0, // 大病
    HACRates: [0.08, 0.08],
    EIRates: [0.08, 0.19],
    MIRates: [0.02, 0.079],
    UIRates: [0.005, 0.005]
  },
  {
    city: '西安',
    IBases: [3121, 20955], // 社保基数
    MIBases: [4191, 20955], // 医保基数
    EIBases: [3121, 15603], // 养老基数
    UIBases: [4191, 20955], // 失业险基数
    HACBases: [1800, 20955], // 公积金基数
    addMI: 1.6, // 大病
    HACRates: [0.1, 0.1],
    EIRates: [0.08, 0.16],
    MIRates: [0.02, 0.07],
    UIRates: [0.003, 0.007]
  },
  {
    city: '成都',
    IBases: [2697, 16179], // 社保基数
    MIBases: [3236, 16179], // 医保基数
    EIBases: [2697, 16179], // 养老基数
    UIBases: [3236, 16179], // 失业险基数
    HACBases: [1780, 21498], // 公积金基数
    addMI: 0, // 大病
    HACRates: [0.06, 0.06],
    EIRates: [0.08, 0.16],
    MIRates: [0.02, 0.065],
    UIRates: [0.004, 0.006]
  },
  {
    city: '南京',
    IBases: [3368, 16842], // 社保基数
    MIBases: [3368, 16842], // 医保基数
    EIBases: [3368, 16842], // 养老基数
    UIBases: [3368, 16842], // 失业险基数
    HACBases: [2020, 27700], // 公积金基数
    addMI: 0, // 大病
    HACRates: [0.06, 0.06],
    EIRates: [0.08, 0.16],
    MIRates: [0.02, 0.09],
    UIRates: [0.005, 0.005]
  }
];

export const CITYS = [
  '北京',
  '杭州',
  '上海',
  '广州',
  '深圳',
  '宁波',
  '苏州',
  '无锡',
  '西安',
  '成都',
  '南京'
];
