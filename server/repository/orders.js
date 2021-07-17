'use strict';

const logger = require('../utils/logger'),
  constants = require('../constants'),
  moment = require('moment'),
  db = require('../utils/mongoDB'),
  Model = db.getModel('Order');


class Order {

  static async removeAll() {
    try {
      await Model.deleteMany();
      logger.log("All orders is cleaned at: " + new Date());
      return true;
    } catch (e) {
      logger.error("Order:removeAll()", e);
      return false;
    }
  }

  /**
   *
   * @param {}
   * @return {Promise<Boolean>}
   */
  static async insertPreOrder({
    products = [],
    finalPay = -1
  }) {
    try {
      const createdAt = moment.utc();
      // const readyAt = createdAt.clone().add(constants.PREPARE_ORDERS_TAKE_TIME_MIN, 'minute');
      const order = await Model.create({
        products,
        finalPay,
        createdAt
      });

      logger.log("New PreOrder is inserted at: " + new Date());
      return order;

    } catch (e) {
      logger.error("Order:insertPreOrder()", e);
      return false;
    }
  }

  static async paidOrder({
    orderId
  }) {
    try {
      await Model.updateOne({
        _id: orderId
      }, {
        $set: {
          status: 'paid'
        }

      });
      const paidOrder = await Model.findOne({
        _id: orderId
      }).lean();
      logger.log(orderId + "is paid at: " + new Date());
      return paidOrder;

    } catch (e) {
      logger.error("Order:paidOrder()", e);
      return false;
    }
  }


}

module.exports = Order;
