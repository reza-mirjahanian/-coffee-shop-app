'use strict';
const expect = require('chai').expect;
require('../../server/express'); //@todo maybe cleanup

const constants = require('../../server/constants');
const axios = require('axios');

suite('Testing Express API routes', () => {
    suite('GET /', () => {
        test('should respond with "Server is running" ', async () => {
            const {data: response} = await axios.get(`http://localhost:${constants.EXPRESS_PORT}/`);
            expect(response).to.equal("Server is running")
        });
    });

});
