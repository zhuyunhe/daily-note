// let result = [1, 2, 5].reduce((accumulator, item) => {
//   return accumulator + item;
// }, 0); // <-- Our initial value.

// console.log(result); // 8

//一个简单的累加器
var arr = [0,1,2,3,4]
var sum = arr.reduce(function (accumulator, currentValue){
  console.log(accumulator, currentValue)
  return accumulator + currentValue
})

//用reduce统计字符串中每个字母出现频次
var arrString = 'abbacdefdcfdsd'
let result = arrString.split('').reduce(function(res, cur) {
  res[cur] ? res[cur]++ : res[cur] = 1
  return res
}, {})

//reduce实现让一串promise依次执行
function runPromiseByQueue(myPromises) {
  return myPromises.reduce(
    (previousMakePromise, nextMakePromise) => previousMakePromise.then(() => nextMakePromise()),
    Promise.resolve()
  );
}
const createPromise = (time, id) => ()=>
  new Promise(solve =>
    setTimeout(() => {
      console.log("promise", id);
      solve();
    }, time)
  );

/* runPromiseByQueue([
  createPromise(1000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]); */

//红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次
//利用reduce来解决
function red(){
  console.log('red');
}
function green(){
  console.log('green');
}
function yellow(){
  console.log('yellow');
}

function createMakeLightPromise(time, cb){
  return function(){
    return new Promise(function (resolve, reject) {
      setTimeout(function(){
        cb()
        resolve()
      }, time)
    })
  }
}
let step = function(){
  Promise.resolve().then(function(){
    runPromiseByQueue([
      createMakeLightPromise(3000, red),
      createMakeLightPromise(1000, green),
      createMakeLightPromise(2000, yellow)
    ]).then(function(){
      //递归循环
      step()
    });
    
    
  }) 
} 

//红绿灯开始
step()
