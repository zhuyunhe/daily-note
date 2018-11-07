// let result = [1, 2, 5].reduce((accumulator, item) => {
//   return accumulator + item;
// }, 0); // <-- Our initial value.

// console.log(result); // 8

let userIDs = [1, 2, 3];

var arr = [0,1,2,3,4]
var sum = arr.reduce(function (accumulator, currentValue){
  console.log(accumulator, currentValue)
  return accumulator + currentValue
})
console.log(sum)

return

var arrString = 'abcdaabc';
let result =  arrString.split('').reduce(function (res, cur) {
  res[cur] ? res[cur]++ : res[cur] = 1
  return res;
}, {})

// console.log(result)

/* function runPromiseByQueue(myPromises){
  myPromises.reduce(
    (previousPromise, nextPromise) => previousPromise.then(() => nextPromise )
  , Promise.resolve())
} */
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



/* const createPromise = (time, id) => {
  new Promise(resolve => {
    return setTimeout(() => {
      console.log('promise', id)
      resolve()
    }, time)
  })
} */
runPromiseByQueue([
  createPromise(3000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]);

/* runPromiseByQueue([
  createPromise(3000,1),
  createPromise(2000, 2),
  createPromise(1000, 3),
  createPromise(3000, 4)
]) */

