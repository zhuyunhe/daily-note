/* 
最简单的模拟koa-compose的demo
参考：http://codpoe.me/2017/09/26/koa-compose/
*/
function foo(next) {
  console.log('hello')
  next()
  console.log('end foo')
}

function bar(next) {
  console.log('world')
  next()
  console.log('end bar')
}

var middleware = [foo, bar]

function compose(middleware) {
  if(!Array.isArray(middleware)){
    return
  }

  for(const fn of middleware){
    if(typeof fn !== 'function'){
      return
    }
  }
  function inject(i) {
    var fn = middleware[i]
    if(!fn) return

    return fn(function(){
      return inject(i + 1)
    })
  }

  return function () {
    return inject(0)
  }
}

compose(middleware)()