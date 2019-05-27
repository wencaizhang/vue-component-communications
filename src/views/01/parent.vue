<template>
  <div class="container">
    <child :title="title" @update:title="title = $event"/>

    <!-- .sync 简写 -->
    <child :title.sync="title"/>
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
      title: "Parent"
    };
  }
};
</script>

