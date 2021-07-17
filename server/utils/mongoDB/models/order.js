'use strict';

const
  Schema = require('mongoose').Schema,
  Models = require('./models');

class Order extends Models {
  static schema() {
    return new Schema({
      products: {
        type: Array,
        required: true
      },
      status: {
        type: String,
        enum: ['waiting', 'paid', 'ready', 'done', 'canceled'],
        default: 'waiting'
      },
      finalPay: {
        type: Number, //@todo Decimal128
        default: -1
      },
      createdAt: {
        type: Date,
        required: true
      },
      readyAt: {
        type: Date
      }
    });
  }

  static collectionName() {
    return 'order';
  }

  static connection() {
    return 'default';
  }
}

module.exports = Order;