'use strict';
const express = require('express'),
    constants = require('../constants'),
    productRepo = require('../repository/products'),
    orderRepo = require('../repository/orders'),
    cors = require('cors'),
    logger = require('../utils/logger');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Server is running'));

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

app.post('/order', async (req,res)=>{
    try {


    } catch (err) {
        logger.error('/order', {
            err
        });
        res.status(500).send("Error");
    }
});


app.listen(constants.EXPRESS_PORT, () => logger.log(`listening on port ${constants.EXPRESS_PORT}!`));
