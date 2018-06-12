<!--<template>-->
  <!--<div class="Test">-->
    <!--<aside>{{Time}}</aside>-->
    <!--<aside>{{changeData}}</aside>-->
    <!--<section>-->
      <!--<button @click="show = !show">toggle</button>-->
      <!--<section>-->
        <!--<transition name="slide-fade">-->
          <!--<span v-if="show">content</span>-->
        <!--</transition>-->
      <!--</section>-->
    <!--</section>-->
    <!--<section>-->
      <!--<button @click="animationShow = !animationShow">animation toggle</button>-->
      <!--<section>-->
        <!--<transition name="bounce" appear>-->
          <!--<div v-if="animationShow">Lorem ipsum dolor sit amet, consectetur adipisicing-->
            <!--elit. Aliquid assumenda consectetur eligendi officia quasi tempora unde voluptates.-->
            <!--Alias iure labore minus odio officiis rem, soluta vel? Alias consequatur deserunt hic.-->
          <!--</div>-->
        <!--</transition>-->
      <!--</section>-->
    <!--</section>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--export default{-->
    <!--name: 'Test',-->
    <!--data() {-->
      <!--return {-->
        <!--Time: '1970-01-01 00:00:00',-->
        <!--show: true,-->
        <!--animationShow: true,-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--this.$nextTick(() => {-->
        <!--this.changeTime();-->
      <!--})-->
    <!--},-->
    <!--//方法集合-->
    <!--methods: {-->
      <!--changeTime() {-->
        <!--setInterval(() => {-->
          <!--let date = new Date();-->
          <!--this.Time = this.Common.formatDate(date, "yyyy-MM-dd hh:mm:ss");-->
        <!--}, 1000)-->
      <!--}-->
    <!--},-->
    <!--//计算属性-->
    <!--computed: {-->
      <!--changeData() {-->
          <!--return this.Time.toString().split(' ')[1].split(':')[0];-->
      <!--}-->
    <!--},-->
    <!--//侦听器-->
    <!--watch: {-->
      <!--Time() {-->

      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style lang="less">-->
  <!--.Test{-->
    <!--.slide-fade-enter-active {-->
      <!--transition: all .3s ease;-->
    <!--}-->
    <!--.slide-fade-leave-active {-->
      <!--transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);-->
    <!--}-->
    <!--/* .slide-fade-leave-active for below version 2.1.8 */-->
    <!--.slide-fade-enter, .slide-fade-leave-to {-->
      <!--transform: translateX(140px);-->
      <!--opacity: 0;-->
    <!--}-->

    <!--/**********************************************************************/-->
    <!--.bounce-enter-active {-->
      <!--animation: bounce-in .5s;-->
    <!--}-->
    <!--.bounce-leave-active {-->
      <!--animation: bounce-in .5s reverse;-->
    <!--}-->
    <!--@keyframes bounce-in {-->
      <!--0% {-->
        <!--transform: scale(0);-->
      <!--}-->
      <!--50% {-->
        <!--transform: scale(1.5);-->
      <!--}-->
      <!--100% {-->
        <!--transform: scale(1);-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->
<template>
  <div class="container">

    <!--对于scroller默认高度总是占满父容器，虽然可以使用属性设置高度-->
    <!--但在用一个div包住4会更简单点-->
    <div style="height: 600px">

      <!--scroller组件定位方式用relative 否则会溢出父容器-->
      <scroller
        class="scroller"
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="my_scroller">
        <div v-for="(item, index) in items" @click="onItemClick(index, item)"
             class="row">
          {{ item }}
        </div>
      </scroller>
    </div>


  </div>

</template>

<script>
  export default {

    data() {
      return {
        items: [],
        i: 0
      }
    },
    mounted() {
      for (let i = 1; i <= 20; i++) {
        this.items.push(i)
      }
    },
    methods: {
      refresh(done) {
        console.log('down');
        this.items = [1, 2, 3, 4, 5, 6].map(() => parseInt(Math.random() * 10))
        done()
      },
      infinite(done) {
        console.log('test');
        if(this.i < 10) {
          this.i++;
          console.log(this.i);
          this.items = this.items.concat([12, 3, 4, 42,])
          done()
        }else{
          console.log('end');
        }

      },
      onItemClick(index, item) {
        console.log(index)
      }
    }
  }
</script>


<style scoped>
  .container {
    height: 100vh;
    overflow-y: scroll;
  }

  .row {
    height: 100px;
    width: 100px;
    background: deepskyblue;
    margin: 10px;
  }

  .scroller {
    position: relative;
  }
</style>
