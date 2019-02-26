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
reduce :: ((a, b) -> a) -> a -> [b] -> a  
reducer :: (a, b) -> a
```