<template>
  <div class="container">

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

  },
  mounted () {
    console.log(this.$parent)
  }
};
</script>

