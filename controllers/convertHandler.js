function ConvertHandler() {

	// Object that includes all supported units.
	const short_units = {
		kilogram: 'kg',
		pound: 'lbs',
		gallon: 'gal',
		litre: 'L',
		mile: 'mi',
		kilometer: 'km'
	}


	this.getNum = function (input) {
		// Extracting number from input
		let result = input.match(/[0-9./]+/g);

		// If number is empty then return 1
		if (!result) return 1;

		// Checking if input contains numbers before as well
		// as after the unit.
		if (result.length > 1)
			throw Error;
		else
			result = result[0];

		// Checking for multiple slash in result, if found
		// Then throw an error. 
		if (/\/.*\//.test(result))
			throw Error('Invalid Number');

		// Returning evaluated value, to avoid future errors and calculations.
		return eval(result).toFixed(3);
	};

	this.getUnit = function (input) {
		let result;

		// Extracting units in the form of array from input
		result = input.match(/[a-z]+/gi);

		// Checking for multiple units, and if found then throw 
		// an error else get unit from array and convert to lowercase.
		if (result.length > 1)
			throw Error;
		else
			result = result[0];

		// Converting every unit to lowercase to avoid case sensitive
		// result except "L". 
		result = result === "L" ? "L" : result.toLowerCase();

		// Checking if given unit is valid or not.
		if (short_units[result])
			result = short_units[result];
		else if (Object.values(short_units).includes(result)) { }
		else
			throw Error;

		return result;
	};

	this.getReturnUnit = function (initUnit) {
		let result;
		const return_units = {
			'gal': 'L',
			'L': 'gal',
			'mi': 'km',
			'km': 'mi',
			'lbs': 'kg',
			'kg': 'lbs'
		}

		result = return_units[initUnit];
		return result;
	};

	this.spellOutUnit = function (unit) {
		let result;

		return result;
	};

	this.convert = function (initNum, initUnit) {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;
		let result;

		return result;
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		let result;

		return result;
	};

}

module.exports = ConvertHandler;
