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
console.log(sum)

//用reduce统计字符串中每个字母出现频次
var arrString = 'abbacdefdcfdsd'
let result = arrString.split('').reduce(function(res, cur) {
  res[cur] ? res[cur]++ : res[cur] = 1
  return res
}, {})

//reduce实现让一串promise依次执行
function runPromiseByQueue(myPromises) {
  myPromises.reduce(
    (previousPromise, nextPromise) => previousPromise.then(() => nextPromise),
    Promise.resolve()
  );
}
const createPromise = (time, id) =>
  new Promise(solve =>
    setTimeout(() => {
      console.log("promise", id);
      solve();
    }, time)
  );




runPromiseByQueue([
  createPromise(3000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]);


