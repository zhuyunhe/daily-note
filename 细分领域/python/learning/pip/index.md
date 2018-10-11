pip是用来安装Python包的工具。

# 常用操作  
```
$: pip --help  
Usage:   
  pip <command> [options]

Commands:
  install                     Install packages.
  download                    Download packages.
  uninstall                   Uninstall packages.
  freeze                      Output installed packages in requirements format.
  list                        List installed packages.
  show                        Show information about installed packages.
  check   
```

```
//更新某个包
pip install --upgrade <packageName>
```

```
//重新安装某个包，不管之前是否安装过
pip install --ignore-installed <packageName>
```