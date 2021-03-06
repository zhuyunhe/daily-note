/* 一道面试题
实现以下函数：
sum(1)(2)(3).valueOf()  //6
sum(1, 2)(3).valueOf()  //6
sum(1,2)(3)(4).valueOf()  //10
*/
function sum(...args) {
  let fn = (...args_fn) => sum(...args.concat(args_fn))
  fn.valueOf = () => args.reduce((a, b) => a + b)
  return fn
}


function _sum(...args) {
  if (args.length === 3) {
    return args.reduce((a, b) => a + b)
  }
  let fn = (...args_fn) => _sum(...[...args, ...args_fn])
  
  return fn
}
// console.log(sum(1, 10, 20)(3)(4).valueOf());

console.log(_sum(1)(2)(3))