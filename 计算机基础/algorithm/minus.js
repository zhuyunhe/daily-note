
// 两个大浮点数相减
function minus(a, b) {
  let index_a = a.indexOf('.')
  let index_b = b.indexOf('.')

  let left_a = index_a !== -1 ? a.slice(0, index_a) : a
  let right_a = index_a!== -1 ? a.slice(index_a+1) : '0'

  let left_b = index_b !== -1 ? b.slice(0, index_b) : b
  let right_b = index_b !== -1 ? b.slice(index_b + 1) : '0'
  console.log('left_a', left_a)
  console.log('left_b', left_b)

  while (right_a.length > right_b.length) {
    right_b += '0'
  }

  while(right_b.length > right_a.length){
    right_a += '0'
  }
  const float_length = right_a.length

  let int = 0
  let float = 0
  let res = ''
  if(Number(left_a) > Number(left_b)){
    if(Number(right_a) >= Number(right_b)){
      int = Number(left_a) - Number(left_b)
      float = Number(right_a) - Number(right_b)
      while ((float + '').length < float_length) {
        float = '0' + float
      }
    } else{
      left_a = Number(left_a) - 1
      right_a = '1' + right_a
      int = Number(left_a) - Number(left_b)
      float = Number(right_a) - Number(right_b)
      while ((float + '').length < float_length) {
        float = '0' + float
      }
    }
    res = int + validFloat('.' + float)
  }
  else if (Number(left_a) === Number(left_b)){
    if (Number(right_a) >= Number(right_b)){
      float = Number(right_a) - Number(right_b)
      while ((float + '').length < float_length) {
        float = '0' + float
      }
      res = '0' + validFloat('.' + float)
    } else{
      float = Number(right_b) - Number(right_a)
      while ((float + '').length < float_length) {
        float = '0' + float
      }
      res = '-0' + validFloat('.' + float)
    }
  } else {
    res = '-' + minus(b, a)
  }

  return res
}

function validFloat(val) {
  while (val.slice(-1) === '0') {
    val = val.slice(0, val.length-1)
  } 
  if(val === '.'){
    return ''
  }
  return val
}

console.log(minus('1740', '172.91'))

