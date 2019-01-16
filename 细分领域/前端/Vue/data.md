当一个组件被定义时（例如写一个.vue文件来定义一个组件），data必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果data仍是一个纯粹的对象，则所有的实例将共享同一个数据对象！通过提供data函数，每次创建一个新实例后，我们能够调用data函数，从而返回初始数据的一个全新副本数据对象。  
所以，一个标准的.vue文件，data选项必须是函数，如下：  
```
  <template>
    <div class="example">{{ msg }}</div>
  </template>

  <script>
  export default {
    data () {
      return {
        msg: 'Hello world!'
      }
    }
  }
  </script>

  <style>
  .example {
    color: red;
  }
  </style>
```