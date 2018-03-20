<template>
    <div class="charts">
      {{$store.state.reqData}}----{{$store.state.showType}}
    </div>
</template>

<script>
    export default {
      name: "demo",
      data() {
          return {
            location1: '',
            location2: '',
            item: ''
          }
      },
      mounted () {
        this.$nextTick( () => {

        })
      },
      methods: {

      }
    }
</script>

<style lang="less">

</style>
