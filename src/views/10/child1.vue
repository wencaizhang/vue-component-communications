<template>
  <div class="container"></div>
</template>

<script>
export default {
  name: "child1-10",

  // 被 props 接收的属性，将不会被 $attrs 收集
  props: ["info"],
  inheritAttrs: false,
  mounted() {
    console.log("child1-10 this.$attrs: ", this.$attrs);
    console.log("child1-10 this.$listeners: ", this.$listeners);
  }
};
</script>

<style scoped>
.container {
  min-height: 200px;
  min-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
