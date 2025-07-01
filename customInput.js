const { SalesTaxCalculatorApp } = require('./src/index');

const app = new SalesTaxCalculatorApp();

const receipt = app.processShoppingBasket([
  '1 box of chocolates at 10.00',
  '1 imported bottle of perfume at 47.50',
  '1 packet of headache pills at 9.75',
  '1 imported box of chocolates at 11.25',
  '1 imported bottle of perfume at 27.99',
  '1 bottle of perfume at 18.99',
  '1 imported packet of headache pills at 9.75',
  '1 imported box of chocolates at 11.25'
]);

console.log(receipt);