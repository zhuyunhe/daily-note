## thunk  
thunk是一个计算机编程的术语，表示辅助调用另一个子程序的子程序。  
```
const f = x => x()+5
const g = () => 1+2
f(g)  // 结果：(1+2)+5 = 8
```  
上面这种写法看起来有点奇怪，但好处就是g只有在f实际执行时才执行，可以起到延时执行的作用。