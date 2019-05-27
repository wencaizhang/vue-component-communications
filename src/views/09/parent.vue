<template>
  <div class="container">
    <child1
      :ref="'child1'"
      class="child-comp"
      classxxx="child-compxxx"
      :style="{ 'border-color': 'lightblue'}"
      :a="'AAA'"
      b="xx"
      :info="info"
      @test="onTest"
    />
  </div>
</template>

<script>
import child1 from "./child1";
export default {
  name: "parent-09",
  components: {
    child1
  },
  data() {
    return {
      title: "Parent",
      info: {
        name: "zwc",
        age: 18
      }
    };
  },
  methods: {
    onTest () {
      console.log('onTest')
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


