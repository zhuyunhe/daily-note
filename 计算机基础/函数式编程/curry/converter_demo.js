Function.prototype.curry = function () {
  if (arguments.length < 1) {
    return this; //nothing to curry with - return function
  }
  var __method = this;
  var args = Array.from(arguments);
  return function () {
    return __method.apply(this, args.concat(Array.from(arguments)));
  }
}
function converter(toUnit, factor, offset, input) {
  offset = offset || 0;
  return [((offset + input) * factor).toFixed(2), toUnit].join(" ");
}


var milesToKm = converter.curry('km', 1.60936, undefined);
var poundsToKg = converter.curry('kg', 0.45460, undefined);
var farenheitToCelsius = converter.curry('degrees C', 0.5556, -32);



console.log(milesToKm(10));
