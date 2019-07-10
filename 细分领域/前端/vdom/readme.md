# 虚拟DOM（Virtual DOM）
> 虚拟DOM最大优势在于抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的DOM，可以是安卓和IOS的原生组件，也可以是小程序等。  

简单来说，虚拟DOM就是一个普通的JavaScript对象，包含了tag、props、children三个属性。  
```
<div id="app">
  <p class="text">
    hello world~
  </p>
</div>
```   
上面的HTML转换为虚拟DOM如下：  
```
{
  tag: 'div',
  props: {
    id: 'app'
  },
  chidren: [
    {
      tag: 'p',
      props: {
        className: 'text'
      },
      chidren: [
        'hello world!!!'
      ]
    }
  ]
}
```   
该对象就是我们常说的虚拟DOM，原生DOM因为浏览器厂商需要实现众多的规范（各种HTML5属性、DOM事件等），即使创建一个空的div，也是要付出昂贵的代价。虚拟DOM提升性能的点在于DOM发生变化的时候，通过diff算法对比JavaScript对象，计算出需要变更的DOM，然后只对变化的DOM进行操作，而不是更新整个视图。  

## h函数  
主流的虚拟DOM库，通常都有一个h函数，也就是React中的React.createElement以及Vue中的render方法中用到的createElement，这个方法通常会返回一个虚拟节点描述对象，通常简称为‘VNode‘。由众多’Vnode‘组成的树，我们称之为虚拟Dom（Virtual DOM）。  
## diff算法  
https://juejin.im/post/5d085ce85188255e1305cda1