<template>
  <div class="container">
    <p>{{title}}</p>
    <input type="text" :value="title" @input="onInput">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  methods: {
    onInput(e) {
      this.$emit("update:title", e.target.value);
    }
  }
};
</script>

