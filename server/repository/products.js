'use strict';

const _ = require('lodash'),
    logger = require('../utils/logger'),
    moment = require('moment'),
    Model = require('../utils/mongoDB').getModel('Product');


class Products {

    static async removeAll() {
        try {
            await Model.deleteMany();
            logger.log("All products is cleaned at: " + new Date());
            return true;
        } catch (e) {
            logger.error("Products:insert()", e);
            return false;
        }
    }

    /**
     *
     * @param {}
     * @return {Promise<Boolean>}
     */
    static async insert({name, active = true, price, taxRate}) {
        try {
            await Model.create({
                name,
                price,
                taxRate,
                active,
            });
            logger.log("New product is inserted at: " + new Date());
            return true;

        } catch (e) {
            logger.error("Products:insert()", e);
            return false;
        }
    }

    /**
     *
     * @param {Date} at Date
     * @return {Promise<{}|null>}
     */
    static async getAvailableProducts() {
        try {
            return await Model.find({active: true}).select('_id active name price taxRate').lean();

        } catch (e) {
            logger.error("Products:getAvailableProducts()", e);
            return null;
        }
    }


}

module.exports = Products;
