/* Source: https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?end=2024&locations=DE&start=1960&view=chart */
const years = [2021, 2022, 2023, 2024];

const germanyInflationData = [
  3.06666666666673, 6.87257438551097, 5.94643667725823, 2.2564981433876,
];

const ukInflationRate = [
  2.51837109614213, 7.92204883147902, 6.79396706793963, 3.2715729463592,
];

const franceInflationRate = [0.1, 5, 4.87835726508441, 1.99904942291463];

export const inflationData = years.map((year, index) => ({
  year,
  rateDE: germanyInflationData[index],
  rateUK: ukInflationRate[index],
  rateFR: franceInflationRate[index],
}));
