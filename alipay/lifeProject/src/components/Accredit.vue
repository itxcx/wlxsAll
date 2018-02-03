<template>
  <div class="Accredit">
    <section class="accreditMsg">
      <div></div>
      <p>您未授权支付宝免密支付功能~</p>
      <p>暂时无法购买商品</p>
    </section>
    <section class="goAccredit">
      <button @click="goAccredit">去授权</button>
    </section>
  </div>
</template>

<script>
  export default ({
    name: 'accredit',
    data(){
      return {

      }
    },
    methods: {
      goAccredit(){ //去授权跳转方法
        window.location.href = 'user/isSign';
      }
    }
  })
</script>


<style lang="less">
  @headerHeight : 6vh;
  .Accredit {
    padding: 6vh 0 0 0;
    background: #f2f2f2;
    .accreditMsg{
      padding: 6vh 0 0 0;
      div{
        width: 20vh;
        height: 20vh;
        margin: 4vh auto;
        background: url(../../static/images/wsq.png) no-repeat center center;
        background-size: cover;
      }
      p{
        text-align: center;
        font-size: 3vh;
        color: #F6504E;
      }
    }
    .goAccredit{
      position: fixed;
      bottom: 2vh;
      left: 0;
      text-align: center;
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
</style>
