# JSX
JSX是JavaScript的语法扩展，让我们在JS中可以编写HTML一样的代码。  
JSX中使用的“元素”不局限于HTML中的元素，可以是任何一个React组件。  
JSX语法的基本规则：  
1、遇到HTML标签（以<开头），就用HTML规则解析；遇到代码块（以{开头），就用JavaScript规则解析。  
2、JSX允许直接在模板插入JavaScript变量。如果这个变量是一个数组，则会展开这个数组的所有成员。  

## 注意事项  
为什么不能在JSX中使用for或者while这样的循环语句？  
因为，JSX中可以使用任何形式的JavaScript表达式，只要JavaScript表达式出现在符号{}之间，但是也只能是JavaScript“表达式”，for或者while产生的是“语句”而不是“表达式”，所以不能出现for或者while。归根结底，JSX最终会被babel转换成一个嵌套的函数调用，在这个函数调用中自然无法插入一个语句进去。