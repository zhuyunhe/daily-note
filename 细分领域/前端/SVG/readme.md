# SVG-可缩放矢量图形  
SVG是一种vector图像文件格式。这使得它与其他图像格式（如PNG、JPG或者GIF）有很大的不同，后者是光栅图像文件格式。  
SVG图像是矢量图像，可以无限缩放并且图像质量不会下降。这是因为SVG图像是使用XML标记构建的，浏览器通过绘制每个点和线来打印它们，而不是用预定义像素填充某些空间。  
由于是在XML中定义的，SVG图像比JPG或PNG图像更灵活，我们可以用CSS和JS与它们进行交互。  
SVG可以渲染比其他格式小的多的矢量风格图像，主要用于标识和插图。  
SVG当前的版本是1.1，SVG2.0正在研发。  
## SVG元素  
SVG有许多不同的元素。最常用的是：  
* text：创建一个text元素
* circle：创建一个圆
* rect：创建一个矩形
* line：创建一条线
* path：在两个点之间创建一条路径
* textpath：在两个点之间创建一条路径，并创建一个链接文本元素
* polygon：允许创建任意类型的多边形
* g：单独的元素

- 入门  
[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)  
- 实践  
[使用SVG和Vue.js构建动态树图](https://juejin.im/post/5d2806fb518825121c0058d8)