<template>
  <div class="Main">
    <MainHeader></MainHeader>
    <MainLeft></MainLeft>
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader'
import MainLeft from '../components/MainLeft'
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
    MainHeader, MainLeft
  }
}
</script>

<style lang="less">
.Main{

}
</style>
