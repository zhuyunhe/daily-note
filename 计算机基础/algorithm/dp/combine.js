const l = console.log

// 求出字符串s的所有排列组合
function combine(s){
  if(s.length === 1){
    return [s]
  }
  let arr1 = combine(s.slice(1))
  // 包括第一个元素的
  let res1 = arr1.map(x => s[0]+x)
  console.log(res1)
  let res2 = combine(s.slice(1))
  return res1.concat(res2) 

}


l(getPerputation2('abc'))

function getCombination(str) {

  if (str.length === 1) {
    return [str]
  }

  let arr1 = getCombination(str.slice(1));
  console.log('arr1: ',arr1)
  let res1 = arr1.map(x => str[0] + x);
  let res2 = getCombination(str.slice(1));
  console.log('arr2: ' + res2)
  let res3 = [str[0]]
  return res1.concat(res2, res3);
}

function getPerputation2(str) {
  if (str.length == 1) {
    return [str];
  }
  let res = [];
  for (let i = 0; i < str.length; i++) {
    let restStr = str.slice(0, i) + str.slice(i + 1);
    let restArr = arguments.callee(restStr);
    restArr = restArr.map(x => str[i] + x);
    res = res.concat(restArr);
  }
  console.log(res)
  return res;
}
