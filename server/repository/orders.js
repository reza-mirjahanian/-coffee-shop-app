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
    static async insert({products = []}) {
        try {
            const createdAt = moment.utc();
            const readyAt = createdAt.clone().add(constants.PREPARE_ORDERS_TAKE_TIME_MIN, 'minute');
            const order = await Model.create({
                products,
                createdAt,
                readyAt
            });

            logger.log("New Order is inserted at: " + new Date());
            return order;

        } catch (e) {
            logger.error("Orders:insert()", e);
            return null;
        }
    }


}

module.exports = Order;
