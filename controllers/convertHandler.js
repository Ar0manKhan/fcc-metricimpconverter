function ConvertHandler() {

  this.getNum = function (input) {
    // Extracting number from input
    let result = input.match(/[0-9./]+/g);

    // Checking if input contains numbers before as well
    // as after the unit.
    if (result.length > 1)
      throw Error;
    else
      result = result[0];

    // If number is empty then assign it 1
    result = result ? result : '1';

    // Checking for multiple slash in result, if found
    // Then throw an error. 
    if (/\/.*\//.test(result))
      throw Error;

    // Returning evaluated value, to avoid future errors and calculations.
    return eval(result);
  };

  this.getUnit = function (input) {
    let result;

    // Extracting units in the form of array from input
    result = input.match(/[a-z]+/gi);

    // Checking for multiple units, and if found then throw 
    // an error else get unit from array.
    if (result.length > 1)
      throw Error;
    else
      result = result[0];

    // Checking for invalid unit, if found then throuw an error.
    // If valid unit is found then return it from the predefined
    // valid unit array, to avoid bugs caused by different letter case.
    const valid_units = ['kg', 'lbs', 'gal', 'l', 'mi', 'km', 'kilogram', 'pound', 'gallon', 'litre', 'mile', 'kilometer'];
    const result_index = valid_units.indexOf(result.toLowerCase());
    if (result_index > -1)
      result = valid_units[result_index % 6];
    else
      throw Error("Invalid unit.")
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

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
