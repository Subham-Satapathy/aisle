/**
 * Handles input format: "quantity item_name at price"
 */
const Item = require('./Item');

class InputParser {
  /**
   * Regular expression to match the input format: "quantity item_name at price"
   * Captures: quantity, item name, price
   */
  static INPUT_PATTERN = /^(\d+)\s+(.+?)\s+at\s+(\d+(?:\.\d+)?)$/;

  parseItem(input) {
    const cleanInput = input.trim();
    
    if (!cleanInput) {
      throw new Error('Input cannot be empty');
    }
    
    const match = cleanInput.match(InputParser.INPUT_PATTERN);
    
    if (!match) {
      throw new Error(`Invalid input format: "${input}". Expected format: "quantity item_name at price"`);
    }
    
    const [, quantityStr, itemName, priceStr] = match;
    
    const quantity = parseInt(quantityStr, 10);
    if (quantity <= 0) {
      throw new Error(`Invalid quantity: ${quantity}. Quantity must be a positive integer.`);
    }
    
    const price = parseFloat(priceStr);
    if (price < 0) {
      throw new Error(`Invalid price: ${price}. Price cannot be negative.`);
    }
    
    const cleanItemName = itemName.trim();
    if (!cleanItemName) {
      throw new Error('Item name cannot be empty');
    }
    
    return new Item(cleanItemName, price, quantity);
  }

  parseItems(inputs) {
    if (!Array.isArray(inputs)) {
      throw new Error('Input must be an array of strings');
    }
    
    return inputs.map((input, index) => {
      try {
        return this.parseItem(input);
      } catch (error) {
        throw new Error(`Error parsing item at index ${index}: ${error.message}`);
      }
    });
  }

  parseItemsFromText(text) {
    if (typeof text !== 'string') {
      throw new Error('Input must be a string');
    }
    
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith('#'));
    
    return this.parseItems(lines);
  }

  isValidInput(input) {
    try {
      this.parseItem(input);
      return true;
    } catch (error) {
      return false;
    }
  }

  getInputFormatExample() {
    return 'Expected format: "quantity item_name at price"\nExample: "1 book at 12.49"';
  }

  parseRequiredInputSet(inputSet) {
    const inputSets = {
      1: [
        '1 book at 12.49',
        '1 music CD at 14.99',
        '1 chocolate bar at 0.85'
      ],
      2: [
        '1 imported box of chocolates at 10.00',
        '1 imported bottle of perfume at 47.50'
      ],
      3: [
        '1 imported bottle of perfume at 27.99',
        '1 bottle of perfume at 18.99',
        '1 packet of headache pills at 9.75',
        '1 imported box of chocolates at 11.25'
      ]
    };
    
    if (!inputSets[inputSet]) {
      throw new Error(`Invalid input set: ${inputSet}. Valid sets are 1, 2, or 3.`);
    }
    
    return this.parseItems(inputSets[inputSet]);
  }
}

module.exports = InputParser;
