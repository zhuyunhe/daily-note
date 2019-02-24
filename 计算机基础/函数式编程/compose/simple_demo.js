const add1 = x => x + 1
const mul3 = x => x * 3
const div2 = x => x / 2

const compose = (...fns) => {
  if(fns.length === 0) return arg => arg
  if(fns.length === 1) return fns[0]

  return fns.reduceRight((a,b) => (...args)=> a(b(...args)))
}

let total = compose(add1, mul3, div2 )
console.log(total(1));