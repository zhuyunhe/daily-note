const obj = require('./a.js')
obj.setCount();
setTimeout(() => {
  console.log(obj.count)
}, 2000);