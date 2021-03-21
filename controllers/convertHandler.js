function ConvertHandler() {

  this.getNum = function (input) {
    let result = input.split(/[A-Za-z]/, 1)[0];
    result = result ? result : '1';

    // Checking for multiple slash in result, if found
    // Then throw an error. 
    if (/\/.*\//.test(result))
      throw Error;

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
