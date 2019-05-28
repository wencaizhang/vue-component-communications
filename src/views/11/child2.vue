<template>
  <div class="container"></div>
</template>

<script>
import eventBus from '@utils/eventBus';
export default {
  name: "child12-11",
  mounted() {
    eventBus.$on('fromParent', (v) => {
      console.log(  "child2-11: ", v )
    })
    // eventBus.$emit('fromChild2', '22222')
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
