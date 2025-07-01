/**
 * Sales Tax Calculator - 10% basic rate (exempt: books, food, medical) 
 * and 5% import duty on all imported goods with specific rounding rules.
 */

const InputParser = require('./InputParser');
const TaxCalculator = require('./TaxCalculator');
const Receipt = require('./Receipt');

class SalesTaxCalculatorApp {
  constructor() {
    this.parser = new InputParser();
    this.taxCalculator = new TaxCalculator();
  }

  processShoppingBasket(inputItems) {
    try {
      const items = this.parser.parseItems(inputItems);
      const receipt = new Receipt(this.taxCalculator);
      items.forEach(item => receipt.addItem(item));
      
      return receipt.formatReceipt();
    } catch (error) {
      throw new Error(`Error processing shopping basket: ${error.message}`);
    }
  }

  processRequiredInputSet(inputSet) {
    try {
      const items = this.parser.parseRequiredInputSet(inputSet);
      const receipt = new Receipt(this.taxCalculator);
      items.forEach(item => receipt.addItem(item));
      
      return receipt.formatReceipt();
    } catch (error) {
      throw new Error(`Error processing input set ${inputSet}: ${error.message}`);
    }
  }

  processTextInput(textInput) {
    try {
      const items = this.parser.parseItemsFromText(textInput);
      const receipt = new Receipt(this.taxCalculator);
      items.forEach(item => receipt.addItem(item));
      
      return receipt.formatReceipt();
    } catch (error) {
      throw new Error(`Error processing text input: ${error.message}`);
    }
  }

  displayAllExamples() {
    console.log('Sales Tax Calculator - Required Examples');
    console.log('=========================================\n');

    console.log('Input 1:');
    console.log('1 book at 12.49');
    console.log('1 music CD at 14.99');
    console.log('1 chocolate bar at 0.85');
    console.log('\nOutput 1:');
    console.log(this.processRequiredInputSet(1));
    console.log('\n' + '='.repeat(50) + '\n');

    console.log('Input 2:');
    console.log('1 imported box of chocolates at 10.00');
    console.log('1 imported bottle of perfume at 47.50');
    console.log('\nOutput 2:');
    console.log(this.processRequiredInputSet(2));
    console.log('\n' + '='.repeat(50) + '\n');

    console.log('Input 3:');
    console.log('1 imported bottle of perfume at 27.99');
    console.log('1 bottle of perfume at 18.99');
    console.log('1 packet of headache pills at 9.75');
    console.log('1 imported box of chocolates at 11.25');
    console.log('\nOutput 3:');
    console.log(this.processRequiredInputSet(3));
  }
}

function main() {
  console.log('Sales Tax Calculator v1.0.0');
  console.log('=================================\n');

  const app = new SalesTaxCalculatorApp();
  app.displayAllExamples();
}

module.exports = {
  SalesTaxCalculatorApp,
  main
};

if (require.main === module) {
  main();
} 