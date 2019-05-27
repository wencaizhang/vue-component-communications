<template>
  <div class="container">
    <button @click="handleEvent">broadcast 触发下级组件自定义事件</button>
    <child1 ref="child1" />
  </div>
</template>

<script>
import child1 from "./child1";
import Emitter from "./Emitter";
export default {
  mixins: [Emitter],
  name: "parent-08",
  components: {
    child1
  },
  data() {
    return {
      title: "Parent"
    };
  },
  mounted() {
    this.$on("test2", text => {
      console.log("parent-08: ", text);
      console.log(this.$children)
    });
  },
  methods: {

    handleEvent() {
      this.broadcast("08-child2", "test", "just test");
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


