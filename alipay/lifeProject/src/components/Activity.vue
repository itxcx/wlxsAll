<template>
  <div class="Activity">
    <section class="topImg"></section>
    <div class="statusMsg" v-show="money">您获得随机
      <span>{{money}}</span>
      元优惠券！
      <div>
        <button class="btn btn-danger" @click="readyScan(goScan)">去使用</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default ({
    name: 'Activity',
    data () {
      return {
         money: this.$route.query.money
      }
    },
    mounted () {
      this.$nextTick( () => {

      })
    },
    methods: {
      readyScan(callback) {
        if (window.AlipayJSBridge) {
          callback && callback();
        } else {
          // 如果没有注入则监听注入的事件
          document.addEventListener('AlipayJSBridgeReady', callback, false);
        }
      },
      goScan(){
        AlipayJSBridge.call('scan', {
          type: 'qr'
        },  (result) => {
          if(result.error){
            console.log(result.error);
          } else {
            window.location.href = result.qrCode;
          }
        }).catch( (error) => {
          console.log(error);
        })
      }
    }
  })
</script>
<style lang="less">
  .Activity{
    background: #f2f2f2;
    padding: 6vh 0 12vh 0;
    .topImg{
      width: 30vh;
      height: 30vh;
      margin: 2vh auto;
      background: url(../../static/images/redpage.png) no-repeat center center;
      background-size: cover;
      border-radius: 50%;
    }
    .statusMsg{
      margin-top: 20vh;
      text-align: center;
      font-size: 2.8vh;
      color: #939393;
      span{
        color: #F6504E;
        font-size: 5vh;
        font-family: "微软雅黑", Arial, Helvetica, sans-serif;
      }
      button{
        margin-top: 5vh;
        width: 40vw;
        height: 7vh;
        font-size: 3vh;
        background: #F6504E;
        border: none;
      }
    }
  }

</style>
