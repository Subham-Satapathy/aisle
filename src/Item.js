class Item {
  constructor(name, price, quantity = 1) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  isImported() {
    return this.name.toLowerCase().includes('imported');
  }

  /**
   * Determine if the item is exempt from basic sales tax
   * Exempt categories: books, food (chocolate), medical products (pills)
   * @returns {boolean} True if the item is tax-exempt
   */
  isTaxExempt() {
    const nameInLowerCase = this.name.toLowerCase();
    
    const exemptKeywords = [
      'book',        // Books
      'chocolate',   // Food items (chocolate/chocolates)
      'pills'        // Medical products
    ];
    
    return exemptKeywords.some(keyword => nameInLowerCase.includes(keyword));
  }

  getTotalPrice() {
    return this.price * this.quantity;
  }

  toString() {
    return `${this.quantity} ${this.name}: ${this.price.toFixed(2)}`;
  }
}

module.exports = Item;
