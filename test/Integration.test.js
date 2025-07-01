const InputParser = require('../src/InputParser');
const TaxCalculator = require('../src/TaxCalculator');
const Receipt = require('../src/Receipt');

describe('Sales Tax Calculator - Full Integration Tests', () => {
  let parser;
  let taxCalculator;

  beforeEach(() => {
    parser = new InputParser();
    taxCalculator = new TaxCalculator();
  });

  describe('Complete End-to-End Scenarios', () => {
    test('should produce exact Output 1 from Input 1', () => {
      const inputs = [
        '1 book at 12.49',
        '1 music CD at 14.99',
        '1 chocolate bar at 0.85'
      ];

      const items = parser.parseItems(inputs);
      const receipt = new Receipt(taxCalculator);
      items.forEach(item => receipt.addItem(item));
      const output = receipt.formatReceipt();

      const expectedOutput = `1 book: 12.49
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 29.83`;

      expect(output).toBe(expectedOutput);
    });

    test('should produce exact Output 2 from Input 2', () => {
      const inputs = [
        '1 imported box of chocolates at 10.00',
        '1 imported bottle of perfume at 47.50'
      ];

      const items = parser.parseItems(inputs);
      const receipt = new Receipt(taxCalculator);
      items.forEach(item => receipt.addItem(item));
      const output = receipt.formatReceipt();

      const expectedOutput = `1 imported box of chocolates: 10.50
1 imported bottle of perfume: 54.65
Sales Taxes: 7.65
Total: 65.15`;

      expect(output).toBe(expectedOutput);
    });

    test('should produce exact Output 3 from Input 3', () => {
      const inputs = [
        '1 imported bottle of perfume at 27.99',
        '1 bottle of perfume at 18.99',
        '1 packet of headache pills at 9.75',
        '1 imported box of chocolates at 11.25'
      ];

      const items = parser.parseItems(inputs);
      const receipt = new Receipt(taxCalculator);
      items.forEach(item => receipt.addItem(item));
      const output = receipt.formatReceipt();

      const expectedOutput = `1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
1 imported box of chocolates: 11.85
Sales Taxes: 6.70
Total: 74.68`;

      expect(output).toBe(expectedOutput);
    });
  });

  describe('Convenience Methods for Required Inputs', () => {
    test('should handle predefined input set 1', () => {
      const items = parser.parseRequiredInputSet(1);
      const receipt = new Receipt(taxCalculator);
      items.forEach(item => receipt.addItem(item));

      expect(receipt.getTotalTax()).toBeCloseTo(1.50, 2);
      expect(receipt.getTotalCost()).toBeCloseTo(29.83, 2);
    });

    test('should handle predefined input set 2', () => {
      const items = parser.parseRequiredInputSet(2);
      const receipt = new Receipt(taxCalculator);
      items.forEach(item => receipt.addItem(item));

      expect(receipt.getTotalTax()).toBe(7.65);
      expect(receipt.getTotalCost()).toBe(65.15);
    });

    test('should handle predefined input set 3', () => {
      const items = parser.parseRequiredInputSet(3);
      const receipt = new Receipt(taxCalculator);
      items.forEach(item => receipt.addItem(item));

      expect(receipt.getTotalTax()).toBeCloseTo(6.70, 2);
      expect(receipt.getTotalCost()).toBeCloseTo(74.68, 2);
    });
  });

  describe('Text Block Input Processing', () => {
    test('should handle multi-line text input', () => {
      const textInput = `1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85`;

      const items = parser.parseItemsFromText(textInput);
      const receipt = new Receipt(taxCalculator);
      items.forEach(item => receipt.addItem(item));

      expect(receipt.getTotalTax()).toBeCloseTo(1.50, 2);
      expect(receipt.getTotalCost()).toBeCloseTo(29.83, 2);
    });

    test('should handle text input with comments and empty lines', () => {
      const textInput = `# Shopping Basket 1
1 book at 12.49

1 music CD at 14.99
# This is a chocolate
1 chocolate bar at 0.85`;

      const items = parser.parseItemsFromText(textInput);
      const receipt = new Receipt(taxCalculator);
      items.forEach(item => receipt.addItem(item));

      expect(items).toHaveLength(3);
      expect(receipt.getTotalTax()).toBe(1.50);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle empty shopping basket', () => {
      const receipt = new Receipt(taxCalculator);
      const output = receipt.formatReceipt();

      expect(output).toBe('Sales Taxes: 0.00\nTotal: 0.00');
    });

    test('should propagate parsing errors', () => {
      expect(() => {
        parser.parseItems(['invalid input']);
      }).toThrow();
    });

    test('should handle quantities greater than 1', () => {
      const items = parser.parseItems(['2 books at 10.00']);
      const receipt = new Receipt(taxCalculator);
      items.forEach(item => receipt.addItem(item));

      expect(receipt.getTotalCost()).toBe(20.00); // 2 * 10.00, books are exempt
    });
  });

  describe('Detailed Tax Calculation Verification', () => {
    test('should verify individual tax calculations step by step', () => {
      // Music CD: 14.99 * 10% = 1.499 → rounds to 1.50
      const musicCD = parser.parseItem('1 music CD at 14.99');
      expect(taxCalculator.calculateTaxForItem(musicCD)).toBe(1.50);

      // Imported perfume: 47.50 * 15% = 7.125 → rounds to 7.15
      const importedPerfume = parser.parseItem('1 imported bottle of perfume at 47.50');
      expect(taxCalculator.calculateTaxForItem(importedPerfume)).toBe(7.15);

      // Imported chocolates: 10.00 * 5% = 0.50 (exempt from basic tax)
      const importedChocolates = parser.parseItem('1 imported box of chocolates at 10.00');
      expect(taxCalculator.calculateTaxForItem(importedChocolates)).toBe(0.50);

      // Book: 0% tax
      const book = parser.parseItem('1 book at 12.49');
      expect(taxCalculator.calculateTaxForItem(book)).toBe(0);
    });
  });
});
