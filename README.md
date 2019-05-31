# Vue 组件通信总结

组件化开发提高了代码的复用性和可维护性，但随之带来的是组件之间的通信问题。下面就来梳理一下 Vue.js 项目中的组件通信方式。

## 总览

1. [vm.$root](#vmroot)
1. [vm.$parent 和 vm.$children](#vmparent和vmchildren)
1. [$attrs 收集参数](#vmattrs)
1. [vm.listeners 收集 v-on 事件监听器](#vmlisteners)
1. [props(.async)和$emit](#props(.async)和$emit)
1. [v-model](#v-model)
1. [provide和inject](#provide和inject)
1. [$refs](#$refs)
1. [$emit 和 $on](#$emit和$on)
1. [基于$emit和$on封装的派发和广播](#基于$emit和$on封装的派发和广播)
1. [eventBus](#eventBus)
1. [vuex](#vuex)

[回到目录:arrow_heading_up:](#总览)

## vm.$root [代码](./src/views/03)

适用对象：
> 任意组件

当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

真正的根组件并不是 App.vue，而是 main.js 中的 `new Vue()`。

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
```
[回到目录:arrow_heading_up:](#总览)

## vm.$parent和vm.$children [代码](./src/views/05)

适用对象：
> 直接父子组件

文档解释：
>`vm.$parent`: 当前组件的父实例，如果当前实例有的话
>
>`vm.$children`: 当前实例的直接子组件。**需要注意 $children 并不保证顺序，也不是响应式的**。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 `v-for` 来生成子组件，并且使用 `Array` 作为真正的来源。

`vm.$parent` 可以直接使用，因为直接父组件实例是唯一的，在一些场景下直接使用 `vm.$parent` 要比通过 `props` 传递数据更加灵活。

但是 `vm.$children` 是当前实例的直接子组件的集合（Array 类型），这就带来一个问题，如何区分（查找）我们想要的那个子组件。除了文档建议即使用数组配合 `v-for` 生成子组件的方法之外，还可以使用后面的 `vm.$refs` 和自行封装查找任意组件的方法。

[回到目录:arrow_heading_up:](#总览)

## props(.async) 和 $emit

适用对象：
> 直接父子组件

为了提高组件的复用性和可定制化，我们都会将组件内设计成通过接受父组件传入的值来实现某一个功能。

在父组件中通过 `v-bind` 向一个子组件传递数据：

```html
<!-- 静态的值不需要使用 v-bind -->
<blog-post title="My journey with Vue"></blog-post>
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>
<!-- v-bind 可以省略 -->
<blog-post :title="post.title" :desc="post.desc"></blog-post>
```

同时子组件需要通过内部的 `props` 选项来接收（注册）父组件传递的数据：

```js
Vue.component('blog-post', {
  props: ['title', 'desc'],
  template: '<h3>{{ title }}</h3>'
})
```

这里的 `props` 选项是一个数组，其中的元素就是字符串类型的 `prop` 名称。

> 你可以定制 prop 的验证方式，但这不是本篇的目的，你可以阅读文档中[Prop 验证](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)章节进行学习。

值得注意的是在 Vue.js 中**不允许子组件直接修改 props**，即[单项数据流](https://cn.vuejs.org/v2/guide/components-props.html#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81)

父组件向子组件中传入 props 的同时,绑定自定义事件 `update:title`:

```html
<child :title="title" @update:title="title = $event" />
```

然后在子组件中通过触发自定义事件来修改 props

```js
this.$emit('update:title', newTitle)
```


为了方便起见,vue 为这种模式提供一个缩写，即 .sync 修饰符：

```html
<child :title.sync="title"/>
```

[回到目录:arrow_heading_up:](#总览)

## vm.$attrs [代码](./src/views/09)

适用对象：
> 直接父子组件

> 包含了父作用域中不作为 `prop` 被识别 (且获取) 的特性绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 `prop` 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。


这样就形成了一个闭环：我（父组件）通过 `v-bind` 传递给你（子组件）一些数据（prop），你通过 `props` 选项接收数据。

然而代码写多了之后总想偷点懒:joy:，不想传递数据写一次 `v-bind`，接收数据再写一次 `prop`，有什么好办法么？

接下来就有请实例属性 `vm.$attrs` 闪亮登场，当当当当~




[回到目录:arrow_heading_up:](#总览)

## vm.listeners [代码](./src/views/10)

适用对象：
> 直接父子组件

包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。
[回到目录:arrow_heading_up:](#总览)


## props(.async)和$emit [代码](./src/views/01)
[回到目录:arrow_heading_up:](#总览)
## v-model [代码](./src/views/02)
适用对象：
> 直接父子组件
[回到目录:arrow_heading_up:](#总览)
## $emit和$on [代码](./src/views/07)

适用对象：
> 直接父子组件
[回到目录:arrow_heading_up:](#总览)
## provide和inject [代码](./src/views/04)

适用对象：
> 祖先级组件和后代组件
[回到目录:arrow_heading_up:](#总览)
## $refs [代码](./src/views/06)

适用对象：
> 直接父子组件

[回到目录:arrow_heading_up:](#总览)
## 基于$emit和$on封装的派发和广播) [代码](./src/views/08)

适用对象：
> 任意组件之间

[回到目录:arrow_heading_up:](#总览)
## eventBus [代码](./src/views/11)

适用对象：
> 任意组件之间

新建一个 `utils/eventBus.js` 文件，创建一个 Vue 的实例。

```js
import Vue from 'vue'
export default new Vue()
```

之后，你就可以在任意组件中导入并使用它了。

在一个组件内监听自定义事件：

```js
import eventBus from "@utils/eventBus";
export default {
  mounted() {
    // 监听自定义事件 changeTitle
    eventBus.$on("changeTitle", title => {
      this.title = title
    });
  }
};
```

在另一个组件内触发自定义事件：

```js
import eventBus from "@utils/eventBus";
export default {
  mounted() {
    // 触发自定义事件 changeTitle
    eventBus.$emit("changeTitle", "newTitle");
  }
};
```

事实上，可以在同一个组件内触发和监听同一个事件，只是这么做的意义不大。:joy:

`eventBus` 有下面 4 个方法，详情参考文档中[实例方法 / 事件](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95-%E4%BA%8B%E4%BB%B6)章节。

+ `eventBus.$on( event, callback );`
+ `eventBus.$once( event, callback );`
+ `eventBus.$off( [event, callback] );`
+ `eventBus.$emit( eventName, […args] );`

事实上我们可以这样使用的原因就是 Vue.js 使用了订阅发布者模式实现了这 4 个方法，如果你感兴趣的话，甚至可以自己实现一个 eventBus。:smile:

上面的写法需要在组件中一次又一次地导入 `eventBus` 模块，为了偷懒:stuck_out_tongue_closed_eyes:，我们可以把它定义在 Vue 的原型上：

```js
// main.js
import Vue from 'vue'
Vue.prototype.$bus = new Vue();
```

这样一来就可以在组件中直接通过 `this.$bus` 来调用原来的 `eventBus` ：

```js
export default {
  mounted() {
    // 触发自定义事件 changeTitle
    this.$bus.$emit("changeTitle", "newTitle");
  }
};
```
[回到目录:arrow_heading_up:](#总览)
## vuex

适用对象：
> 任意组件之间

vuex 文档地址：[https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)

[回到目录:arrow_heading_up:](#总览)