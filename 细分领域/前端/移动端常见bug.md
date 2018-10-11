# 记录一些移动端常见的CSS问题  

### 点击样式闪动  
```
-webkit-tap-highlight-color : transparent ; 
```   

### 屏蔽用户选择  
```
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```

### 去除移动端IOS输入框的内阴影  
```
-webkit-appearance: none;
```   

### 禁止文本缩放
```
-webkit-text-size-adjust: 100%;
```  

### 禁止保存或拷贝图像
```
img{-webkit-touch-callout: none;}
```  

### 解决字体在移动端比例缩小后出现锯齿的问题  
```
-webkit-font-smoothing: antialiased;
```

### 设置input输入框内placeholder字体的大小
```
::-webkit-input-placeholder{ font-size:10pt;}
```

### 手机拍照和上传图片
```
<input type="file">的accept 属性
<!-- 选择照片 -->
<input type=file accept="image/*">
<!-- 选择视频 -->
<input type=file accept="video/*">
```

### 用户设置字号放大或者缩小导致页面布局错误
```
body  
  {  
    -webkit-text-size-adjust: 100% !important;  
    text-size-adjust: 100% !important;  
    -moz-text-size-adjust: 100% !important;  
  } 
```

### 去除webkit默认滚动条  
```
element::-webkit-scrollbar{
  display: none;
}
```  

### inline-block元素使用vertical-align后，父元素高度被莫名撑开  
```
.parent{
  font-size: 0;
}
```

### IOS键盘字母输入，默认首字母大写  
```
<input type="text" autocapitalize="off" />
```  

### Retina屏1px边框最简单的解决方法  
```
element{
  border-width: thin;
}
```

## 参考
[掘金-移动端常见bug-1](https://juejin.im/post/5b163eb5e51d4506c4751e44)

[掘金-移动端常见bug-2](https://juejin.im/post/5af918636fb9a07ac5603ecb)