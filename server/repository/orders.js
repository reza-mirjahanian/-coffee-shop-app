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
      const paidOrder = await Model.findOne({
        _id: orderId
      }).lean();
      if(!paidOrder){
        throw Error("Order not found!");
      }
      const readyAt = moment(paidOrder.createdAt).add(constants.PREPARE_ORDERS_TAKE_TIME_MIN, 'minute');
      await Model.updateOne({
        _id: orderId
      }, {
        $set: {
          status: 'paid',
          readyAt
        }

      });

      logger.log(orderId + "is paid at: " + new Date());
      return  Model.findOne({
        _id: orderId
      }).lean();

    } catch (e) {
      logger.error("Order:paidOrder()", e);
      return false;
    }
  }


}

module.exports = Order;
