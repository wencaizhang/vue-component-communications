<template>
  <div class="home">
    <demo1/>
    <demo2/>
    <demo3/>
    <demo4/>
    <demo5/>
    <demo6/>
    <demo7/>
    <demo8/>
    <demo9/>
    <demo10/>
  </div>
</template>

<script>
import demo1 from "./01/parent";
import demo2 from "./02/parent";
import demo3 from "./03/parent";
import demo4 from "./04/parent";
import demo5 from "./05/parent";
import demo6 from "./06/parent";
import demo7 from "./07/parent";
import demo8 from "./08/parent";
import demo9 from "./09/parent";
import demo10 from "./10/parent";

export default {
  name: "home",
  components: {
    demo1,
    demo2,
    demo3,
    demo4,
    demo5,
    demo6,
    demo7,
    demo8,
    demo9,
    demo10,
  },
  data() {
    return {
      name: "home"
    };
  },
  methods: {}
};
</script>
<style scoped>

</style>
