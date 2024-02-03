export default class ViewModel {
  constructor({
      currentNetWorth = '',
      annualInvestmentGrowth = '',
      takeHomeAnnualIncome = '',
      annualIncomeGrowth = '',
      annualExpense = '',
      annualInflation = '',
      years = '',
      estimatedNetWorthSummary = ''} = {}) {
    this.currentNetWorth = currentNetWorth;
    this.annualInvestmentGrowth = annualInvestmentGrowth;
    this.takeHomeAnnualIncome = takeHomeAnnualIncome;
    this.annualIncomeGrowth = annualIncomeGrowth;
    this.annualExpense = annualExpense;
    this.annualInflation = annualInflation;
    this.years = years;
    this.estimatedNetWorthSummary = estimatedNetWorthSummary;
  }

  toString() {
    return [
      "ViewModel {",
      `  currentNetWorth: "${this.currentNetWorth}"`,
      `  annualInvestmentGrowth: "${this.annualInvestmentGrowth}"`,
      `  takeHomeAnnualIncome: "${this.takeHomeAnnualIncome}"`,
      `  annualIncomeGrowth: "${this.annualIncomeGrowth}"`,
      `  annualExpense: "${this.annualExpense}"`,
      `  annualInflation: "${this.annualInflation}"`,
      `  years: "${this.years}"`,
      `  estimatedNetWorthLabel: "${estimatedNetWorthLabel}"`,
      `  estimatedNetWorth: "${estimatedNetWorth}"`,
      "}",
    ].join('\n');
  }
}