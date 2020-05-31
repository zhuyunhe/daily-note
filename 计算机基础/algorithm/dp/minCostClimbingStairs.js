const cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
// const cost = [10, 15, 20]
function _(cost) {
  let dp = new Array(cost.length+1).fill(0)
  
  for(let i=2; i<=cost.length; i++){
    dp[i] = Math.min((dp[i-1] + cost[i-1]), (dp[i-2] + cost[i-2]))
  }
  console.log(dp)
  return dp[cost.length]
}

console.log(_(cost))