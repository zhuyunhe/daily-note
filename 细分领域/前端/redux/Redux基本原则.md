Flux的基本原则是“单向数据流”，Redux在此基础上强调三个基本原则： 

* 唯一数据源(Single Source of Truth)  
应用的状态数据应该只存储在唯一的一个Store上。
* 保持状态只读(State is read-only)  
状态只读就是说不能直接去修改状态，要修改store的状态，必须通过派发一个action对象完成。  
* 数据改变只能通过纯函数完成(Changes are made with pure functions)  

> 如果你愿意限制做事方式的灵活度，你几乎总会发现可以做得更好。