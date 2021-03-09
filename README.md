# Vue-todo
Todo list implement with Vue

![](https://github.com/KimKeepLearning/Vue-todo/blob/master/overview.png)

## 1. webpack配置

### 1.1 配置入口文件

设置entry

### 1.2 配置输出文件

设置output

### 1.3 loaders

- css相关

    - style-loader
    - css-loader
    - stylus-loader

- vue-loader

### 1.4 处理图片

- url-loader

    - 转成base64

### 1.5 插件

- html-webpack-plugin

    - 显示网页（不用手动写html）

### 1.6 webpack-dev-server

- 模块热更新
- 开启调试Source Map

## 2. 页面结构

### header.vue

### todo.vue

- item.vue
- tabs.vue

### footer.jsx

## 3. 页面逻辑

页面逻辑不是很复杂，多个组件共同维护一个`todos`数组，通过Vue的双向绑定，自动渲染`todos`到页面上。

注意数据最好集中处理，子组件不要修改父组件的数据，而是通过`$emit`向外触发一个事件（相当于给组件定义了一个类似于`click`的原生事件）。

## 4. 感悟

只有学得广，学得多，才知道自己该往哪个方向学