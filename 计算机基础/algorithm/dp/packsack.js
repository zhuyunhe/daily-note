// 货物
const goods = [
  {
    weight: 2,
    value: 5
  },
  {
    weight: 4,
    value: 2
  },
  {
    weight: 3,
    value: 1
  },
  {
    weight: 5,
    value: 8
  },
  {
    weight: 1,
    value: 1
  }
];

/* 
背包问题，假设你是一个小偷，你背了一个背包（背包容积是有限的）去商店偷东西，商品都有各自的重量和价值并且每个商品都是不可分割的。
现在你想要偷走价值总和最多的商品，你该如何做？

假设你的背包容积为W，商店里有N个商品，我们用两个数组分别来存储这些商品的重量和价值。我们先简单推理一下，
对于我们的最佳组合，每个商品只有两个选择：放入背包和不放入背包。
因此，我们想要活动的最佳组合就只会出现在以下两种情况中：
1. 不拿第N个商品，只在剩下的N-1个商品中选出价值最高的组合。
2. 拿第N个商品，利用背包的剩余容积和剩余的N-1个商品再搞出来一个子最佳组合，此时总的最佳组合价值就是第N个商品的价值加上子最佳组合的价值。
上面这两种情况其实是背包问题的两个子问题。我们想要获得背包问题的最优解，那就要先找出这两个子问题的最优解，也就是说背包问题是具有最优子结构特性的。

如果某个商品的体积大于了背包的容积，那无论它多值钱，都放不进背包里去；如果凑巧商店里一样货物有没有，那你也只能空载而归了。

说到这儿，感觉可以用递归来操作啊，确实也是这样。那我们先写一下递归的代码。为了画图简单，假设我们先背包的容积为2，共有三个物品，每个物品的体积都为1，价值不一样。
我们用一颗二叉树来画一下上述代码的执行过程

从中可以看到，我们发现了熟悉的重叠子问题K(1,1)。到这里，我们可以看到，我们已经找到了另一个DP问题的必备条件，重叠子问题。so，接下来我们就可以用DP算来优化我们的代码来。


*/
// [4, 1, 2, 3, 4]
/* 
goods: 待选货物
volume: 容积
只保存结果，只要一维数组
*/
function dp(goods, volume){
  let volumeArray = new Array(volume+1).fill(0);
  let selectGoods = new Array(volume + 1);
  // 前i件物品放入容量为j的背包中
  for(let i=0; i<goods.length; i++) {
    for (let j = volume; j>0; j--){
      // j代表此时背包的容积
      if (j >= goods[i].weight) {
        if (volumeArray[j - goods[i].weight] + goods[i].value > volumeArray[j]){
          volumeArray[j] = volumeArray[j - goods[i].weight] + goods[i].value;
        }
      } else{
        break;
      }
    }
  }
  console.log(volumeArray);
  console.log(selectGoods);
}


function knapsack(weights, values, W) {
  var n = weights.length;
  var f = new Array(n)
  f[-1] = new Array(W + 1).fill(0)
  for (var i = 0; i < n; i++) { //注意边界，没有等号
    f[i] = new Array(W).fill(0)
    for (var j = 0; j <= W; j++) {//注意边界，有等号
      if (j < weights[i]) { //注意边界， 没有等号
        f[i][j] = f[i - 1][j]
      } else {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i]);//case 3
      }
    }
  }
  return f[n - 1][W]
}

// https://segmentfault.com/a/1190000012829866/
function _dp(goods, volume) {
  let result = new Array(goods.length+1);
  let select = []
  for(let i=0; i<result.length; i++) {
    result[i] = [];
    result[i] = new Array(volume+1).fill(0);
  }
  for(let i=1; i<=goods.length; i++){
    for(let j=0; j<=volume; j++){
      if(goods[i-1].weight <= j){
        result[i][j] = Math.max(result[i-1][j-goods[i-1].weight] + goods[i-1].value, result[i-1][j])
      } else{
        result[i][j] = result[i-1][j]
      }
    }
  }

  // 找出哪些物品被选了
  let j = volume;
  let optWeight = 0;
  for(let i=goods.length; i>0; i--){
    if (result[i][j] > result[i-1][j]){
      select.push(goods[i-1]);
      console.log(`选择了物品：${i}, 重量：${goods[i-1].weight}，价格：${goods[i-1].value}`);
      j = j - goods[i-1].weight;
    }
  }
  console.log('总重量：' + select.reduce((cur, b) => {
    return cur + b.weight
  }, 0) + ' 总价值：' + select.reduce((cur, b) => {
    return cur + b.value
  }, 0))
  console.log(result)
}
// dp(goods, 10)
/* 
goods：货物数组
n：第n件货物
volume：此时背包的剩余容积
*/
function recurse(goods, n, volume) {
  if(n === 0 || volume === 0){
    return 0;
  }
  if (goods[n].weight > volume){
    return recurse(goods, n-1, volume)
  } else{
    // 不选第n个物品
    let a = recurse(goods, n - 1, volume);
    // 选第n个物品
    let b = goods[n].value + recurse(goods, n - 1, volume - goods[n].weight)
    // 取二者中收益大
    return Math.max(a, b)
  }
}

console.log(recurse(goods, goods.length-1, 6))

_dp(goods, 6)