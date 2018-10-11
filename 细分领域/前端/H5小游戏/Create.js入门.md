Create.js简介：  
Create.js是一个轻量级的游戏引擎，它其实是一套H5小游戏开发工具，其包含四个独立的包，可以组合使用快速开发一款简单的H5小游戏。  
1. EaselJS - 游戏中sprite、动画、向量等绘制
2. TweenJS - 补间动画，类似于[GASP](https://github.com/greensock/GreenSock-JS)
3. SoundJS - 游戏中音频资源控制
4. PreloadJS - 游戏图片、音频等资源的预加载器  
关于上述四个部分的介绍，可以参考[createjs新司机开车指南](https://juejin.im/entry/5b5d2efde51d4519503b5753?utm_source=gold_browser_extension)

### H5小游戏开发常见问题梳理
- 1、canvas移动端适配  
  首先要清楚canvas是一张画布，可以理解成一张图片，我们在css中设置的canvas高宽都只是在canvas真正高宽上等比缩放的。通常一个H5小游戏是占满全屏的，例如我们拿到的psd视觉稿的大小是750 * 1334像素，那最简单的方法就是一开始就把canvas的width和height属性手动设置成750和1334，然后在利用css样式把canvas的css样式设置成height:100%;width:100%.   

  ```
      <canvas id="myCanvas" style="width:100%; height: 100%"></canvas>

  ```  
  ```
    let canvas = document.getElementById('myCanvas')
    canvas.width = 750
    canvas.height = 1334
  ```  
- 2、如何让游戏动起来  
  如果不用H5游戏框架（creatjs.js、PIXI等），我们要让canvas上绘制的元素动起来，通常是利用全局的requestAnimationFrame、setTimeout或setInterval方法，自己维护一个定时器（Ticker），然后在每一个时钟周期里去（每隔多少毫秒）改变元素的某些属性，产生动画效果。这个过程通常被称为‘animation loop’。 但如果我们使用框架开发的话，基本每个框架都会维护一个中央定时器，例如EaselJS就暴露一个Ticker类，提供了静态的方法对不同的对象提供一个tick心跳。  
  ```
  createjs.Ticker.on("tick", tick);  
  function tick() { console.log("TICK!!!"); }
  ```  
  需要注意的一点是，如果你在tick函数内改变了元素位置，别忘了改变之后要调用'stage.update()'方法来更新canvas，这样才能看到效果。  

- 3、支持移动端Touch  
  EaselJS事件默认是不支持移动端Touch设备，需要手动开启支持。  
  ```
  createjs.Touch.enable(stage)
  ```   
  
  
## 游戏开发基本姿势  
### 准备资源  
大部分游戏中的角色、背景都是由一张张图片构成的，一些连贯的动画我们需要用一张张连续的图片来组成一个Sprite，合理使用TexturePacker等工具可以帮助我们快速拼合出一张Sprite图片。  
准备好资源后，我们接下来要做的就是导入资源和创建舞台了。  

```
//借助PreloadJS倒入资源，方便后面取用
loader.loadManifest([
  {
    id: 'gamebg',
    src: '//p1.meituan.net/dpgroup/99427c6725fbe874bc268b96c02d25e313865.jpg'
  }
])
```


### 面向对象  
一个游戏舞台中可能存在多个不通的角色，每个角色都有自己的属性和行为。例如一个奔跑的小人，他拥有自己的位置、移动方向、速度、动作（跑动、起跳、消失）等，这时就需要利用面向对象的开发思想，借助ES6的语法把这个角色的属性和行为封装成一个类，方便我们使用。这个类一般会继承你选择的H5游戏框架中的某个容器类型的类。简而言之就是把游戏各个部分模块化。  
```
/* 计分器 */
class Score extends createjs.Container{
  constructor({loader, stageWidth, stageHeight}){
    super()
    this.score = 0
    this.bomb = 0


    let bg = new createjs.Bitmap(loader.getResult('scoreBg'))
    
    this.addChild(bg)

    let bonuds = this.getBounds()
    this.x = stageWidth - bonuds.width
    this.y = 160  

    this.desc = new createjs.Text('已获得红包', "26px Arial", "#fff")
    this.desc.y = 30
    this.desc.x = 20    
    this.addChild(this.desc)
    
    this.scoreText = new createjs.Text('X' + this.score, "34px Arial", "#ffe115")
    this.scoreText.y = 26
    this.scoreText.x = 156  

    this.addChild(this.scoreText)    
  }

  //加一分
  addOne(){
    this.score ++ 
    this.scoreText.text = 'X' + this.score
  }

  //炸弹+1
  addOneBomb(){
    this.bomb ++
  }
}
```
上面这个类可以用来实例化一个红包雨游戏中的计分器，它拥有自己的样式图片和两个方法。游戏中的其他角色也可以用类似的方法来进行封装。

### 常用小工具函数整理
小游戏开发中常常会用到一些简单的算法，例如获取随机数、找最大公约数、最小公倍数等等，将这些方法统一整理在一个一个工具类中，可以方便使用。  

### 流程梳理  
H5小游戏一般比较简单，但如果能在开发前期梳理出游戏的大致流程，理清游戏中每个角色需要实现的功能，会起到事半功倍的效果。游戏的难易程度应该有相应一系列参数去控制，方便老板调整。

### 封装  
一般一个H5小游戏都会构建一个游戏类来承载，当我们做好一个H5小游戏后，可以用打包工具（例如Rollup等）把这个游戏类打包封装，然后可以发布到npm，方便我们复用。  

## 参考
[createjs编写H5小游戏](https://blog.csdn.net/lanix516/article/category/5706235)  
[createjs新司机开车](https://juejin.im/entry/5b5d2efde51d4519503b5753?utm_source=gold_browser_extension)