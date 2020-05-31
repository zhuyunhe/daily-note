- 数组去重  
```
let a = [1,2,1,3,2,4,5]
let b = [...new Set(a)]
```

- 置空数组  
有时候我们需要清空一个数组，最快捷的办法就是把数组的```length```属性设置为0。  

- 数组自动填充数据  
```
var a = new Array(10).fill(1)
```  

- 数组合并  
```
let a = [1,2,3];
let b = [4,5,6];
let c = [...a, ...b]
```  
 - 两个数组求交集  
 先把数组去重，然后利用```filter```和```includes```方法  

 ```
 let a = [1,2,1,3,4];
 let b = [5,6,5,6,7,8];
 [...new Set(a)].filter(item => b.includes(item))
 ```   

 - 从数组中删除虚值(```undefined, '', 0, false, NaN, null```)  
 ```
 let a = [undefined, '', 0, false, NaN, null, 1, 2]
 a.filter(Boolean)
 ```

 - 数组转对象,把保存样式的数组转成对象
 ```
let a = ['margin-top: 10px', 'color: #f00'];  

a.filter(Boolean).reduce((cur,next){
  let _s = next.split(':');
  cur[_s[0]] = _s[1].trim();
  return cur
}, {})
 ```