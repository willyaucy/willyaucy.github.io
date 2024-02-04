import { estimateNetWorth } from "./net-worth-estimator.js";

export default class State {
  constructor({
      currentNetWorth,
      annualInvestmentGrowth,
      takeHomeAnnualIncome,
      annualIncomeGrowth,
      annualExpense,
      annualInflation,
      years} = {}) {
    this.currentNetWorth = currentNetWorth;
    this.annualInvestmentGrowth = annualInvestmentGrowth;
    this.takeHomeAnnualIncome = takeHomeAnnualIncome;
    this.annualIncomeGrowth = annualIncomeGrowth;
    this.annualExpense = annualExpense;
    this.annualInflation = annualInflation;
    this.years = years;
  }

  get estimatedNetWorth() {
    return estimateNetWorth(
      this.currentNetWorth,
      this.annualInvestmentGrowth,
      this.takeHomeAnnualIncome,
      this.annualIncomeGrowth,
      this.annualExpense,
      this.annualInflation,
      this.years);
  }

  // get valid() {
  //   return State.isValidValue(this.currentNetWorth) &&
  //       State.isValidValue(this.annualInvestmentGrowth) &&
  //       State.isValidValue(this.takeHomeAnnualIncome) &&
  //       State.isValidValue(this.annualIncomeGrowth) &&
  //       State.isValidValue(this.annualExpense) &&
  //       State.isValidValue(this.annualInflation) &&
  //       State.isValidValue(this.years);
  // }

  // static isValidValue(value) {
  //   return typeof(value) === 'number' && value >= 0;
  // }

  toString() {
    return [
      "State {",
      `  currentNetWorth: ${this.currentNetWorth}`,
      `  annualInvestmentGrowth: ${this.annualInvestmentGrowth}`,
      `  takeHomeAnnualIncome: ${this.takeHomeAnnualIncome}`,
      `  annualIncomeGrowth: ${this.annualIncomeGrowth}`,
      `  annualExpense: ${this.annualExpense}`,
      `  annualInflation: ${this.annualInflation}`,
      `  years: ${this.years}`,
      `  years: ${this.estimatedNetWorth}`,
      "}",
    ].join('\n');
  }
}