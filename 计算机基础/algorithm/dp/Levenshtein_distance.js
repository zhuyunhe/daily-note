//最短编辑距离算法（Levenshtein distance）
/**
 * 递归算法
 * @param {string} a
 * @param {string} b
 * @param {number} i 字符串 a 的长度
 * @param {number} j 字符串 b 的长度
 * @returns {number} 从 a → b 的最小编辑距离
 */
function recursion(a, b, i, j){
  if(j === 0){
    return i
  } else if(i === 0){
    return j
  } else if(a[i-1] === b[j-1]){
    return recursion(a, b, i-1, j-1)
  } else{
    let m1 = recursion(a, b, i - 1, j) + 1
    let m2 = recursion(a, b, i, j - 1) + 1
    let m3 = recursion(a, b, i - 1, j - 1) + 1
    return Math.min(m1, m2, m3)
  }
}


/** 
* 动态规划算法
* @param {string} a
* @param {string} b
* @return {number} 从 a -> b 的最小编辑距离
*/
/* 
思路：动态规划看起来跟递归很像，不过推理逻辑正好是反过来的。递归的逻辑是：“要求得 d[m][n]，先要求得 d[m-1][n-1]……”，动态规划的逻辑是：“先求得 d[m-1][n-1]，再求 d[m][n]……”这是它们的主要区别。
举个例子，在已知 d[0][0]，d[0][1]，d[1][0] 的前提下，要求 d[1][1]：

如果 a[1] === b[1]，那么 d[1][1] 等于 d[0][0]，也就是 0；
如果 a[1] !== b[1]，那么 d[1][1] 等于 d[0][1]、d[1][0] 和 d[0][0] 三者中的最小值 + 1，也就是 1。
接着用同样的方式，可以求得 d[1][2]、d[1][3]、……、d[1][n]，然后继续求得 d[2][1]、d[2][2]、……、d[2][n]，一直到 d[m][n]

*/
function dynamicPlanning(a, b){
  let lenA = a.length;
  let lenB = b.length;
  let d = [];
  d[0] = [];

  for (let j = 0; j <= lenB; j++) {
    d[0].push(j);
  }
  console.log(d)
  for (let i = 0; i <= lenA; i++) {
    if (d[i]) {
      d[i][0] = i;
    } else {
      d[i] = [];
      d[i][0] = i;
    }
  }
  console.log(d)
  for(let i=1; i <= lenA; i++){
    for(let j=1; j <= lenB; j++){
      if(a[i-1] === b[j-1]){
        d[i][j] = d[i-1][j-1]
        console.log(d)
      } else{
        let m1 = d[i - 1][j] + 1;
        let m2 = d[i][j - 1] + 1;
        let m3 = d[i - 1][j - 1] + 1;
        d[i][j] = Math.min(m1, m2, m3);
      }
    }
  }

  console.log(d)
  return d[lenA][lenB]
}

/** 
 * 优化了空间复杂度的动态规则算法
 * 优化了空间复杂度
 */
function dynamicPlanningB(a, b) {
  let lenA = a.length
  let lenB = b.length
  let d = []
  d[0] = []

  for(let j=0; j <= lenB; j++){
    d[j] = j
  }

  let old
  for(let i=1; i <= lenA; i++){
    old = i - 1
    d[0] = i
    for(j = 1; j <= lenB; j++){
      temp = d[j]
      if(a[i-1] == b[j-1]){
        d[j] = old
      } else{
        d[j] = Math.min(d[j] + 1, d[j-1] + 1, old + 1);
      }
      old = temp
    }
  }
  console.log(d)
  return d[lenB]
}

console.log(dynamicPlanning('abc', 'assd'))

// console.log(dynamicPlanningB('abc','2ssd'))