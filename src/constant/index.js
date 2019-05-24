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
    IBases: [3387, 25401],
    MIBases: [5080, 25401],
    EIBases: [3387, 25401],
    UIBases: [3387, 25401],
    CIBase: [5080, 25401],
    WIIBase: [5080, 25401],
    HACBases: [2409, 25401],
    addMI: 3, // 大病
    HACRates: [0.12, 0.12],
    EIRates: [0.08, 0.19],
    MIRates: [0.02, 0.1],
    UIRates: [0.002, 0.008],
    WIIRates: [0, 0.004],
    CIRates: [0, 0.008]
  },
  {
    city: '杭州',
    IBases: [3054.95, 15274.74],
    MIBases: [3054.95, 15274.74],
    EIBases: [3054.95, 15274.74],
    UIBases: [3054.95, 15274.74],
    CIBase: [3054.95, 15274.74],
    WIIBase: [3054.95, 15274.74],
    HACBases: [2010, 24311],
    addMI: 0, // 大病
    HACRates: [0.12, 0.12],
    EIRates: [0.08, 0.19],
    MIRates: [0.02, 0.1],
    UIRates: [0.005, 0.005],
    WIIRates: [0, 0.004],
    CIRates: [0, 0.012]
  },
  {
    city: '上海',
    IBases: [4279, 21396],
    MIBases: [4279, 21396],
    EIBases: [4279, 21396],
    UIBases: [4279, 21396],
    CIBase: [4279, 21396],
    WIIBase: [4279, 21396],
    HACBases: [2300, 21400],
    addMI: 0, // 大病
    HACRates: [0.07, 0.07],
    EIRates: [0.08, 0.2],
    MIRates: [0.02, 0.095],
    UIRates: [0.005, 0.005],
    WIIRates: [0, 0.004],
    CIRates: [0, 0.01]
  },
  {
    city: '广州',
    IBases: [2100, 24654], // 社保基数
    MIBases: [4931, 24654], // 医保基数
    EIBases: [3469, 20004], // 养老基数
    UIBases: [2100, 24654], // 失业险基数
    HACBases: [2100, 24654], // 公积金基数
    addMI: 0, // 大病
    HACRates: [0.07, 0.07],
    EIRates: [0.08, 0.14],
    MIRates: [0.02, 0.07],
    UIRates: [0.002, 0.0064]
  },
  {
    city: '深圳',
    IBases: [2200, 25044],
    MIBases: [5008.8, 25044],
    EIBases: [2200, 25044],
    UIBases: [2200, 2200],
    CIBase: [2200, 25044],
    WIIBase: [2200, 25044],
    HACBases: [2130, 25044],
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
    IBases: [3279, 16394], // 社保基数
    MIBases: [3279, 16394], // 医保基数
    EIBases: [3279, 16394], // 养老基数
    UIBases: [3279, 16394], // 失业险基数
    CIBase: [3279, 16394], // 生育险基数
    WIIBase: [3279, 16394], // 工伤险基数
    HACBases: [2010, 24420], // 公积金基数
    addMI: 0, // 大病
    HACRates: [0.08, 0.08],
    EIRates: [0.08, 0.14],
    MIRates: [0.02, 0.09],
    UIRates: [0.005, 0.005],
    WIIRates: [0, 0.0014],
    CIRates: [0, 0.007]
  },
  {
    city: '苏州',
    IBases: [3030, 21963], // 社保基数
    MIBases: [3030, 21963], // 医保基数
    EIBases: [3030, 21963], // 养老基数
    UIBases: [3030, 21963], // 失业险基数
    HACBases: [3030, 21900], // 公积金基数
    addMI: 5, // 大病
    HACRates: [0.08, 0.08],
    EIRates: [0.08, 0.19],
    MIRates: [0.02, 0.09],
    UIRates: [0.005, 0.005]
  },
  {
    city: '无锡',
    IBases: [3030, 19935], // 社保基数
    MIBases: [3030, 19935], // 医保基数
    EIBases: [3030, 19935], // 养老基数
    UIBases: [3030, 19935], // 失业险基数
    HACBases: [1890, 21250], // 公积金基数
    addMI: 0, // 大病
    HACRates: [0.08, 0.08],
    EIRates: [0.08, 0.19],
    MIRates: [0.02, 0.079],
    UIRates: [0.005, 0.005]
  },
  {
    city: '西安',
    IBases: [3371, 19443], // 社保基数
    MIBases: [3889, 19443], // 医保基数
    EIBases: [3371, 16857], // 养老基数
    UIBases: [3889, 19443], // 失业险基数
    HACBases: [1680, 19443], // 公积金基数
    addMI: 1.6, // 大病
    HACRates: [0.1, 0.1],
    EIRates: [0.08, 0.19],
    MIRates: [0.02, 0.079],
    UIRates: [0.003, 0.007]
  },
  {
    city: '成都',
    IBases: [2338, 17908], // 社保基数
    MIBases: [3255, 16274], // 医保基数
    EIBases: [2388, 17908], // 养老基数
    UIBases: [3255, 16274], // 失业险基数
    HACBases: [1500, 22302], // 公积金基数
    addMI: 0, // 大病
    HACRates: [0.06, 0.06],
    EIRates: [0.08, 0.19],
    MIRates: [0.02, 0.065],
    UIRates: [0.004, 0.006]
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
  '成都'
];
