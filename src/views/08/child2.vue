<template>
  <div class="container">
    <button @click="handleEvent">dispatch 触发上级组件自定义事件</button>
  </div>
</template>

<script>
import Emitter from "./Emitter";
export default {
  name: "child2-08",
  mixins: [Emitter],
  data() {
    return {};
  },

  mounted() {
    this.$on("test", text => {
      console.log("child2-08: ", text);
    });
  },
  methods: {
    handleEvent() {
      this.dispatch("08-parent", "test2", "just test too!");
    }
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
