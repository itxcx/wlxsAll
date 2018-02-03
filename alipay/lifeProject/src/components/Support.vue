<template>
  <div class="Support">
    <section class="supportMsg">
      <div></div>
      <p>暂时不支持微信扫一扫功能~</p>
      <p>请使用支付宝扫一扫功能。</p>
    </section>
  </div>
</template>


<style lang="less">
  @headerHeight : 6vh;
  .Support {
    background: #f2f2f2;
    padding: 6vh 0 12vh 0;
    .supportMsg{
      padding: 6vh 0 0 0;
      div{
        width: 20vh;
        height: 20vh;
        margin: 4vh auto;
        background: url(../../static/images/zbzc.png) no-repeat center center;
        background-size: cover;
      }
      p{
        font-size: 3vh;
        color: #F6504E;
        text-align: center;
      }
    }
  }
</style>
