function less(a, b) {
  if (a < b) {
    return true
  }
  return false;
}
function exec(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function sink(arr, n, k) {
  while(2*k + 1 <= n){
    let j = 2*k+1;
    // 找出子节点中较大的那个
    if(j<n && less(arr[j], arr[j+1])){
      j++;
    }
    if(!less(arr[k], arr[j])){
      break;
    }
    exec(arr, k, j);
    k = j;
  }
}
function build_heap(arr, n){
  for (let k = Math.floor((n - 1) / 2); k >= 0; k--) {
    sink(arr, n, k)
  }
}

function heap_sort(arr, n) {
  build_heap(arr, n);

  while(n > 0){
    exec(arr, 0, n--);
    sink(arr, n, 0)
  }
}

let arr = [4, 10, 2, 5, 1, 3];
heap_sort(arr, arr.length-1)
console.log(arr)