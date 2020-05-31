const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this;
  this.state = PENDING;
  this.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }

  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.map(cb => cb(that.value));
    }
  }

  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function'
    ? onRejected 
    : r => {
      throw r
    }
  
  if(that.state === PENDING){
    that.resolvedCallbacks.push(onFulfilled);
    that.rejectedCallbacks.push(onRejected)
  }

  if(that.state === RESOLVED) {
    onFulfilled(that.value);
  }

  if(that.state === REJECTED) {
    onRejected(that.value);
  }
  return that;
}

new MyPromise((resolve, reject) => {
  sleep(500)
  resolve(1);
}).then().then(value => {
  console.log(value)
})