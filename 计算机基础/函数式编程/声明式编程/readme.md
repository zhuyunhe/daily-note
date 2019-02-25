# Declarative Coding-声明式编程  
和声明式编程相对应的是命令式编程（Imperative Coding）,下面是一个简单的例子对比。  
```
//imperative
const makes = []
for(let i=0; i<cars.length; i++){
  makes.push(cars[i].make)
}

//declarative
const makes = cars.map(car => car.make)
```