<template>
  <div class="Main">
    <MainHeader></MainHeader>
    <MainLeft></MainLeft>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader'
import MainLeft from '../components/MainLeft'
import MainFooter from '../components/MainFooter'
export default {
  name: 'Main',
  data () {
    return {
      // visible: false
    }
  },
  methods:{

  },
  components: {
    MainHeader, MainLeft, MainFooter
  }
}
</script>

<style lang="less">
.Main{
  MainHeader{
    position: absolute;
    top: 0;
    left: 0;
  }
  /*MainLeft{*/
    /*position: absolute;*/
    /*top: 10vh;*/
    /*left: 0;*/
  /*}*/
  /*MainFooter{*/
    /*position: fixed;*/
    /*bottom: 0;*/
    /*left: 15vw;*/
  /*}*/
}
</style>
