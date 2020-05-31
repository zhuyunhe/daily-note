/* 
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

注意：你不能在买入股票前卖出股票。

*/
var prices = [7, 1, 5, 3, 6, 4, 8, 3]
/* 暴力法，时间和空间复杂度较高的写法，会造成heap out of memory */
var maxProfit = function (prices) {
  let profit = [];
  profit[0] = []
  profit[0][0] = 0
  let max = 0
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1 ; j < prices.length; j++) {
      max = Math.max(prices[j]-prices[i], max)
    }
  }
  return max
}


var _maxProfit = function (prices) {
  if(prices && prices.length > 0){
    let profit = new Array(prices.length).fill(0);
    for (let i = 1; i < prices.length; i++) {
      // console.log('=========')
      for (let j = 0; j < i; j++) {
        if (prices[i] > prices[j]) {
          // console.log(`i: ${i}, j: ${j}, profit[${i}]: ${profit[i]}, x: ${prices[i] - prices[j]}`)

          profit[i] = Math.max(profit[i], prices[i] - prices[j])
        } else {
          profit[i] = profit[i - 1]
        }
      }
      // console.log(`profit[${i}]: ${profit[i]}`)
    }
    // console.log(profit)
    return profit[prices.length - 1]
  } else {
    return 0
  }
};

var __maxProfit = function (prices) {
  let minPrice = Math.pow(2, 31) - 1
  let max = 0
  for(let i=0; i<prices.length; i++) {
    if (prices[i] < minPrice){
      minPrice = prices[i]
    }
    if (prices[i] - minPrice > max){
      max = prices[i] - minPrice
    }
  }
  return max
}

console.log(maxProfit(prices))
console.log(_maxProfit(prices))
console.log(__maxProfit(prices))