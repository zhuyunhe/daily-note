'no-strict'
function compose(...funcs){
  if(funcs.length === 0){
    return arg => arg
  }
  if(funcs.length === 1){
    return funcs[0]
  }

  // return funcs.reduce( (a,b) => (...args)=> a(b(...args)) )

  return funcs.reduce( (prev,cur, index) => {
    // console.log(index)
    console.log(prev)
    console.log(cur)

    return function g(args) {
      return prev(cur(args))
    }
  })
}

var fn1 = val => 'fun1-' + val
var fn2 = val => 'fun2-' + val
var fn3 = val => {
  return 'fun3-' + val
}

// compose(fn1, fn2, fn3, fn4)('测试')
console.log(compose(fn1, fn2, fn3)('测试'))


/* function compose(...funcs) {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg);
} */
/* const funcs = [fn1, fn2, fn3]
funcs.reduce((prev, cur) => {
  return (...args) => {
    console.log(...args)
    return prev(cur(...args))
  }
}) */