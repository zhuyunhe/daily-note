当一个包含ref属性的组件完成装载(mount)过程的时候，会看一下ref属性是不是一个函数，如果是，就会调用这个函数，参数就是这个组件代表的DOM元素。注意，是DOM元素，而不是Virtual DOM元素，通过这种方法，我们的代码可以访问到实际的DOM元素。  
在实际开发中，应该尽量避免ref的使用，尽量使用状态绑定的方法来获取元素的值。