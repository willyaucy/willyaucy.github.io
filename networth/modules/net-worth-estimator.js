export function estimateNetWorth(
    netWorth,
    annualInvestmentGrowth,
    takeHomeAnnualIncome,
    annualIncomeGrowth,
    annualExpense,
    annualInflation,
    years) {
  const estimates =
      estimateNetWorthByYear(
          netWorth,
          annualInvestmentGrowth,
          takeHomeAnnualIncome,
          annualIncomeGrowth,
          annualExpense,
          annualInflation,
          years);
  return estimates[estimates.length - 1];
}

export function estimateNetWorthByYear(
    netWorth,
    annualInvestmentGrowth,
    takeHomeAnnualIncome,
    annualIncomeGrowth,
    annualExpense,
    annualInflation,
    years) {

  if (years < 0) {
    throw new Error("Wat 7 u say?");
  }

  const estimatesByYear = [];

  for (
      let runningNetWorth = netWorth,
          runningTakeHomeAnnualIncome = takeHomeAnnualIncome,
          runningAnnualExpense = annualExpense,
          runningYears = years;
      runningYears >= 0;
      runningNetWorth =
          runningNetWorth * (1 + annualInvestmentGrowth)
              + runningTakeHomeAnnualIncome
              - runningAnnualExpense,
      runningTakeHomeAnnualIncome = runningTakeHomeAnnualIncome * (1 + annualIncomeGrowth),
      runningAnnualExpense = runningAnnualExpense * (1 + annualInflation),
      runningYears = runningYears - 1) {
    estimatesByYear.push(runningNetWorth);
  }

  return estimatesByYear;
}