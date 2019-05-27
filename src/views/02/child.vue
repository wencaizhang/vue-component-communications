<template>
  <div class="container">
    <p>{{ value }}</p>
    <input type="text" :value="value" @input="onInput">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>
