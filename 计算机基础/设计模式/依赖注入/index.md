## 依赖反转原则：  
> Dependency Inversion Principle，以一种特定的解耦形式，使高层次的模块不依赖低层次的模块的实现细节，依赖关系被颠倒，从而使得低层次模块依赖于高层模块的需求抽象。  
 
 ```
 // Fetch.js
 class Fetch {
   fetch() {
     return this.constructor.name
   }
 }
 export default Fetch;
 ```

 ```
 // main.js
 import Fetch from './Fetch'
 class Main {
   constructor(){

   }
   render(){
     let content = (new Fetch()).fetch()
     console.log(content)
   }
 }
 new Main()
 ```
 传统的依赖处理关系方式，高层次模块直接依赖低层次模块，限制了高层次模块的复用性。比如说我们想把main模块中的fetch换一成一个新的模块，这个新模块的API和原来的都不一样。  

 ```
 // service.js
 class Service {
   request(){
     throw `${this.constructor.name} 没有实现 request 方法！`
   }
 }
 class Ajax extends Service {
   request(){
     return this.constructor.name
   }
 }
 export default Ajax
 ```
 ```
import Service from './service.js'
class Main{
  constructor(){
    this.render()
  }
  render(){
    let content = (new Service).request()
    console.log('content from',content)
  }
}
new Main()
 ```
 Service作为抽象接口，它就是高层次模块和低层次模块需要共同遵守的契约。在高层次模块Main中，它默认Service有request方法来请求数据。在低层次模块，它也会遵守约定实现应该被复写的request方法。这样即使后来需要用axios来取代fetch，我们也只需要在Service.js中修改即可。

## 控制反转
> Inversion of Control，通过控制反转，对象在被创建时候，有一个控制系统内所有对象的外界实体，将其所依赖的对象的引用传递给它。可以说，依赖被注入到对象中。
大概意思就是将依赖对象的创建和绑定转移到被依赖对象类（Main）的外部来实现。实现控制反转最常见的方式是依赖注入。

## 依赖注入  
把过程放外面，把结果带入内部。
```
// utils.js
export const toOptions = params => 
  Object.entries(params).reduce((accu, cur) => {
    accu[cur[0]] = new cur[1]()
    return accu
  }, {})

// Main.js
class Main{
  constructor(options){
    Object.assign(this. options)
    this.render()
  }
  render(){
    let content = this.Service.request()
  }
}
export defautl Main
```  

```
// index.js
import Main from './Main.js'
import Service from './Service.js'
import Router from './Router.js'
import {toOptions} from './utils.js'
const option = toOptions({service, Router})
new Main(options)
```  
因为依赖注入把依赖的引用从外部引入，所以这里使用Object(this, options)的方式把依赖都加到this上。即使后续需要增加模块，也只需要在index.js引入即可。