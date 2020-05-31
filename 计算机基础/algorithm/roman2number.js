/* 
罗马数字转10进制阿拉伯数字
利用二分法思想，找到罗马数字中最大那一个max，整体的值等于：max - left(max左边部分的整体值) + right(max右边部分的整体值)
*/
const ROMAN = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
}

const arr = 'MCMLIV'.split('')

function findMaxIndex(arr, left, right){
  let max = ROMAN[arr[left]]
  let maxIndex = left
  for(let i=left+1; i<=right; i++){
    let num = ROMAN[arr[i]]
    if (num > max){
      max = num
      maxIndex = i
    }
  }
  return maxIndex
}

function roman2number(arr, left, right) {
  if(left > right){
    return 0
  }
  if(left === right){
    return ROMAN[arr[left]];
  }
  let maxIndex = findMaxIndex(arr, left, right)
  // console.log('left: ' + left + ', right: ' + right + ', maxIndex: ' + maxIndex)
  let max = ROMAN[arr[maxIndex]]

  let l = roman2number(arr, left, maxIndex - 1)

  let r = roman2number(arr, maxIndex+1, right)

  return max + r - l
  
}

function roman2(s) {
  
}

const result = roman2number(arr, 0, arr.length-1)
console.log('result: ' + result)