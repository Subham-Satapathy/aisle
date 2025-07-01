/**
 * Tax calculations with specific rounding rules (round up to nearest 0.05)
 */
class TaxCalculator {
  
  static BASIC_SALES_TAX_RATE = 0.10;  // 10%
  static IMPORT_DUTY_RATE = 0.05;      // 5%

  /**
   * Round tax amount up to the nearest 0.05
   * Formula: Math.ceil((amount * 100) / 5) * 5 / 100
   * @param {number} amount - The tax amount to round
   * @returns {number} Rounded tax amount
   */
  roundTaxAmount(amount) {
    if (amount === 0) return 0;
    
    return Math.ceil((amount * 100) / 5) * 5 / 100;
  }

  calculateBasicSalesTax(price, isExempt) {
    if (isExempt) return 0;
    
    const taxAmount = price * TaxCalculator.BASIC_SALES_TAX_RATE;
    return this.roundTaxAmount(taxAmount);
  }

  calculateImportDuty(price, isImported) {
    if (!isImported) return 0;
    
    const dutyAmount = price * TaxCalculator.IMPORT_DUTY_RATE;
    return this.roundTaxAmount(dutyAmount);
  }

  calculateTotalTax(price, isExempt, isImported) {
    const basicTax = this.calculateBasicSalesTax(price, isExempt);
    const importDuty = this.calculateImportDuty(price, isImported);
    
    return basicTax + importDuty;
  }

  calculateTaxForItem(item) {
    return this.calculateTotalTax(
      item.price,
      item.isTaxExempt(),
      item.isImported()
    );
  }

  calculateFinalPrice(price, isExempt, isImported) {
    const tax = this.calculateTotalTax(price, isExempt, isImported);
    return price + tax;
  }

  getTaxRates() {
    return {
      basicSalesTax: TaxCalculator.BASIC_SALES_TAX_RATE,
      importDuty: TaxCalculator.IMPORT_DUTY_RATE
    };
  }
}

module.exports = TaxCalculator;
