# Vue-todo
Todo list implement with Vue

![](https://github.com/KimKeepLearning/Vue-todo/blob/master/overview.png)

## 1. 基本页面逻辑

页面逻辑不是很复杂，多个组件共同维护一个`todos`数组，通过Vue的双向绑定，自动渲染`todos`到页面上。

注意数据最好集中处理，子组件不要修改父组件的数据，而是通过`$emit`向外触发一个事件（相当于给组件定义了一个类似于`click`的原生事件）。

接下来的工程化才是重点。:fist_raised::fist_raised::fist_raised:

## 2. 文件结构目录

```
|   package-lock.json
|   package.json
|   postcss.config.js
+---build
|       webpack.config.base.js
|       webpack.config.client.js
|       
+---client
|   |   app.vue
|   |   index.js
|   |   
|   +---assets
|   |   +---images
|   |   |       a.jpg
|   |   |       beijing.jpg
|   |   |       bg.png
|   |   |       checked.svg
|   |   |       unChecked.svg
|   |   |       
|   |   \---styles
|   |           footer.styl
|   |           global.styl
|   |           test-stylus.styl
|   |           test.css
|   |           
|   \---views
|       +---layout
|       |       footer.jsx
|       |       header.vue
|       |       
|       \---todo
|               item.vue
|               tabs.vue
|               todo.vue
|               
+---dist
|                       
\---node_modules
```

- `build`文件夹放webpack配置文件
    - `webpack.config.base.js`包含公用的配置，例如`vue-loader`, `babel-loader`, `url-loader`
    - `webpack.config.client.js`里区分开发环境和生产环境，配置了插件，`webpack-dev-server`，`stylus-loader`等
- `client`是关于客户端渲染的文件
    - `app.vue`所有组件文件的集中地
    - `index.js`入口文件，渲染了整个app
    - `views`存放组件，其中`layout`文件夹放公共组件（header, footer），`todo`文件夹放app组件
    - `assets`文件夹放图片和样式
- `dist`文件夹是webpack打包文件的输出路径
- `node_modules`是安装的第三方依赖库

## 3. Webpack配置

#### (1) 插件

- vue-style-loader可以实现**样式的**模块热更新

- rimraf可以删除dist目录`rimraf dist`

#### (2) vue-loader配置

- `preserveWhitespace`：防止标签中的空格对页面造成影响
- `extractCSS`： Vue文件中的css是否单独打包
- `cssModules`：见（3）