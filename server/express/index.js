'use strict';
const express = require('express'),
    constants = require('../constants'),
    cors = require('cors'),
    logger = require('../utils/logger');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Server is running'));


app.listen(constants.EXPRESS_PORT, () => logger.log(`listening on port ${constants.EXPRESS_PORT}!`));
