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
			assert.equal(getNum('2/3lbs'), 0.66667);
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

	suite('getUnit test', function () {
		const getUnit = convertHandler.getUnit;

		// #8
		test('Return unit for kilogram', function () {
			assert.equal(getUnit('15kg'), 'kg');
			assert.equal(getUnit('1.2 kilogram'), 'kg');
			assert.equal(getUnit('0.5Kg'), 'kg');
		})

		// #9
		test('Return unit for pound', function () {
			assert.equal(getUnit('1/2lbs'), 'lbs');
			assert.equal(getUnit('2pound'), 'lbs');
			assert.equal(getUnit('15Lbs'), 'lbs');
		})

		// #10
		test('Return unit for liter', function () {
			assert.equal(getUnit('4L'), 'L');
			assert.equal(getUnit('10liter'), 'L');
			assert.equal(getUnit('0.45liter'), 'L');
		})

		// #11
		test('Return unit for gallon', function () {
			assert.equal(getUnit('1.2gal'), 'gal');
			assert.equal(getUnit('1.4Gal'), 'gal');
			assert.equal(getUnit('1/4gallon'), 'gal');
		})

		// #12
		test('Return unit for kilometer', function () {
			assert.equal(getUnit('km'), 'km');
			assert.equal(getUnit('12kilometer'), 'km');
			assert.equal(getUnit('5 KM'), 'km');
		})

		// #13
		test('Return unit for mile', function () {
			assert.equal(getUnit('1.9mi'), 'mi');
			assert.equal(getUnit('3mile'), 'mi');
			assert.equal(getUnit('1/2MI'), 'mi');
		})

		// #14
		test('Throw error for invalid units', function () {
			assert.throw(() => getUnit('1 mil'));
			assert.throw(() => getUnit('12l'));
			assert.throw(() => getUnit('5 mi kg'));
			assert.throw(() => getUnit('43'));
		})
	})

	suite('getReturnUnit test', function () {
		const getReturnUnit = convertHandler.getReturnUnit;

		// #15
		test('Return unit for valid units', function () {
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

		// #16
		test('Spell out for valid units', function () {
			assert.equal(spellOutUnit('kg'), 'kilograms');
			assert.equal(spellOutUnit('lbs'), 'pounds');
			assert.equal(spellOutUnit('L'), 'liters');
			assert.equal(spellOutUnit('gal'), 'gallons');
			assert.equal(spellOutUnit('km'), 'kilometers');
			assert.equal(spellOutUnit('mi'), 'miles');
		})

		// #17
		test('Spellout undefined for invalid units', function () {
			assert.isUndefined(spellOutUnit('cm'));
			assert.isUndefined(spellOutUnit('v'));
		})
	})

	suite('convert method test', function () {
		const convert = convertHandler.convert;

		// #18
		test('Convert value correctly', function () {
			assert.equal(convert(1.9, 'gal'), 7.192);
			assert.equal(convert(5, 'L'), 1.321);
			assert.equal(convert(9.2, 'lbs'), 4.173);
			assert.equal(convert(2.112, 'kg'), 4.656);
			assert.equal(convert(8, 'mi'), 12.875);
			assert.equal(convert(5.7, 'km'), 3.542);
		})
	})
})
