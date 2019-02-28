# reduce 
reduce是对列表的迭代操作的抽象，几乎所有的列表迭代操作map、filter等都可以基于reduce来实现。  
## 例子  
### reduce实现map
```
const map = f => arr => arr.reduce((accumulator,x) => {
  accumulator.push(f(x))
  return accumulator
}, [])
```

### reduce实现filter  
```
const filter = f => arr => arr.reduce((accumulator,x) => {
  f(x) && accumulator.push(x)
  return accumulator
}, [])
```  

### reduce实现forEach  
```
const forEach = f => arr => arr.reduce((accumulator,x) => {
  x = f(x)
  accumulator.push(x)
  return accumulator
}, [])
```  

## reduce函数类型签名  
```
reduce :: ((a, b) -> a) -> a -> [b] -> a  
把它拆开来看，更方便理解
reduce :: (reducer -> initialValue -> list) -> result  

reducer :: (a, b) -> a
initialValue :: a
list :: [b]  
result :: a
```   
reduce接受三个参数：累积器reducer、累积初始值initialValue和待累积列表。我们迭代遍历列表的元素，利用累积器reudcer对累积值和列表当前元素进行累积操作，reducer输出的新累积值作为下次累积操作的输入。这样依次循环迭代，直到遍历结束，输出最终的累积值。  

***

reduce在某些编程语言中也被成为**fold**，中文翻译为折叠、归约等。我们可以把列表当作一把展开的扇子，列表中的每个元素做扇骨，则reduce的过程可以看成从左到右折叠扇子的过程，即**foldl**，当然我们也可以从右向左折叠上字，即reduceRight，**foldr**。

reduce代码实现：  
```
const reduce = (reducer, initialValue, list) => {
  if(list.length === 0) return initialValue
  if(list.length === 1) return list[0]
  let acc = initialValue || list[0]
  let val
  for(let i= initialValue ? 0 : 1; i<list.length; i++){
    val = list[i]
    acc = reducer(acc, val)
  }
  return acc
}
const sum = (a,b) => a+b
reduce(sum,1, [1,2,3,4,5])
//16
```
https://tech.meituan.com/2017/10/12/functional-programming-in-redux.html