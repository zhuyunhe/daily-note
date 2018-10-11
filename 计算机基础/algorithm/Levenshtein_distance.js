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
function dynamicPlanning(a, b){
  let lenA = a.length;
  let lenB = b.length;
  let d = [];
  d[0] = [];

  for (let j = 0; j <= lenB; j++) {
    d[0].push(j);
  }

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

console.log(dynamicPlanning('abc', '2ssd'))

console.log(dynamicPlanningB('abc','2ssd'))