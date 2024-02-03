import { estimateNetWorth, estimateNetWorthByYear } from './modules/net-worth-estimator.js'
import { toViewModel, toState } from './modules/state-converters.js';
// import { Chart } from 'chart';
import State from './modules/state.js';
import ViewModel from './modules/view-model.js';

const currentNetWorthInput = () => document.getElementById('current-net-worth');
const annualInvestmentGrowthInput = () => document.getElementById('annual-investment-growth');
const takeHomeAnnualIncomeInput = () => document.getElementById('take-home-annual-income');
const annualIncomeGrowthInput = () => document.getElementById('annual-income-growth');
const annualExpenseInput = () => document.getElementById('annual-expense');
const annualInflationInput = () => document.getElementById('annual-inflation');
const yearsInput = () => document.getElementById('years');
const estimatedNetWorthSummary = () => document.getElementById('estimated-net-worth-summary');

const DEFAULT_STATE = Object.freeze({
  currentNetWorth: 100000,
  annualInvestmentGrowth: 0.05,
  takeHomeAnnualIncome: 100000,
  annualIncomeGrowth: 0.05,
  annualExpense: 40000,
  annualInflation: 0.03,
  years: 10,
});

let chart = null;

function getViewModel() {
  return new ViewModel({
    currentNetWorth: currentNetWorthInput().value,
    annualInvestmentGrowth: annualInvestmentGrowthInput().value,
    takeHomeAnnualIncome: takeHomeAnnualIncomeInput().value,
    annualIncomeGrowth: annualIncomeGrowthInput().value,
    annualExpense: annualExpenseInput().value,
    annualInflation: annualInflationInput().value,
    years: yearsInput().value
  });
}

function setState(state) {
  if (!(state instanceof State)) {
    state = new State(state);
  }
  const newViewModel = toViewModel(state);
  render(newViewModel);
  redrawChart(state);
}

function render(viewModel) {
  currentNetWorthInput().value = viewModel.currentNetWorth;
  annualInvestmentGrowthInput().value = viewModel.annualInvestmentGrowth;
  takeHomeAnnualIncomeInput().value = viewModel.takeHomeAnnualIncome;
  annualIncomeGrowthInput().value = viewModel.annualIncomeGrowth;
  annualExpenseInput().value = viewModel.annualExpense;
  annualInflationInput().value = viewModel.annualInflation;
  yearsInput().value = viewModel.years;
  estimatedNetWorthSummary().innerText = viewModel.estimatedNetWorthSummary;
}

function redraw() {
  const currentViewModel = getViewModel();
  const state = toState(currentViewModel);
  console.log(state);
  setState(state);
}

addEventListeners(["change"], (event) => redraw());

setState(DEFAULT_STATE);

function addEventListeners(events, eventHandler) {
  events.forEach(event => addEventListener(event, eventHandler));
}

function redrawChart(state) {
  const data =
    estimateNetWorthByYear(
        state.currentNetWorth,
        state.annualInvestmentGrowth,
        state.takeHomeAnnualIncome,
        state.annualIncomeGrowth,
        state.annualExpense,
        state.annualInflation,
        state.years).map((value, year) => ({ year, value }));

  if (chart !== null) {
    chart.destroy();
  }

  chart = new Chart(
    document.getElementById('chart'),
    {
      type: 'line',
      label: '',
      options: {
        scales: {
          y: {
            min: 0
          }
        }
      },
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Net worth projection',
            fill: 'origin',
            data: data.map(row => row.value)
          }
        ]
      }
    }
  );
}