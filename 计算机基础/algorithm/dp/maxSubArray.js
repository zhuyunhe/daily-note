/* 
题目：
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
*/
/* 
分治解法
*/



const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// const nums = [-2, -3, 1, -5]
function divideSolution(nums=[]){
  if(nums && nums.length===1){
    return nums[0]
  }
  let currentSum = maxSum = nums[0];
  let begin = 0
  let end = 0
  for(let i=1; i<nums.length; i++){
    if (nums[i] > currentSum + nums[i]){
      begin = i
      currentSum = nums[i]
    } else {
      currentSum = currentSum + nums[i]
    }
    if (currentSum > maxSum){
      end = i      
      maxSum = currentSum
    } 
  }
  console.log(`begin: ${begin}, end: ${end}`)
  console.log(nums.slice(begin, end+1))
  return maxSum
}

/* 
贪心法
*/
function _divideSolution(nums = []) {
  if (nums && nums.length === 1) {
    return nums[0]
  }
  let currentSum = maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i] + currentSum, nums[i])
    maxSum = Math.max(maxSum, currentSum)
  }
  return maxSum
}

/* 
dp[i]是以第i个元素为结尾的子数组sub[0,1,..,i]的和，dp[i] = max(arr[i], arr[i] + dp[i-1])
*/
function solution(nums){

}

function dpSolution(nums = []) {
  let currentSum = 0;
  let maxSum = nums[0]
  const result = []
  result[0] = nums[0]
  for(let i=1; i<nums.length; i++){
    result[i] = Math.max(result[i-1]+nums[i], nums[i])
    maxSum = Math.max(result[i], maxSum)
  }
  console.log(result)
  return maxSum
}

console.log(dpSolution(nums))