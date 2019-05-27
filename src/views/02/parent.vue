<template>
  <div class="container">
    <child v-model="title"/>
  </div>
</template>

<script>
import child from "./child";
export default {
  components: {
    child
  },
  data() {
    return {
      title: "标题"
    };
  }
};
</script>

