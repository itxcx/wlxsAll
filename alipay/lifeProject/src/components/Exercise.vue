<template>
  <div class="Exercise">
    <section class="exerciseContent">
      <ul>

      </ul>
    </section>
    <section class="exerciseImg">

    </section>
    <section class="exerciseTime">
      <p>活动时间: 2018年1月23日---2018年6月30日</p>
    </section>
    <section class="exerciseButton">
      <button class="btn btn-success" @click="readyScan(goScan)">参加活动</button>
    </section>
  </div>
</template>
<script>
  export default({
    name: 'exercise',
    data() {
      return {

      }
    },
    methods: {
      readyScan(callback) {
        if (window.AlipayJSBridge) {
          callback && callback();
        } else {
          document.addEventListener('AlipayJSBridgeReady', callback, false);
        }
      },
      goScan() {
        AlipayJSBridge.call('scan', {
          type: 'qr'
        }, (result) => {
          if (result.error) {
            console.log(result.error);
          } else {
            this.urlPath = result.qrCode;
            window.location.href = this.urlPath;
          }
        });
      }
    }
  })
</script>
<style lang="less">
  .Exercise{
    background: #f2f2f2;
    width: 100vw;
    height: 100vh;
    font-size: 2vh;
    padding-top: 4rem;
    .exerciseImg{
      width: 25rem;
      height: 35rem;
      margin: 2rem auto;
      background: url(../../static/images/exercise.jpg) no-repeat center center;
      background-size: cover;
    }
    .exerciseTime{
      padding: 1rem auto;
      p{
        text-align: center;
        font-size: 1.5rem;
      }
    }
    .exerciseButton{
      text-align: center;
      padding: 3rem 0;
    }
  }
</style>
