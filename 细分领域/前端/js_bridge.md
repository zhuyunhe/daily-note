# JSBridge  

## JSBridge引入  
- Native端引入  
JavaScript在调用时，要优先判断JSBridge是否已经成功注入。
- 由JavaScript端引入  
JavaScript端可以确定JSBridge的存在，直接调用即可；缺点是JS端需要处理版本兼容问题。


## JavaScript调用Native  
JavaScript调用Native的方式主要有两种：注入API和拦截URL SCHEME。 

- 注入API  
注入 API 方式的主要原理是，通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。

- 拦截URL SCHEME  
URL SCHEME是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的。  
拦截 URL SCHEME 的主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。  
拦截URL SCHEME有以下两个缺陷：
  
  - 使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。
  - 创建请求，需要一定的耗时，比注入 API 的方式调用同样的功能，耗时会较长，如果遇到批量的创建请求，会造成阻塞。  

  ## Native调用JavaScript  
  Native调用JavaScript其实就是执行拼接JavaScript字符串，从外部调用JavaScript中的方法，因此JavaScript的方法必须挂在全局的window上。