const main = require('../index.js');
const assert = require('assert');


describe('calculator', function() {
    const calculator = main.calculator;

    it('check isDigit', function() {
        assert.equal(calculator.isDigit('1'), true);
        assert.equal(calculator.isDigit('-1.5'), true);
        assert.equal(calculator.isDigit('+1'), false);
        assert.equal(calculator.isDigit('.1'), false);
    });

    it('check createString', function() {
        assert.deepEqual(calculator.createString('1 + 3'), ['1', '3', '+']);
        assert.deepEqual(calculator.createString('1 + 3 * 2'), ['1', '3', '2', '*', '+']);
        assert.deepEqual(calculator.createString('1 ^ 3 / 2'), ['1', '3', '^', '2', '/']);
    });

    it('check +', function() {
        assert.equal(calculator.calculate('1 + 2'), 3);
    });

    it('check -', function() {
        assert.equal(calculator.calculate('1 - 2'), -1);
    });

    it('check *', function() {
        assert.equal(calculator.calculate('4.5 * -2'), -9);
    });

    it('check /', function() {
        assert.equal(calculator.calculate('5 / 2.5'), 2);
    });

    it('check ^', function() {
        assert.equal(calculator.calculate('3 ^ 2'), 9);
    });

    it('check priority', function() {
        assert.equal(calculator.calculate('4 * 2 - 2 * 3 + 1'), 3);
    });

    it('check division by zero', function() {
        assert.equal(calculator.calculate('1 / 0'), 'error');
    });

    it('check input line validity', function() {
        assert.equal(calculator.calculate('1 +2'), 'error');
        assert.equal(calculator.calculate('1 + 2h'), 'error');
        assert.equal(calculator.calculate('1 + 2 *'), 'error');
        assert.equal(calculator.calculate('1 + 2.'), 'error');
    });
});
