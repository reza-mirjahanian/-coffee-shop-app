'use strict';
const express = require('express'),
  constants = require('../constants'),
  productRepo = require('../repository/products'),
  orderRepo = require('../repository/orders'),
  priceCalcService = require('../services/priceCalc'),
  cors = require('cors'),
  logger = require('../utils/logger');

const app = express();
app.use(express.json());
app.use(cors());

// main page :)
app.get('/', (req, res) => res.send('Server is running'));

// [Admin Route] admin could insert products
app.post('/insert-product', async (req, res) => {
  try {
    const {product} = req.body;
    await productRepo.insert(product);
    return res.status(200).send('OK');

  } catch (err) {
    logger.error('/insert-product', {
      err
    });
    res.status(500).send("Error");
  }
});


// see the list of available items
app.get('/menu', async (req, res) => {
  try {
    const products = await productRepo.getAvailableProducts();
    return res.status(200).send(products);

  } catch (err) {
    logger.error('/menu', {
      err
    });
    res.status(500).send("Error");
  }
});

//user should be able to order them
app.post('/preorder', async (req, res) => {
  try {
    const {
      pIds
    } = req.body;
    const products = await productRepo.findProducts({
      pIds
    });
    const invoice = priceCalcService.calcProductsCost(products); //@todo calc discount
    const preOrder = await orderRepo.insertPreOrder(invoice);
    return res.status(200).send(preOrder);
  } catch (err) {
    logger.error('/preorder', {
      err
    });
    res.status(500).send("Error");
  }
});

// user should be able to pay the order
app.post('/pay', async (req, res) => {
  try {
    const {
        orderId
    } = req.body;
    //@todo billing process ...!
    const paidOrder = await orderRepo.paidOrder({
        orderId
    });
    return res.status(200).send(paidOrder);

  } catch (err) {
    res.status(500).send('Error');
    logger.error('/preorder', {
      err
    });
  }
});


app.listen(constants.EXPRESS_PORT, () => logger.log(`listening on port ${constants.EXPRESS_PORT}!`));
