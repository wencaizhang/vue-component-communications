<template>
  <div class="container">
    根组件：{{ $root.name }}
  </div>
</template>

<script>
export default {
  mounted () {
    // 真正的根组件并不是 App.vue，而是 main.js 中的 new Vue()。
    console.log(this.$root.name);
  },

  data() {
    return {
      title: "标题"
    };
  }
};
</script>

