<template>
  <div class="Main">
    <MainHeader></MainHeader>
    <MainLeft></MainLeft>
    <MainFooter></MainFooter>
    <MainContent></MainContent>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader'
import MainLeft from '../components/MainLeft'
import MainFooter from '../components/MainFooter'
import MainContent from '../components/MainContent'
//import Demo from '@/charts/Demo'

export default {
  name: 'Main',
  data () {
    return {
      // visible: false
    }
  },
  mounted () {
    this.$nextTick(() => {

    })
  },
  methods:{

  },
  components: {
    MainHeader, MainLeft, MainFooter, MainContent
  }
}
</script>

<style lang="less">
.Main{
  position: relative;
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
  /*MainContent{*/
    /*position: absolute;*/
    /*top: 10vh;*/
    /*right: 0;*/
  /*}*/
}
</style>
