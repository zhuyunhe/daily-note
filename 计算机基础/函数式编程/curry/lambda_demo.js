function f(x){
  return function(y){
    return function(z){
      return x*x + y + 2*z
    }
  }
}
const _f = x => y => z => x * x + y + 2 * z

console.log(_f(1)(2)(3));




