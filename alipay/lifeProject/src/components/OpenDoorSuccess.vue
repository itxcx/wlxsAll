<template>
  <div class="OpenDoorSuccess">
    <section class="statusMsg">
      <div>
        <div class="doorTrue"></div>
        <p class="statusMsg">{{statusMsg}}</p>
        <p class="tipText">5秒后跳转到未来鲜森生活号，关注后可查看购买记录、促销优惠等更多信息。</p>
        <!--<div class="goFocus">-->
          <!--<button @click="goFocus">去关注</button>-->
        <!--</div>-->
      </div>
    </section>
  </div>
</template>

<script>
  export default ({
    name: 'OpenDoorStatus',
    data() {
      return {
        statusMsg: '开门成功',
        timer: null
      }
    },
    mounted (){
      this.$nextTick( () => {
        let n = 5;
        this.timer = setInterval( () => {
          n--;
          if(n < 1){
            clearInterval(this.timer); //清除定时器
            window.location.href = 'alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fppx02442mynyjbf8y1nyf66%3F_s%3Dweb-other';
          }
        },1000)
      })
    },
    methods:{
//      goFocus(){
//        clearInterval(this.timer); //清除定时器
//        window.location.href = 'alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fppx02442mynyjbf8y1nyf66%3F_s%3Dweb-other';
//      }
    }
  })
</script>

<style lang="less">
  @headerHeight : 6vh;
  .OpenDoorSuccess {
    background: #f2f2f2;
    padding: 6vh 0 12vh 0;
    .statusMsg{
      >div{
        padding: 10vh 0 0 0 ;
      }
      .doorTrue{
        width: 20vh;
        height: 20vh;
        margin: 2vh auto;
        background: url(../../static/images/kmcg.png) no-repeat center center;
        background-size: cover;
      }

      .statusMsg{
        text-align: center;
        font-size: 5vh;
        color: #F6504E;
      }
      .tipText{
        width: 50vw;
        margin: 5vh auto;
        text-align: center;
        font-size: 2.8vh;
        color: #898989;
      }
      .goFocus{
        position: fixed;
        bottom: 2vh;
        left: 0;
        width: 100vw;
        text-align: center;
        button{
          width: 83vw;
          height: 8vh;
          font-size: 3vh;
          color: #fff;
          background: #F73D3B;
          border: none;
          font-weight: 600;
          border-radius: 5px;
        }
      }
    }
  }
</style>
