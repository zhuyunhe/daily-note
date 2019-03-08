const add = (x, y, z) => x + y + z

const curriedAdd = x => y => z => x + y + z

function curry (fn, arr){
  arr = arr || []
  return function(){
    var args = [].slice.call(arguments)
    var arg = arr.concat(args)
    //把分次传入的参数收集一起，最后一次性传给原函数
    return arg.length >= fn.length 
      ? fn.apply(null, arg) 
      : curry(fn, arg)
  }
}

const _curry  = (fn, arr=[]) => (...args) => (
  arg => arg.length >= fn.length 
    ? fn(...arg)
    : _curry(fn, arg)
)([...arr, ...args])
/* var curry = function curry(fn, arr) {
  arr = arr || []

  return function () {
    var args = [].slice.call(arguments)
    var arg = arr.concat(args)

    return arg.length >= fn.length
      ? fn.apply(null, arg)
      : curry(fn, arg)
  }
} */
const curried = _curry(add)

console.log(curried(1,3)(2));


//一道面试题
function sum(...args){
  let fn = (...args_fn) => sum(...args.concat(args_fn))
  fn.valueOf = ()=> args.reduce( (a,b) => a+b)
  return fn
}

console.log(sum(1,10,20)(3)(4).valueOf());


