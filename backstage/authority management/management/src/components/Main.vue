<template>
  <div class="Main">
    dsafdsaf
    <section>
      <i-button @click="show">Click me!</i-button>
      <Modal :visible.sync="visible" title="Welcome">欢迎使用 iView</Modal>
    </section>
  </div>

</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      visible: false
    }
  },
  methods:{
    show: function () {
      alert(1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.Main{
  padding:30px;
  background: #f2f2f2;
  section{
    margin-top: 2vh;
    cursor: pointer;
  }
}
</style>
