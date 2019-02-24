# Pointfree  
> Pointfree style means never having to say your data.It means functions that never mention the data upon which they operate.   

Pointfree的本质就是使用一些通用的函数，组合出各种复杂运算，上层运算不要直接操作数据，而是通过底层函数去处理。柯里化和组合将一起配合来实现pointFree。  

```
// not pointfree because we mention the data: word
const snakeCase = word => word.toLowerCase().replace(/\s+/ig, '_')

//pointfree
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase)
```