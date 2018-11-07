function runPromiseByQueue(myPromises) {
  myPromises.reduce(
    (previousPromise, nextPromise) => {
      console.log('gg')
      return previousPromise.then(() => nextPromise() )
    },
    Promise.resolve()
  );
}

/* const createPromise = (time, id) =>
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
]); */


const createPromise = (time, id) => () =>
  new Promise(solve =>
    setTimeout(() => {
      console.log("promise", id);
      solve(id);
    }, time)
  );

runPromiseByQueue([
  createPromise(3000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]);

