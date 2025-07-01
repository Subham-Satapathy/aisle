class Receipt {
  constructor(taxCalculator) {
    this.taxCalculator = taxCalculator;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }

  getTotalTax() {
    return this.items.reduce((total, item) => {
      const tax = this.taxCalculator.calculateTaxForItem(item);
      return total + (tax * item.quantity);
    }, 0);
  }

  getTotalCost() {
    return this.items.reduce((total, item) => {
      const tax = this.taxCalculator.calculateTaxForItem(item);
      const itemTotalPrice = item.price * item.quantity;
      const itemTotalTax = tax * item.quantity;
      return total + itemTotalPrice + itemTotalTax;
    }, 0);
  }

  getItemFinalPrice(item) {
    const tax = this.taxCalculator.calculateTaxForItem(item);
    return item.price + tax;
  }

  /**
   * Format the receipt as a string matching the required output format
   * @returns {string} Formatted receipt
   */
  formatReceipt() {
    let output = '';
    
    this.items.forEach(item => {
      const finalPrice = this.getItemFinalPrice(item);
      output += `${item.quantity} ${item.name}: ${finalPrice.toFixed(2)}\n`;
    });
    
    const totalTax = this.getTotalTax();
    const totalCost = this.getTotalCost();
    
    output += `Sales Taxes: ${totalTax.toFixed(2)}\n`;
    output += `Total: ${totalCost.toFixed(2)}`;
    
    return output;
  }

  printReceipt() {
    console.log(this.formatReceipt());
  }

  clear() {
    this.items = [];
  }

  getStatistics() {
    const totalItems = this.items.length;
    const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const exemptItems = this.items.filter(item => item.isTaxExempt()).length;
    const importedItems = this.items.filter(item => item.isImported()).length;
    
    return {
      totalItems,
      totalQuantity,
      exemptItems,
      importedItems,
      totalTax: this.getTotalTax(),
      totalCost: this.getTotalCost()
    };
  }
}

module.exports = Receipt;
