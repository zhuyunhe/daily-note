# Compose组合  
函数组合有点像函数栽培，你就是函数管家，选择两个你想结合的函数，让它们发生化学反应，产生一个新函数。  
```
const compose = (f, g) => x => f(g(x))
```  
用例：  
```
const toUpperCase = x => x.toUpperCase()
const exclaim = x => `${x}`
const shout = compose(exclaim, toUpperCase)
shout('stop')
```  

组合是满足数学结合律的，只要被组合的函数（算子）位置不变，组合顺序（运算顺序）不会对函数执行（运算）结果产生影响。  
```
compose(toUpperCase, compose(head, reverse))
compose(compose(toUpperCase,head), reverse)
```  
合理利用这种结合（associativity）的特性，能给我们打程序带来极大的灵活性。
* Any group of functions can be extracted and bundled together in their very own composition.  
任意一组函数都能以其自己的方式被组合，其结果又可以与其他函数组合成新的函数。。
```
const loadLastUpper = compose(exclaim, toUpperCase, head, reverse)  
// --or-------
const last = compose(head, reverse)
const loadLastUpper = compose(exclaim, toUpperCase, last)
```  
以上两种写法并没有好坏对错，但如果某些过程例如last能复用的话，最好像上述第二种方式一样做。