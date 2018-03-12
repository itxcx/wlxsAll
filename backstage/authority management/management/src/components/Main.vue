<template>
  <div class="Main">
    <section>
      <Button>Default</Button>
      <Button type="primary" @click="clickHead">Primary</Button>
      <Button type="ghost">Ghost</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="info">Info</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="error">Error</Button>
    </section>
    <section>
      <Icon type="checkmark"></Icon>
      <Icon type="arrow-shrink"></Icon>
      <Icon type="close-circled"></Icon>
    </section>
    <section>
        <Input v-model="value14" placeholder="Enter something..." clearable style="width: 200px"/>
    </section>
    <section>
      <Slider v-model="value1" :step="5" show-stops show-input></Slider>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      value1: 10,
      value14: 'test',
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
