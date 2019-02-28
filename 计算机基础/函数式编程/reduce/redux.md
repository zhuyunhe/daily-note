# Redux  
我们首先看下Redux的类型签名：
```
redux :: ((state, action) -> state) -> initialState -> [action] -> state

redux :: (reducer, initialState, list) -> result
reducer :: (state, action) -> state
initialState :: state  
list :: [action]  
result :: state
```  
然后我们看一个简版Redux的实现：  
```
const redux = (reducer,initialState, list) =>{
  let state = initialState
  let action
  for(let i=0; i<list.length; i++){
    action = list[i]
    state = reducer(state, action)
  }
  return state
}
```
首先设置Redux state的初始值initialState，list代表基于时间的事件流列表，action=list[i]代表事件流上某个时间点发生的一次action。每次for循环，我们都将当前的状态state和action传给reducer，根据本次action对当前state进行更新，产生新的state，新的state作为下次action发生时的state参与状态更新。  
***  
在真实的Redux中，状态的改变和获取通过两个函数来操作：getState和dispatch。  
```
const redux = (reducer, initialState, list) => {
  let currentState = initialState
  let action

  const dispatch = action => {
    currentState = reducer(currentState, action)
  }
  const getState = () => currentState
  for(let i=0; i<list.length; i++){
    action = list[i]
    dispatch(action)
  }
  return state
}
```  
经过修改后，我们就能通过dispatch(action)来更新状态，通过getState来获取当前的状态。但是，我们的dispatch和getState接口也并没有暴露给外部，同时我们在Redux的最后return 了一个state，如果说list是一个无限长的列表的话，那return state貌似就没有意义了。  
***  
下面我们来实现一个可运行的最小Redux。  
```
const redux = (reducer, initialState) => {
  let currentState = initialState

  const dispatch = action => {
    currentState = reducer(currentState, action)
  }

  const getState = () => currentState

  return ({
    dispatch,
    getState
  })
}

const store = redux(reducer, initialState) 
const action = {type, payload}
store.dispatch(action)
store.getState()
```  
我们将list从Redux函数中抽离了出来，首先通过reducer和initialState初始化redux为store，每次触发action时，我们通过store.dispatch(action)更新store中的状态；同时通过store.getState()来获取store当前的状态。在上面的代码中，我们用到了闭包来保持store的状态，dispatch和getState都捕获了Redux内部的currentState，形成了闭包。  
***
Redux将所有的事件抽象为action，无论是用户点击、ajax请求或是刷新页面，只要有新的事件发生，我们就会dispatch一个action给reducer，并结合上一次的状态计算出本次状态。通过抽象出统一的事件接口，简化了处理事件的复杂度。


