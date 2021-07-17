'use strict';

const
  Schema = require('mongoose').Schema,
  Models = require('./models');

class Product extends Models {
  static schema() {
    return new Schema({
      active: {
        type: Boolean,
        default: true
      },
      name: {
        type: String,
        unique: true,
        required: true
      },
      price: {
        type: Number, //@todo Decimal128
        required: true
      },
      taxRate: {
        type: Number, //@todo Decimal128
        required: true
      }
    });
  }

  static collectionName() {
    return 'product';
  }

  static connection() {
    return 'default';
  }
}

module.exports = Product;