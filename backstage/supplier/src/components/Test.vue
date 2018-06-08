<template>
  <div class="Test">
    <aside>{{Time}}</aside>
    <aside>{{changeData}}</aside>
  </div>
</template>

<script>
  export default{
    name: 'Test',
    data() {
      return {
        Time: '1970-01-01 00:00:00'
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.changeTime();
      })
    },
    //方法集合
    methods: {
      changeTime() {
        setInterval(() => {
          let date = new Date();
          this.Time = this.Common.formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }, 1000)
      }
    },
    //计算属性
    computed: {
      changeData() {
          return this.Time.toString().split(' ')[1].split(':')[0];
      }
    },
    //侦听器
    watch: {
      isChange() {

      }
    }
  }
</script>

<style lang="less">

</style>
