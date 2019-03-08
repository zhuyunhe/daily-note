/* 
EventEmitter本质上是一个观察者模式的实现，所谓的观察者模式就是：它定义了对象间一种一对多的关系，让多个观察者对象同时监听某一个主体对象，
当主体对象发生改变时，所有依赖于它的对象都将得到通知。
下面我们实现一个包含emit和on方法的EventEmitter类。
*/
class EventEmitter{
  constructor(){
    this.handler = {}
  }

  on(eventName, callback){
    if(!this.handler){
      this.handler = {}
    }
    if(!this.handler[eventName]){
      this.handler[eventName] = []
    }
    this.handler[eventName].push(callback)
    //链式调用
    return this
  }

  emit(eventName, ...arg){
    if(this.handler[eventName]){
      this.handler[eventName].forEach(function(f){
        f(...arg)
      })
    }
    //链式调用
    return this
  }
}

const ev = new EventEmitter()
ev.on('sayName',function(name){
  console.log(name)
}).on('sayJob', function (job) {
  console.log(job)
})

ev.emit('sayName', 'zhuyunhe').emit('sayJob', 'rd').emit('sayJob', 'boss')
