## 场景  
一个销售录单页面中有一个输入框需要输入销售输入一串商户id，用英文逗号分隔，例如：123,222,123,345。在提交时，需要进行去重操作，以防商户误操作。  
利用ES6的Set简单实现  

```
let shopIds = '123,222,123,345';
let _set = new Set(shopIds.split(','));
let _arr = [..._set];
shopIds = _arr.toString();
```  

## 场景  
继续上一个场景，加入这时候需要删除`shopIds`这个字符串里的某个shopId。我们需要利用正则表达式来做。  

```
// 删除''这个shopId 
let shop = '123';
let shopIds = '123,222,123,345';
// 字符串首尾手动添加分隔符  
shopIds = ',' + shopIds + ',';
shopIds = shopIds.replace(new RegExp('\,?' + shop + '\,?', 'g'), ',');
// 去除多余分隔符
shopIds = shopIds.replace(/^\,(.+)\,$/, '$1');
```