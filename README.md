# Vue 组件通信总结

组件化开发提高了代码的复用性和可维护性，但随之带来的是组件之间的通信问题。下面就来梳理一下 Vue.js 项目中的组件通信方式。

## 总览

根据**是否需要开发者书写额外代码**这一标准，我将它们分为两大类：

**可以直接通过实例调用**

1. [vm.$root](#vm.$root)
1. [vm.$parent 和 vm.$children](#vm.$parent和vm.$children)
1. [$attrs 收集参数](#vm.attrs)
1. [vm.listeners 收集 v-on 事件监听器](#vm.listeners)

**需要额外代码才可以使用**

1. [props(.async)和$emit](#props(.async)和$emit)
1. [v-model](#v-model)
1. [provide和inject](#provide和inject)
1. [$refs](#$refs)
1. [$emit 和 $on](#$emit和$on)
1. [基于$emit和$on封装的派发和广播](#基于$emit和$on封装的派发和广播)
1. [eventBus](#eventBus)
1. [vuex](#vuex)

## vm.$root [代码](./src/views/03)

当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

真正的根组件并不是 App.vue，而是 main.js 中的 new Vue()。

## vm.$parent和vm.$children [代码](./src/views/05)

vm.$parent: 当前组件的父实例，如果当前实例有的话
vm.$children: 当前实例的直接子组件。**需要注意 $children 并不保证顺序，也不是响应式的**。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 `v-for` 来生成子组件，并且使用 `Array` 作为真正的来源。

## vm.$attrs [代码](./src/views/09)

> 包含了父作用域中不作为 `prop` 被识别 (且获取) 的特性绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 `prop` 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。

我们知道通过 `v-bind` 可以向一个子组件传递数据：

```html
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```

同时子组件需要通过内部的 `props` 选项来接收（注册）父组件传递的数据：

```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

这样就形成了一个闭环：我（父组件）通过 `v-bind` 传递给你（子组件）一些数据（prop），你通过 `props` 选项接收数据。



## vm.listeners [代码](./src/views/10)

包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。

## props(.async) 和 $emit

vue 中不允许子组件直接修改 props

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


## 参考

+ [.sync 修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

## props(.async)和$emit [代码](./src/views/01)

## v-model [代码](./src/views/02)

## $emit和$on [代码](./src/views/07)

## provide和inject [代码](./src/views/04)

## $refs [代码](./src/views/06)

## 基于$emit和$on封装的派发和广播) [代码](./src/views/08)

## eventBus [代码](./src/views/11)

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

## vuex

vuex 文档地址：[https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)

