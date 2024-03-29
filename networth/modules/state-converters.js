import State from "./state.js";
import ViewModel from "./view-model.js";

const numberFormatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0 });
const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD", minimumFractionDigits: 0 });
const percentFormatter = new Intl.NumberFormat("en-US", { style: "percent", minimumFractionDigits: 0 });

function toViewModel(state) {
  let estimatedNetWorthSummary =
      `Your estimated net worth in ${state.years} years: ${renderNumber(usdFormatter, state.estimatedNetWorth)}`;

  return new ViewModel({
      currentNetWorth: renderNumber(usdFormatter, state.currentNetWorth),
      annualInvestmentGrowth: renderNumber(percentFormatter, state.annualInvestmentGrowth),
      takeHomeAnnualIncome: renderNumber(usdFormatter, state.takeHomeAnnualIncome),
      annualIncomeGrowth: renderNumber(percentFormatter, state.annualIncomeGrowth),
      annualExpense: renderNumber(usdFormatter, state.annualExpense),
      annualInflation: renderNumber(percentFormatter, state.annualInflation),
      years: renderNumber(numberFormatter, state.years),
      estimatedNetWorthSummary
    });
}

function toState(viewModel) {
  return new State({
    currentNetWorth: parseNumber(viewModel.currentNetWorth) || 0,
    annualInvestmentGrowth: undefinedSafeDiv(parseNumber(viewModel.annualInvestmentGrowth), 100) || 0,
    takeHomeAnnualIncome: parseNumber(viewModel.takeHomeAnnualIncome) || 0,
    annualIncomeGrowth: undefinedSafeDiv(parseNumber(viewModel.annualIncomeGrowth), 100) || 0,
    annualExpense: parseNumber(viewModel.annualExpense) || 0,
    annualInflation: undefinedSafeDiv(parseNumber(viewModel.annualInflation), 100) || 0,
    years: parseInt(viewModel.years) || 0,
  });
}

function renderNumber(formatter, value) {
  if (Number.isNaN(value) || value === undefined) {
    return '';
  }

  return formatter.format(value);
}

function parseNumber(userInput) {
  if (userInput === '') {
    return undefined;
  }

  return Math.floor(Number.parseFloat(userInput.replace(/[^\d.]/g, '')));
}

function undefinedSafeDiv(num, denomination) {
  return num === undefined ? undefined : num / denomination;
}

export { toViewModel, toState }