const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('getNum test', function () {
		const getNum = convertHandler.getNum;
		// #1
		test('convertHandler should correctly read a whole number input.', function () {
			assert.equal(getNum('2kg'), 2);
			assert.notEqual(getNum('5gal'), 6);
		});

		// #2
		test('convertHandler should correctly read a decimal input number.', function () {
			assert.equal(getNum('4.2gal'), 4.2);
			assert.notEqual(getNum('.4mi'), 0.5);
		})

		// #3
		test('convertHandler should correctly read a fractional input.', function () {
			assert.equal(getNum('1/2mi'), 0.5);
			assert.equal(getNum('2/3lbs'), 0.66667);
			assert.notEqual(getNum('1/3L'), 0.3);
		})

		// #4
		test('convertHandler should correctly read a fractional input with a decimal.', function () {
			assert.equal(getNum('1.2/3gal'), 0.4);
			assert.equal(getNum('1/0.25L'), 4);
			assert.equal(getNum('1.25/0.25km'), 5);
			assert.equal(getNum('1/0mi'), Infinity);
			assert.notEqual(getNum('1.25/5'), 2.5);
			assert.notEqual(getNum('45.2/1.2mi'), 37.7);
		})

		// #5
		test('convertHandler should correctly return an error on a doulbe-fraction(i.e. 3/3/3).', function() {
			assert.throw(() => getNum('1/2.3/2kg'));
			assert.throw(() => getNum('3/2.1/1mi'));
		});

		// #6
		test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
			assert.equal(getNum('kg'), 1);
			assert.notEqual(getNum('mi'), 0);
		})
	})

	suite('getUnit test', function () {
		const getUnit = convertHandler.getUnit;

		// #7
		test('convertHandler should correctly read each valid input unit.', function () {
			assert.equal(getUnit('32.4kg'), 'kg');
			assert.equal(getUnit('5.1lbs'), 'lbs');
			assert.equal(getUnit('12km'), 'km');
			assert.equal(getUnit('33mi'), 'mi');
			assert.equal(getUnit('12L'), 'L');
			assert.equal(getUnit('4.12gal'), 'gal');
		});

		// #8
		test('convertHandler should correctly return an error for an invalid input unit.', function() {
			assert.throw(() => getUnit('3gall'));
			assert.throw(() => getUnit('3 kg mi'));
		});
	});

	suite('getReturnUnit test', function () {
		const getReturnUnit = convertHandler.getReturnUnit;

		// #9
		test('convertHandler should the correct return unit for each valid input unit.', function () {
			assert.equal(getReturnUnit('mi'), 'km');
			assert.equal(getReturnUnit('km'), 'mi');
			assert.equal(getReturnUnit('L'), 'gal');
			assert.equal(getReturnUnit('gal'), 'L');
			assert.equal(getReturnUnit('lbs'), 'kg');
			assert.equal(getReturnUnit('kg'), 'lbs');
		})
	})

	suite('spellOutUnit test', function () {
		const spellOutUnit = convertHandler.spellOutUnit;

		// #10
		test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
			assert.equal(spellOutUnit('kg'), 'kilograms');
			assert.equal(spellOutUnit('lbs'), 'pounds');
			assert.equal(spellOutUnit('L'), 'liters');
			assert.equal(spellOutUnit('gal'), 'gallons');
			assert.equal(spellOutUnit('km'), 'kilometers');
			assert.equal(spellOutUnit('mi'), 'miles');
		})
	})

	suite('convert method test', function () {
		const convert = convertHandler.convert;

		// #11
		test('convertHandler should correctly convert gal to L', function () {
			assert.equal(convert(1.9, 'gal'), 7.19228);
		});

		// #12
		test('convertHandler should correctly convert L to gal', function() {
			assert.equal(convert(5, 'L'), 1.32086);
		});

		// #13
		test('convertHandler should correctly convert lbs to kg', function() {
			assert.equal(convert(9.2, 'lbs'), 4.17305);
		});

		// #14
		test('convertHandler should correctly convert kg to lbs', function() {
			assert.equal(convert(2.112, 'kg'), 4.65617);
		});

		// #15
		test('convertHandler should correctly convert mi to km', function() {
			assert.equal(convert(8, 'mi'), 12.87472);
		});

		// #16
		test('convertHandler should correctly convert km to mi', function() {
			assert.equal(convert(5.7, 'km'), 3.54182);
		})
	})
})
