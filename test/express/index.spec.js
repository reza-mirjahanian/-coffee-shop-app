'use strict';
const expect = require('chai').expect;
require('../../server/api-server'); //@todo maybe cleanup

const constants = require('../../server/constants');
const productRepo = require('../../server/repository/products');
const axios = require('axios');
const SERVER_URL = `http://localhost:${constants.EXPRESS_PORT}/`;

suite('Testing Express API routes', () => {
    suite('GET /', () => {
        test('should respond with "Server is running" ', async () => {
            const {data: response} = await axios.get(SERVER_URL);
            expect(response).to.equal("Server is running")
        });
    });

    suite('GET /menu', () => {
        setup(async () => {
            await productRepo.removeAll();
        });
        test('should respond [] when we have no data', async () => {
            const {data: response} = await axios.get(SERVER_URL + 'menu');
            expect(response).to.be.an('array').that.is.empty;
        });
        test('should respond with the list of available items', async () => {
            await productRepo.insert({
                name: "tea",
                price: 2,
                taxRate: 0.1
            });
            await productRepo.insert({
                name: "cake",
                price: 3,
                taxRate: 0.2
            });
            await productRepo.insert({
                name: "coffee",
                price: 2.5,
                taxRate: 0.3,
                active: false
            });
            const {data: response} = await axios.get(SERVER_URL + 'menu');
            expect(response).to.have.lengthOf(2);
            expect(response[0]).to.have.all.keys('_id', 'active', 'name', 'price', 'taxRate');

        });
    });

});
