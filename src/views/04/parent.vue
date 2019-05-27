<template>
  <div class="container">
    祖先组件：{{ app.userInfo }}
  </div>
</template>

<script>
export default {
  inject: ['app'],
  data() {
    return {
      title: "标题"
    };
  },
  mounted () {
    console.log(this.app.userInfo);
  }
};
</script>

