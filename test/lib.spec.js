'use strict';
const chai = require('chai');

chai.should();

const lib = require('../server/lib');
describe('Lib', () => {

    describe('Sum', () => {
        it('should adds 2 + 2  return 5', () => {
            const sum = lib.sum(2, 3);
            sum.should.be.equal(5);
        });

    });

})

