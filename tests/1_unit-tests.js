const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('getNum test', function () {
		const getNum = convertHandler.getNum;
		// #1
		test('Integer testing', function () {
			assert.equal(getNum('2kg'), 2);
			assert.notEqual(getNum('5gal'), 6);
		});

		// #2
		test('Decimal testing', function () {
			assert.equal(getNum('4.2gal'), 4.2);
			assert.notEqual(getNum('.4mi'), 0.5);
		})

		// #3
		test('Fractional testing', function () {
			assert.equal(getNum('1/2mi'), 0.5);
			assert.equal(getNum('2/3lbs'), 0.667);
			assert.notEqual(getNum('1/3L'), 0.3);
		})

		// #4
		test('Decimal and fractional testing', function () {
			assert.equal(getNum('1.2/3gal'), 0.4);
			assert.equal(getNum('1/0.25L'), 4);
			assert.equal(getNum('1.25/0.25km'), 5);
			assert.equal(getNum('1/0mi'), Infinity);
			assert.notEqual(getNum('1.25/5'), 2.5);
			assert.notEqual(getNum('45.2/1.2mi'), 37.7);
		})

		// #5
		test('Error on double fraction', function () {
			assert.throw(() => getNum('1/2/3kg'));
			assert.throw(() => getNum('1.2//'));
		})

		// #6
		test('1 as input if no number provided', function () {
			assert.equal(getNum('kg'), 1);
			assert.notEqual(getNum('mi'), 0);
		})

		// #7
		test('Few more case which should throw error.', function () {
			assert.throw(() => getNum('0.0.kg'));
			assert.throw(() => getNum('1 2kg'));
			assert.throw(() => getNum('1-2kg'));
		})
	})
})
