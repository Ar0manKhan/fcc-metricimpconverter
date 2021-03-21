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
