## grep  
grep可以对日志的关键行进行提取。  
```
grep 'zhuyunhe' test.txt -n -A 1 -B 1
```
执行这条命令，可以提取出test.txt中包含'zhuyunhe'的行。  

### 常用参数
* -n， 显示行数。