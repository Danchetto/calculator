const main = require('../index.js');
const assert = require('assert');


describe('calculator', function() {
    const calculator = new main.calculator();
    it('check +', function() {
        assert.equal(calculator.calculate('1 + 2'), 3);
    });

    it('check -', function() {
        assert.equal(calculator.calculate('1 - 2'), -1);
    });

    it('check *', function() {
        assert.equal(calculator.calculate('4 * 2'), 8);
    });

    it('check /', function() {
        assert.equal(calculator.calculate('3 / 2'), 1.5);
    });

    it('check priority', function() {
        assert.equal(calculator.calculate('4 * 2 - 2 * 3 + 1'), 3);
    });

    it('check correct', function() {
        assert.equal(calculator.calculate('1 +2'), 'error');
    });
});
