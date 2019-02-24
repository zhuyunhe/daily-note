/* 
更轻松的复用和配置
减少样板代码，避免频繁调用相同参数的函数
得到一个针对性更强的函数
*/


const price_A = 500
const price_B = 800



function discount(price, discount) {
  return price * discount
}

function _discount(dis){
  return price => {
    return discount(price, dis)
  }
}
const tenPercentDiscount = _discount(.1)
const vipPercentDiscount = _discount(.05)

//discount函数相当于具有某类功能的通用型机器，经过柯里化后，可以传入一些特殊的零件，变成可以应用于具体场景的专用机器。

const price_a = tenPercentDiscount(price_A)
const price_b = tenPercentDiscount(price_B)

const price_c = vipPercentDiscount(price_A)

console.log(price_a);
console.log(price_b);
console.log(price_c);


class DisCount{
  count()
}