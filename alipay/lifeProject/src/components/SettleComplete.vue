<template>
  <div class="SettleComplete">
    <section class="infoList" v-show="suc">
      <div class="topIcon">
        <span class="glyphicon glyphicon-ok-circle"></span>
      </div>
      <div class="infoText">
        <span>本次消费</span>
        <span>{{total}}</span>
      </div>
      <div class="forDetail">
        <button class="btn btn-default" @click="goOrderList">查看订单</button>
      </div>
    </section>
    <section v-show="!suc" class="errorInfo">
      <p>{{total}}</p>
    </section>
    <section class="activity">
      <ul>
        <li v-for="item in imgArray" :style="{backgroundImage: 'url('+ item +')'}" ></li>
      </ul>
    </section>
    <Footer-tab></Footer-tab>
  </div>
</template>

<script>
  import FooterTab from './FooterTab.vue';
  export default({
    name: 'SettleComplete',
    data(){
      return {
        total: this.$route.query.total,
        suc: this.$route.query.success,
        imgArray: ['./static/images/a1.jpg','./static/images/a2.jpg','./static/images/a3.jpg']
      }
    },
    mounted (){
      this.$nextTick( () => {
      })
    },
    components: {
      FooterTab
    },
    methods: {
      goOrderList(){
        this.$router.push(
          {
            name: 'order'
          }
        )
      },
      goTrolley() {
        this.$router.push(
          {
            name: 'trolley'
          }
        )
      }
    }
  })
</script>

<style lang="less">
  @headerHeight : 6vh;
  .SettleComplete{
    padding: 0 0 12vh 0;
    .infoList{
      background: #fff;
      padding: 2vh 0;
      .topIcon{
        text-align: center;
        font-size: 20vw;
        color: #f73c3b;
      }
      .infoText{
        text-align: center;
        span{
          display: inline-block;
          width: 30vw;
        }
        span:nth-of-type(1){
          font-size: 4vw;
          color: #939393;
        }
        span:nth-of-type(2){
          font-size: 6vw;
          color: #f73c3b;
          font-weight: 600;
        }
      }
      .forDetail{
        padding: 2vh 0;
        text-align: center;
        button{
          width: 50vw;
          height: 7vh;
          font-size: 4vw;
        }
      }
    }
    .activity{

      ul{
        list-style: none;
        li{
          width: 94vw;
          height: 15vh;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          margin: 1vh 3vw;
          border-radius: 5px;
          border: 1px solid #F0EDEC;
        }
      }
    }
    .errorInfo{
      text-align: center;
      font-size: 5vw;
      color: #f73c3b;
      padding: 2vh 0;
    }
  }
</style>
