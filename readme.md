## 采用webpack的方式进行模块化编程

1.新建页面在src下提供一个文件夹，如app
这个文件夹必须包含两个文件（index.js,index.html;
新建页面后必须重新启动webpack

2.模版引擎换成[xtemplate](https://github.com/xtemplate/xtemplate);
使用方式在demo文件夹下已经有了。
采用ES6 import方式引用模块。（和java差不多）具体参考[阮一峰ES6](http://es6.ruanyifeng.com/)

3.使用方式
解压node_module，放在当前目录下。

开发环境运行
```
npm run dev
```
打开localhost:3000/app.html

done...

线上环境运行
```
npm run build
```
## Q&A
运行报错尝试(确保nodejs是最新版本v6.3.1)
```
rm -r node_module
npm install
```
