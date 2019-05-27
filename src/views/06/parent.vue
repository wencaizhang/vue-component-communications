<template>
  <div class="container">
    <child1 ref="child1"/>

    <child2 ref="child2"/>

    <input type="text" ref="input">
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
    console.log(this.$refs.child1)
    console.log(this.$refs.child2)
    this.$refs.input.focus();
  }
};
</script>

