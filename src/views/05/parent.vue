<template>
  <div class="container">
    <child1 />

    <child2 />
  </div>
</template>

<script>
import child1 from "./child1";
import child2 from "./child2";
export default {
  components: {
    child1,
    child2,
  },
  data() {
    return {
      title: "Parent"
    };
  },
  mounted () {
    // 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。
    console.log(this.$children)

    this.$children.forEach(item => {
      console.log(item.name)
    })
  }
};
</script>

