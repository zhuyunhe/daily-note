/* 
写一个flatten函数，可以使flatten([1,[2,[3,4]],5,[7],8, [[[9]]] ])的结果为：[1,2,3,4,5,6,7,8,9]
*/
const flatten = arr => arr.reduce((acc, cur) => Object.prototype.toString.call(cur) === '[object Array]' ? acc.concat(flatten(cur)) : [...acc, cur], [])

console.log(flatten([1, [2, [3, 4]], 5, [7], 8, [[[9]]]]));
