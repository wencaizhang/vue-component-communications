# Vue 组件通信总结

## 总览

+ props(.async) 和 $emit [代码](./src/views/01)
+ v-model [代码](./src/views/02)
+ $root [代码](./src/views/03)
+ provide 和 inject [代码](./src/views/04)
+ $parent 和 $children [代码](./src/views/05)
+ $refs [代码](./src/views/06)
+ $emit 和 $on [代码](./src/views/07)
+ 基于$emit 和 $on 封装的派发和广播 [代码](./src/views/08)
+ $attrs 收集参数 [代码](./src/views/09)
+ $listeners 收集 v-on 事件监听器 [代码](./src/views/10)


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