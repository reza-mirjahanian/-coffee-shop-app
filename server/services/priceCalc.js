const _ = require('lodash');

class PriceCalc {

  static calcProductsCost(products = []) {
    let finalPay = 0;
    if (_.isArray(products)) {
      for (let product of products) {
        finalPay += product.price * (1. + product.taxRate)
      }
    }
    return {
      products,
      finalPay
    }
  }
}


module.exports = PriceCalc;