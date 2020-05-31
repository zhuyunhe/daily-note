function quicksort(arr, left, right) {
  //递归退出条件
  if (left < right) {
    //分
    var index = partition(arr, left, right);
    console.log(`index: ${index}`)
    // console.log(arr)
    //治
    quicksort(arr, left, index - 1);
    quicksort(arr, index + 1, right);
  }
}
function partition(arr, left, right) {
  let povit = arr[left];
  let i = left;
  let j = right + 1;
  while (true) {
    while (less(arr[++i], povit)) {
      
    }
    while (less(povit, arr[--j])) {
      
    }
    if (i >= j) break;
    exec(arr, i, j);
  }
  exec(arr, left, j);
  return j;
}

function quick_sort(arr, left, right){
  if(right <= left)
    return;
  let i = left + 1;
  let lt = left;
  let gt = right;
  let povit = arr[left];
  while (i <= gt) {
    // console.log('i: ' + arr[i] + ',left: ' + arr[left])
    if (arr[i] < povit){
      exec(arr, i++, lt++)
    } else if (arr[i] > povit) {
      exec(arr, i, gt--)
    } else {
      console.count()
      i++
    }
  }
  // console.log('lt: ' + lt)
  // console.log('gt: ' + gt)

  quick_sort(arr, left, lt - 1);
  quick_sort(arr, gt+1, right);
}

let arr = [3, 1, 5, 0, 2, 4, 9, 8, 3, 3, 3, 2, 2];
console.log('原始数组：')
console.log(arr)
quick_sort(arr, 0, arr.length - 1);
console.log(arr)

//可以利用partition找出数组中第k大的数
function select(arr, k){
  let low = 0, high = arr.length-1;
  if(k <= high){
    while (high > low) {
      let j = partition(arr, low, high);
      if (j === k) {
        return arr[j]
      } else if (j > k) {
        high = j - 1;
      } else {
        low = j + 1;
      }
    }
    return arr[k]
  } else{
    throw new Error('数组越界')
  }
  
}

let k = 11;
// console.log(`第${k}大的数为：${select(arr,k)}`)





/* 
  以下是工具函数
*/
function less(a, b) {
  if(a < b){
    return true
  }
  return false;
}
function exec(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  // console.log(arr)
}

