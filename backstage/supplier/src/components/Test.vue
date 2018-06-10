<template>
  <div class="Test">
    <aside>{{Time}}</aside>
    <aside>{{changeData}}</aside>
    <section>
      <button @click="show = !show">toggle</button>
      <section>
        <transition name="slide-fade">
          <span v-if="show">content</span>
        </transition>
      </section>
    </section>
    <section>
      <button @click="animationShow = !animationShow">animation toggle</button>
      <section>
        <transition name="bounce" appear>
          <div v-if="animationShow">Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Aliquid assumenda consectetur eligendi officia quasi tempora unde voluptates.
            Alias iure labore minus odio officiis rem, soluta vel? Alias consequatur deserunt hic.
          </div>
        </transition>
      </section>
    </section>
  </div>
</template>

<script>
  export default{
    name: 'Test',
    data() {
      return {
        Time: '1970-01-01 00:00:00',
        show: true,
        animationShow: true,
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
      Time() {

      }
    }
  }
</script>

<style lang="less">
  <!--可以定义为全局的css样式-->
  .Test{
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    /* .slide-fade-leave-active for below version 2.1.8 */
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(140px);
      opacity: 0;
    }

    /**********************************************************************/
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>
