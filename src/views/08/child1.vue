<template>
  <div class="container">
    <input type="text" @input="onInput">
    <child2 ref="child2"/>
  </div>
</template>

<script>
import child2 from "./child2";
export default {
  name: "child1-08",
  components: {
    child2
  },
  data() {
    return {};
  },
  methods: {
    handleEmitEvent() {
      this.$emit("test", "Hello Vue.js");
    },
    onInput (e) {
      console.log(e.target.value);
    }
  },
  mounted() {
    this.$on("test", text => {
      console.log("child: ", text);
    });
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
