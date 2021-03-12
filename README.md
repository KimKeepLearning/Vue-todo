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
- `cssModules`

#### (3) 使用eslint

- 安装eslint, eslint-plugin-standard, eslint-plugin-promise, eslint-plugin-import, eslint-plugin-node.
- 如果要在vue文件里用eslint，还要装eslint-plugin-html
- package.json里面设置命令
    - `"lint": "eslint --ext .js --ext .vue --ext .jsx clint/"`
    - 自动修改使用，加`"--fix"`

## 4. Vue知识点

准备：指定import Vue from 'vue'的来源

在webpack config里面设置resolve.alias['vue']。

vue.esm.js和vue.runtime.esm.js的区别在于，是否允许在js中使用模板

### 4.1 Vue实例

#### （1）Vue实例的属性

`app.$data`, `app.$props `, `app.$el`

`app.$options`, `app.$root`, `app.$children`​

`app.$slots`, `app.$scopedSlots`

`app.$refs` ：快速定位到模板里某一个节点或组件

`app.$isServer`：服务端渲染

#### （2）Vue实例的方法

`app.$watch`, `app.$on`,

`app.$forceUpdate`：强制重新渲染

`app.$set()`：类似于`defineProperty`里设置setter

### 4.2 生命周期

- beforeCreate和created => 组件创建
- beforeMount和mounted=> 组件挂载到dom节点上
- beforeUpdate和updated => 数据更新时
- beforeDestory和destoryed => 组件销毁
- activated和deactivated => 和keep alive有关

当创建Vue实例时，会首先触发beforeCreate和created函数，如果实例中指定了挂载的节点（`vm.$el`），会触发beforeMount和mounted函数。从beforeMount到mounted的过程中间，vue会根据template执行render函数，render结束后，才触发mounted函数。

其余声明周期函数都需要有特定的情况才会触发

### 4.3 Vue的数据绑定

基本操作：`v-bind`, `v-html`, `v-on`

#### （1）computed

相当于一个getter方法

- 与method相比，开销更小，因为computed只有当依赖的数据变化时才会计算, 当数据没有变化时, 它会读取缓存数据
- 如果一个数据需要经过复杂计算就用 computed
- 如果一个数据需要被监听并且对数据做一些操作就用 watch

不要在computed里面修改依赖值！！（watch也是）

#### （2）原生指令

- v-text: 绑定的值是固定的
- v-html: 绑定一段html
- v-show/ v-if: v-if会从文档流里删除，引起重绘和回流（重排）
- v-for: 注意绑定`:key`
- v-model: 通常用在input，注意`:value`

#### （3）provide&inject

可以实现父子/爷孙之间的组件通信

### 4.4 Vue组件

#### （1）定义组件

 子组件通过Vue.component定义

- data必须是函数，并且返回一个新建的对象，而不能是全局的对象（闭包？ 防止子组件间的数据同步）
- Vue.extend，可以声明式的定义组件

```javascript
const component = { .. ... }
const CompVue = Vue.extend(component)

new CompVue ({
    el:"#root"
})
```

#### （2）插槽

组件里面放什么是调用的时候决定的

###### a. 具名插槽

```css
// 定义时
<div :style="style">
	<div class="header">
		<slot name="header"></slot>    // 具名插槽
	</div>
	<div class="body">
		<slot name="body"></slot>
	</div>
</div>

// 组件使用时
<comp-one>
	<span slot="header">this is header</span>
	<span slot="body">this is body</span>
</comp-one>
```

###### b. 作用域插槽

目的：在使用组件时，想在组件里使用组件内定义的data

```vue
// 定义时
<div :style="style">
	<div>
		<slot value="header"></slot>
	</div>
	
</div>

// 组件使用时
<comp-one>
	<span slot-scope="props">{{props.value}}</span>  // props是定义的名字而已
</comp-one>
```

### 4.5 render方法

创建虚拟dom？

```js
render(createElement) {
	return createElement('标签或者组件名字', {标签或组件上的属性}, [标签或组件里的内容])
}
```

### 4.6 Vue-router

**路由**：

- 以前：链接输入之后输入到后端，进行模板渲染，产生一个新的html，返回到浏览器，浏览器再显示
- 现在：页面跳转不经过服务器，渲染内容来自前端js

使用vue-router和webpack需要设置webpack中的devServer:  

```javascript
historyApiFallback: {
	index: '/index.html'
}
```

`router-view`：根据路由取得对应的模板内容。

##### 配置项

- `mode`去掉地址中的#
- `linkActiveClass`，`linkExactActiveClass` 给链接的样式class
- `scrollBehavior`设置跳转时的滚动状态
- `fallback`不一定所有的浏览器都支持vue的路由，fallback一套哈希的

**其他操作**

a. 在`<router-view>`上包裹`transition` 可以设定页面切换时的动画