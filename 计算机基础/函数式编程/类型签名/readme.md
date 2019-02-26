# Hindley-Milner 类型签名  
我们可以把Hindley-Milner看作是一种专门用来书写函数类型签名的语言或者系统。类型签名在写纯函数时有很大作用。类型签名通常只有一行，但这短短一行却能暴露出函数的行为和目的。 
*** 
在积尘已久的数学书籍，学术论文或随处可见的博客文章里，我们都能看到Hindley-Milner的影子。Hindley-Milner并不是一个复杂的系统，我们可以通过一系列例子来理解它。  
```
// strLength :: string -> Number
var strLength = function(s){
  return s.length
}
```
上面这个函数的签名表示，strLength接受一个String然后返回一个Number。下面看一个复杂一点的例子：  
```
// join :: String -> [String] -> String
var join = curry(function(what, xs){
  return xs.join(what)
})
```
在我们还没完全理解上面这个函数要干嘛的时候，我们可以简单的把函数类型签名的最后一个类型看作整个函数的返回值，那么join函数可以简单地这么理解：它接受一个String和一个[String]数组，返回一个String。  
接下来，我们把这个函数的类型签名分一下组：  
```
// join :: String -> ([String] -> String)
var join = curry(function(what, xs){
  return xs.join(what)
})
```
我们把最后两个类型用括号包一下就能反应更多的信息，现在我们可以清晰地看到join接受一个String作为参数，返回一个从[String]到String的**函数**。当然，我们并非一定要这么看待这个过程，但这样思考有助于我们理解为何最后一个类型是返回值。我们再来看一个例子：  
```
//  replace :: Regex -> (String -> (String -> String))
var replace = curry(function(reg, sub, s){
  return s.replace(reg, sub);
});
```
在这段代码中，为replace加上这么多括号显得多余，所以这里的括号是可以省略的。这个类型签名告诉我们，replace函数接受三个参数，分别是：Regex、String和String，返回一个String。   

我们也可以在类型签名中使用变量名，例如：
```
//  id :: a -> a
var id = function(x){ return x; }
```  
把变量命名为 a 和 b 只是一种约定俗成的习惯，你可以使用任何你喜欢的名称。对于相同的变量名，其类型也一定相同。这是非常重要的一个原则，所以我们必须重申：a -> b 可以是从任意类型的 a 到任意类型的 b，但是 a->a 必须是同一个类型。

虽然类型签名中有些括号是不可以省略的，比如：
```
//  map :: (a -> b) -> [a] -> [b]
var map = curry(function(f, xs){
  return xs.map(f);
});

```
我们可以这么理解，map接受两个参数，第一个是从任意类型**a**到任意类型**b**的函数，这个任意类型的a从哪来呢，我们且看第二个是一个数组，数组元素是任意类型a元素，map最后返回一个类型b的数组。  
***  
下面我们来看一个复杂一点的函数：  
```
// reduce :: (b -> a -> b) -> b -> [a] ->b  
var reduce = curry(function(f, x, arr){
  arr.reduce(f, x)
})
```
通过reduce函数的签名，我们可以知道接受三个参数，第一个参数是一个函数，这个函数接受一个**b**和一个**a**并返回一个**b**。那么这个函数接受的a和b从何而来呢，很简单，这个函数签名中的第二个参数就是b，第三个参数是元素为a的数组，那么一个合理的解释就是这里的b和数组里的每个a都传给前面的函数作为参数。我们还可以看到，reduce函数最后返回的结果就是一个b。
## 用途  
类型签名的美妙令人印象深刻，希望你已经被它深深折服。类型签名简直能够一字一句地告诉我们函数做了什么事情。比如 map 函数就是这样：给定一个从 a 到 b 的函数和一个 a 类型的数组作为参数，它就能返回一个 b 类型的数组。