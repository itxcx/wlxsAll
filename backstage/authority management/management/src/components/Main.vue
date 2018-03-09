<template>
  <div class="Main">
    <section @click="clickHead">dsafffdsa</section>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    clickHead: function() {
      let name = this.msg;
      console.log(name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.Main{
  background: #f2f2f2;
  section{
    cursor: pointer;
  }
}
</style>
