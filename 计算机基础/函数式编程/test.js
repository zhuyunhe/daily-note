function methodThatReturnsAPromise(nextID) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`${nextID} - Resolve! ${(new Date()).toTimeString()}`);
      resolve(nextID);
    }, 1000);
  });
}

let result = [1, 2, 3].reduce((accumulatorPromise, nextID) => {

  console.log(`Loop! ${(new Date()).toTimeString()}`);
  return accumulatorPromise.then((val) => {
    return methodThatReturnsAPromise(nextID);
  });
}, Promise.resolve());

console.log(result)

setTimeout(function(){
  console.log(result)
}, 5000)
