<template>
  <div class="container">
    <button @click="handleEmitEvent">触发 $emit</button>
  </div>
</template>

<script>
export default {
  name: 'child1',
  data () {
    return {

    }
  },
  methods: {
    handleEmitEvent () {
      this.$emit('test', 'Hello Vue.js');
    }
  },
  mounted () {
    this.$on('test', text => {
      console.log('child: ', text);
    })
  }
};
</script>

