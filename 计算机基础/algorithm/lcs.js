/**
 * LCS: longest common sequence
 * 最长公共子序列
 * d[i][j] = d[i-1]d[j-1], 当i>0,j>且a[i-1] = b[j-1]
 * d[i][[j] = max{d[i-1][j], d[i][j-1]}, 当i>0,j>且a[i-1] != b[j-1]
*/
let a = ['a', 'b', 'c', 'd', 'e']
let b = ['b', 'f', 'd', 'q', 'w']

/**
 * 动态规划算法求LCS
 * @param {Array} a
 * @param {Array} b
 */
function lcs(a, b){
  let lenA = a.length
  let lenB = b.length
  let d = []
  d[0] = []

  let public = []
  if(lenA === 0 || lenB === 0){
    return 0
  }
  for(let j=0; j<=lenB; j++){
    d[0].push(0)
  }

  for(let i=1; i<=lenA; i++){
    d[i] = []
    d[i][0] = 0
  }
  
  for(let i=1; i<=lenA; i++){
    for(let j=1; j<=lenB; j++){
      if(a[i-1] === b[j-1]){
        public.push(a[i-1])
        d[i][j] = d[i-1][j-1] + 1
      } else {
        d[i][j] = Math.max(d[i-1][j] , d[i][j-1])
      }
    }
  }

  //观察数组结果
  for(let k=0; k<d.length; k++){
    console.log(d[k])
  }
  //打印出最长公共子序列
  console.log(public)
}

//test
lcs(a, b)