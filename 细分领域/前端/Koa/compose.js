/* 
koa-compose
参考：https://juejin.im/post/59c00a39f265da064c3853b7
*/
function foo(context, next) {
  console.log('----middleware 1 ----')
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('hello')
      resolve()
    },3000)
  }).then(() => {
    return next()
  })
}

function bar(context, next) {
  console.log('----middleware 2 ----')
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('world')
      resolve()
    }, 3000)
  }).then(() => {
    return next()
  })
}

function compose(middleware){
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function(context, next){
    let index = -1
    return dispatch(0)

    function dispatch(i){
      if(i <= index){
        return Promise.reject(new Error('next() called multiple times'))
      }
      index = i

      let fn = middleware[i]
      if(i === middleware.length) fn = next
      if(!fn) return Promise.resolve()
      try{
        return Promise.resolve(fn(context, function next(){
          return dispatch(i + 1)
        }))
      }catch(e){
        return Promise.reject(err)
      }
    }
  }
}

const run = compose([foo, bar])

run({},function finish(){
  console.log('finish ! ')
})