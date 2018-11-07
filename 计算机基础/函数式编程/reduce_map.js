var arr = [1,2,3,4]

var _arr1 = arr.map((item) => {
  return item+1
})
console.log(_arr1)

var reducer = function (accumulator, x) {
  accumulator.push(x + 1)
  return accumulator
}
var _arr2 = arr.reduce(reducer, [])

console.log(_arr2)



