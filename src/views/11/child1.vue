<template>
  <div class="container">
    <child2/>
    <button @click="handleClick">按钮</button>
  </div>
</template>

<script>
import eventBus from "@utils/eventBus";

import child2 from "./child2";
export default {
  name: "child1-11",
  components: {
    child2
  },
  methods: {
    handleClick() {
      this.$emit('test', 'a', 'b', 'c')
    }
  },
  mounted() {
    eventBus.$on("fromParent", v => {
      console.log("child1-11: ", v);
    });
    // eventBus.$emit('fromChild1', '11111')
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
