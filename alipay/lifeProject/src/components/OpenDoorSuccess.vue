<template>
  <div class="OpenDoorSuccess">
    <section class="statusMsg">
      <div>
        <div class="doorTrue"></div>
        <p class="statusMsg">{{statusMsg}}</p>
        <p class="statusTip">请取走您需要的商品,关门自动扣费</p>
        <div class="tipText">
          <p>请勿将购买的商品放回售货柜</p>
          <p>如订单扣款错误，请致电 <a href="tel://400-770-7768">400-770-7768</a></p>
        </div>
      </div>
    </section>
    <section class="bottomAdv">
      <div></div>
    </section>
  </div>
</template>

<script>
  export default ({
    name: 'OpenDoorStatus',
    data() {
      return {
        statusMsg: '您已开门成功',
        timer: null
      }
    },
    mounted (){
      this.$nextTick( () => {
      })
    },
    methods:{
    }
  })
</script>

<style lang="less">
  @headerHeight : 6vh;
  .OpenDoorSuccess {
    background: #f2f2f2;
    height: 100vh;
    width: 100vw;
    text-align: center;
    .statusMsg{
      >div{
        padding: 10vh 0 0 0 ;
      }
      .doorTrue{
        width: 30vh;
        height: 30vh;
        margin: 2vh auto;
        background: url(../../static/images/open_success.png) no-repeat center center;
        background-size: cover;
      }
      .statusMsg{
        font-size: 3.2vh;
        color: #fe7909;
        letter-spacing: 4px;
      }
      .statusTip{
        color: #5d5d5d;
        font-size: 2.3vh;
        margin-top: 1vh;
        letter-spacing: 2px;
      }
      .tipText{
        margin-top: 15vh;
        font-size: 2.1vh;
        color: #454545;
        p{
          margin-top: 1vh;
        }
      }
      .goFocus{
        position: fixed;
        bottom: 2vh;
        left: 0;
        width: 100vw;
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
    .bottomAdv{
      position: absolute;
      bottom: 3px;
      left: 0;
      margin: 1vh;
      div{
        width: 96vw;
        height: 20vh;
        background: url(../../static/images/adv_normal.png) no-repeat center center;
        background-size: cover;
        border-radius: 5px;
      }
    }
  }
</style>
