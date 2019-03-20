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
    minIBase: 3387, // 最低社保基数
    maxIBase: 25401, // 最高社保基数
    minHACBase: 2409, // 最低公积金基数
    maxHACBase: 25401, // 最高公积金基数
    minMIBase: 5080, // 最低医保基数
    minEIBase: 3387, //最低养老保险
    minUIBase: 3387,
    minWIIBase: 5080,
    minCIBase: 5080,
    addMI: 3, // 大病
    hACRates: [0.12, 0.12], // 公积金比例,
    eIRates: [0.08, 0.19], // 养老金缴纳比例
    mIRates: [0.02, 0.1], // 医保缴纳比例
    uIRates: [0.002, 0.008], // 失业险比例
    wIIRates: [0, 0.004], // 工伤险比例
    cIRates: [0, 0.008], // 生育险
    tIRates: [0.102, 0.31]
  },
  {
    city: '杭州',
    minIBase: 3054.95, // 最低社保基数
    maxIBase: 15274.74, // 最高社保基数
    minHACBase: 2010, // 最低公积金基数
    maxHACBase: 24311, // 最高公积金基数
    minMIBase: 3054.95, // 最低医保基数
    minEIBase: 3054.95, //最低养老保险
    minUIBase: 3054.95,
    minWIIBase: 3054.95,
    minCIBase: 3054.95,
    addMI: 0, // 医保附加
    hACRates: [0.12, 0.12], // 公积金比例,
    eIRates: [0.08, 0.14], // 养老金缴纳比例
    mIRates: [0.02, 0.105], // 医保缴纳比例
    uIRates: [0.005, 0.005], // 失业险比例
    wIIRates: [0, 0.004], // 工伤险比例
    cIRates: [0, 0.012], // 生育险
    tIRates: [0.105, 0.266]
  },
  {
    city: '上海',
    minIBase: 4279, // 最低社保基数
    maxIBase: 21396, // 最高社保基数
    minHACBase: 2300, // 最低公积金基数
    maxHACBase: 21400, // 最高公积金基数
    minMIBase: 4279, // 最低医保基数
    minEIBase: 4279, //最低养老保险
    minUIBase: 4279,
    minWIIBase: 4279,
    minCIBase: 4279,
    addMI: 0, // 医保附加
    hACRates: [0.07, 0.07], // 公积金比例,
    eIRates: [0.08, 0.2], // 养老金缴纳比例
    mIRates: [0.02, 0.095], // 医保缴纳比例
    uIRates: [0.005, 0.005], // 失业险比例
    wIIRates: [0, 0.005], // 工伤险比例
    cIRates: [0, 0.01], // 生育险
    tIRates: [0.105, 0.312]
  },
  {
    city: '深圳',
    minIBase: 2200, // 最低社保基数
    maxIBase: 25044, // 最高社保基数
    minHACBase: 2130, // 最低公积金基数
    maxHACBase: 25044, // 最高公积金基数
    minMIBase: 5009, // 最低医保基数
    minEIBase: 2200, //最低养老保险
    minUIBase: 2200,
    minWIIBase: 2200,
    minCIBase: 200,
    addMI: 0, // 医保附加
    hACRates: [0.05, 0.05], // 公积金比例,
    eIRates: [0.08, 0.2], // 养老金缴纳比例
    mIRates: [0.02, 0.095], // 医保缴纳比例
    uIRates: [0.003, 0.007], // 失业险比例
    wIIRates: [0, 0.0014], // 工伤险比例
    cIRates: [0, 0.0045], // 生育险
    tIRates: [0.103, 0.3079]
  },
  {
    city: '宁波',
    minIBase: 3279, // 最低社保基数
    maxIBase: 16394, // 最高社保基数
    minHACBase: 2010, // 最低公积金基数
    maxHACBase: 24420, // 最高公积金基数
    minMIBase: 3279, // 最低医保基数
    minEIBase: 3279, //最低养老保险
    minUIBase: 3279,
    minWIIBase: 3279,
    minCIBase: 3279,
    addMI: 0, // 医保附加
    hACRates: [0.08, 0.08], // 公积金比例,
    eIRates: [0.08, 0.14], // 养老金缴纳比例
    mIRates: [0.02, 0.09], // 医保缴纳比例
    uIRates: [0.005, 0.005], // 失业险比例
    wIIRates: [0, 0], // 工伤险比例
    cIRates: [0, 0.007], // 生育险
    tIRates: [0.105, 0.242]
  },
  {
    city: '苏州',
    minIBase: 3030, // 最低社保基数
    maxIBase: 21963, // 最高社保基数
    minHACBase: 3030, // 最低公积金基数
    maxHACBase: 21900, // 最高公积金基数
    minMIBase: 3030, // 最低医保基数
    minEIBase: 3030, //最低养老保险
    minUIBase: 3030,
    minWIIBase: 3030,
    minCIBase: 3030,
    addMI: 5, // 医保附加
    hACRates: [0.08, 0.08], // 公积金比例,
    eIRates: [0.08, 0.19], // 养老金缴纳比例
    mIRates: [0.02, 0.09], // 医保缴纳比例
    uIRates: [0.005, 0.005], // 失业险比例
    wIIRates: [0, 0.015], // 工伤险比例
    cIRates: [0, 0.008], // 生育险
    tIRates: [0.105, 0.308]
  },
  {
    city: '无锡',
    minIBase: 3030, // 最低社保基数
    maxIBase: 19935, // 最高社保基数
    minHACBase: 1890, // 最低公积金基数
    maxHACBase: 21250, // 最高公积金基数
    minMIBase: 3030, // 最低医保基数
    minEIBase: 3030, //最低养老保险
    minUIBase: 3030,
    minWIIBase: 3030,
    minCIBase: 3030,
    addMI: 0, // 医保附加
    hACRates: [0.08, 0.08], // 公积金比例,
    eIRates: [0.08, 0.19], // 养老金缴纳比例
    mIRates: [0.02, 0.079], // 医保缴纳比例
    uIRates: [0.005, 0.005], // 失业险比例
    wIIRates: [0, 0.015], // 工伤险比例
    cIRates: [0, 0.008], // 生育险
    tIRates: [0.105, 0.297]
  }
];

export const CITYS = ['北京', '杭州', '上海', '深圳', '宁波', '苏州', '无锡'];
