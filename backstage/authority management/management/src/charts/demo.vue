<template>
    <div class="charts">
      chartsdasfdfdsafdsafdsafdsafasdfdsafdsafdsafdsafdsafsdafdsafdsa
      {{location1}}----{{location2}}----{{item}}
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
          console.log(this.$route.query.location1);
          console.log(this.$route.query.location2);
          console.log(this.$route.query.item);
          this.location1 = '';
          this.location2 = '';
          this.item = '';
          this.location1 = this.$route.query.location1;
          this.location2 = this.$route.query.location2;
          this.item = this.$route.query.item;
        })
      },
      methods: {

      }
    }
</script>

<style lang="less">

</style>
