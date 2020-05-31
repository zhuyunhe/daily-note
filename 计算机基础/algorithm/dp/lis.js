// 找出一个序列的最长上升子序列
// dp（动态规划）求解
function dp(a = []) {
  let result = new Array(a.length).fill(1);
  for (let i = 1; i < result.length; i++) {
    for (let j = 0; j < i; j++) {
      if (a[j] < a[i] && result[i] < result[j] + 1) {
        result[i] = result[j] + 1;
      }
      // console.log(i + ' - ' + j + ' : ' + result)
    }
  }
  return result;
}

let a = [10, 22, 9, 33, 21, 50, 41, 60];
a = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// dp(a)

// 贪心 + 二分查找 求解
function t(a=[]){
  let result = [];
  result[0] = a[0];
  for(let i=1; i<a.length; i++) {
    if(a[i] > result[result.length-1]){
      result.push(a[i])
    } else{
      result[find(result, a[i])] = a[i]
    }
  }

  console.log(result)
  
}
const find = (a, target) => {
  console.log(a)
  console.log(target)

  let povit = a[0];
  let left = 0;
  let right = a.length - 1;
  let mid;

  while (left < right) {
    mid = Math.floor((right - left) / 2);
    console.log(a)
    console.log('left: ' + left)
    console.log('right: ' + right)
    console.log('mid: ' + a[mid])
    console.log('target: ' + target)
    if (a[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

function lis(arr, i) {
  if(i === 1){
    return 1
  }
  let res = 1;
  let max_end_with_i = 1;
  for(let j=1; j<i; j++){
    res = lis(arr, j)
    if (a[j - 1] < a[i - 1] && res + 1 > max_end_with_i){
      max_end_with_i = res + 1;
    }
  }
  
  return max_end_with_i
}

function dp_lis(arr) {
  let lis = new Array(arr.length)
  for(let i=0; i<arr.length; i++){
    lis[i] = 1
    for(let j=0; j<i; j++){
      if(arr[i] > arr[j] && lis[i] < lis[j]+1){
        lis[i] = lis[j] + 1
      }
    }
  }
  return lis.pop()
}

// console.log(find(a, 3))
// dp(a)

console.log(lis(a, a.length))
console.log(dp_lis(a))
// console.log(max_lis_length)