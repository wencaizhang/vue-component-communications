<template>
  <div class="container">
    <child1/>
  </div>
</template>

<script>
import eventBus from "@utils/eventBus";
import child1 from "./child1";
export default {
  name: "parent-11",
  components: {
    child1
  },
  mounted() {
    console.log('================')
    // eventBus.$on("fromChild2", v => {
    //   console.log("parent-11: ", v);
    // });
    eventBus.$emit("fromParent", "parent emit");
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


