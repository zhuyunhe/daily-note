/* 
题目：给定一个序列arr = [3, 20, 4, 10, 5, 7]，能否在这个数组中找出几个数字，使得这几个元素的值相加等于9。
思路：假设数组里所有数字都是Number类型，定义一个状态 subSetSum(arr, n, sum)，表示在有n个元素的数列arr中，是否存在一个子数列，满足子数列的值求和等于sum，如果存在subSetSum(arr, n, sum)为true，反之如果不存在，subSetSum(arr, n, sum)为false。
如果存在这种满足条件的数列的话，该数列存在于以下两种情况中：
1. 数列包括了第n个元素，并且存在一个子数列，并且该子数列满足 subSetSum(arr, n-1, sum-arr[n-1]) 为 ture
2. 数列不包括第n个元素，但是存在一个子数列，并且该子数列满足 subSetSum(arr, n-1, sum-arr[n-1]) 为ture

基于上面的分析，我们可以写出一个
状态转移方程：subSetSum(arr, n, sum) = subSetSum(arr, n-1, sum-arr[n]) || subSetSum(arr, n-1, sum)
然后我们需要考虑几种极端情况（终止条件）：
1 - sum等于0时，subSetSum(arr, n, sum)为true
2 - n为0时，也就是说给定的数列arr是空的时候，如果sum不为0，那subSetSum(arr, n, sum)肯定是false；如果此时碰巧sum也是0，那问题相当于一个空数列arr=[]中是否能找出几个数字加起来值为0，这种情况下我们认为subSetSum(arr, n, sum)是true
3 - 如果第n个元素的值，比sum都大，那满足条件的数列中肯定是不能包括这个元素的

然后我们就可以很写出下列递归代码
*/
const arr = [1, 3, 4, 2];
const sum = 5;
function rec_subset(arr, n, sum) {
  if (sum === 0) {
    return true;
  }
  if (n === 0 && sum !== 0) {
    return false;
  }
  if (arr[n - 1] > sum) {
    return rec_subset(arr, n - 1, sum)
  } else {
    return rec_subset(arr, n - 1, sum - arr[n - 1]) || rec_subset(arr, n - 1, sum)
  }
}

console.log(rec_subset(arr, arr.length, sum))

/* 
我们可以用DP的方法来优化上述递归算法，我们创建一个二维表格subset，表格中某一项目subset[i][j]表示在0~i个元素组成的数列中是否存在一个子数列满足子数列元素的求和等于j。
这里我们把subset[i][j]就是定义为这个问题的状态，根据上面递归的状态转移方程，我们推导出DP算法的状态转移方程为：
subset[i][j] = subset[i-1][j] || subset[i-1][j-arr[i]]

        0   1   2   3   4   5   6   7   8   9  
3   0   t   f   f   t   f   f   f   f   f   f
20  1   t
4   2   t
10  3   t
5   4   t
7   5   t

*/
function dp_subset(arr, sum){
  let result = new Array(arr.length);
  for (let i = 0; i < result.length; i++) {
    result[i] = [];
    result[i] = new Array(sum+1).fill(false);
  }
  for(let i=0; i<arr.length; i++){
    for(let j=0; j<=sum; j++){
      if(j===0){
        result[i][j] = true;
        continue;
      }
      if(i===0){
        result[i][j] = arr[i] === j;
        continue;
      }
      if(arr[i] > j){
        result[i][j] = result[i-1][j]
      } else {
        try {
          result[i][j] = result[i - 1][j] || result[i - 1][j - arr[i]] 
        } catch (error) {
          console.log(`i: ${i}, j: ${j}`)
        }
      }
    }
  }
  console.log(result)
}

function _dp_subset(arr, sum) {
  let subset = new Array(arr.length);
  for (let i = 0; i < subset.length; i++) {
    subset[i] = [];
    subset[i] = new Array(sum + 1).fill(false);
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j <= sum; j++) {
      if (j === 0) {
        subset[i][j] = true;
        break;
      }
      if (i === 0) {
        subset[i][j] = arr[i] === j;
        break;
      }
      if (arr[i] > j) {
        subset[i][j] = subset[i - 1][j]
      } else {
        try {
          subset[i][j] = subset[i - 1][j - arr[i]] || subset[i - 1][j]
        } catch (error) {
          console.log(`i: ${i}, j: ${j}`)
        }
      }
    }
  }
  console.log(subset)
}

 dp_subset(arr, 6)