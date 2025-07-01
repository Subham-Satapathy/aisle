# Sales Tax Calculator

A production-quality JavaScript sales tax calculator that computes taxes with specific rounding rules for items including import duties and exemptions.

## Features

- **Basic Sales Tax**: 10% on all goods except books, food, and medical products
- **Import Duty**: 5% on all imported goods with no exemptions  
- **Specific Rounding**: Tax amounts round up to the nearest 0.05
- **Tax Exemptions**: Books, food (chocolate), and medical products (pills)
- **Object-Oriented Design**: Clean, modular architecture with comprehensive test coverage

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd sales-tax-calculator

# Install dependencies
npm install
```

## Usage

### Command Line Interface

Run the application to see all required examples:

```bash
npm start
```

### Programmatic Usage

```javascript
const { SalesTaxCalculatorApp } = require('./src/index');

const app = new SalesTaxCalculatorApp();

// Process custom shopping basket
const receipt = app.processShoppingBasket([
  '1 book at 12.49',
  '1 music CD at 14.99',
  '1 chocolate bar at 0.85'
]);

console.log(receipt);
```

### Input Format

Items should be specified in the format: `"quantity item_name at price"`

Examples:
- `"1 book at 12.49"`
- `"1 imported bottle of perfume at 47.50"`
- `"2 packets of headache pills at 9.75"`

## Required Examples

### Input 1
```
1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85
```

### Output 1
```
1 book: 12.49
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 29.83
```

### Input 2
```
1 imported box of chocolates at 10.00
1 imported bottle of perfume at 47.50
```

### Output 2
```
1 imported box of chocolates: 10.50
1 imported bottle of perfume: 54.65
Sales Taxes: 7.65
Total: 65.15
```

### Input 3
```
1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
1 imported box of chocolates at 11.25
```

### Output 3
```
1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
1 imported box of chocolates: 11.85
Sales Taxes: 6.70
Total: 74.68
```

## Architecture

The application follows object-oriented design principles with four main classes:

### Core Classes

- **`Item`** - Represents a purchasable item with tax classification logic
- **`TaxCalculator`** - Handles tax calculations with specific rounding rules
- **`Receipt`** - Manages shopping baskets and formats receipt output
- **`InputParser`** - Parses text input into Item objects

### Tax Calculation Rules

1. **Basic Sales Tax**: 10% on all items except:
   - Books (contains "book")
   - Food items (contains "chocolate") 
   - Medical products (contains "pills")

2. **Import Duty**: 5% on all items containing "imported" 

3. **Rounding Rule**: `Math.ceil((amount * 100) / 5) * 5 / 100`
   - Always rounds UP to the nearest 0.05
   - Example: 1.499 → 1.50, 7.125 → 7.15

## Testing

Run the comprehensive test suite:

```bash
# Run tests
npm test

### Test Coverage

- **Integration tests** verifying complete end-to-end functionality
- **Edge case testing** for error handling and validation

## Project Structure

```
sales-tax-calculator/
├── src/
│   ├── index.js          # Main application entry point
│   ├── Item.js           # Item class with tax classification
│   ├── TaxCalculator.js  # Tax calculation engine
│   ├── Receipt.js        # Receipt generation and formatting
│   └── InputParser.js    # Text input parsing
├── test/
│   ├── Integration.test.js # End-to-end integration tests
├── customInput.js        # Users can test by providing custom inputs
├── package.json          # Project configuration
└── README.md            # This file
```

## API Reference

### SalesTaxCalculatorApp

#### Methods

- `processShoppingBasket(inputItems)` - Process array of item strings
- `processRequiredInputSet(inputSet)` - Process predefined input set (1, 2, or 3)
- `processTextInput(textInput)` - Process multi-line text input
- `displayAllExamples()` - Display all required examples

### TaxCalculator  

#### Methods

- `roundTaxAmount(amount)` - Round tax amount to nearest 0.05
- `calculateBasicSalesTax(price, isExempt)` - Calculate 10% basic sales tax
- `calculateImportDuty(price, isImported)` - Calculate 5% import duty
- `calculateTotalTax(price, isExempt, isImported)` - Calculate combined tax

### Item

#### Properties

- `name` - Item name/description
- `price` - Shelf price
- `quantity` - Item quantity

#### Methods

- `isImported()` - Check if item is imported
- `isTaxExempt()` - Check if item is tax-exempt
