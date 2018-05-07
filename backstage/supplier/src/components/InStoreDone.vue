<template>
    <div class="InStorDone">
      <header>
        <div></div>
      </header>
      <article>
        入库成功,等待配送上架
      </article>
      <section class="store_btn">
        <p>完成</p>
      </section>
    </div>
</template>

<script>
    export default {
      name: "InStorDone",
      data() {
        return {

        }
      }
    }
</script>

<style lang="less">
  .InStorDone{
    header{
      padding-top: 11.994vh;
      div{
        width: 18.6667vw;
        height: 12.5937vh;
        margin: 0 auto;
        background: url("../../static/images/all_success.png") no-repeat center center;
        background-size: cover;
      }
      margin-bottom: 4.4227vh;
    }
    article{
      text-align: center;
      font-size: 2.998vh;
      color: #242323;
    }
    .store_btn{
      padding-top: 26.236vh;
      p{
        width: 79.2vw;
        height: 10.419vh;
        margin: 0 auto;
        background: url("../../static/images/button_bg.png") no-repeat center center;
        background-size: cover;
        text-align: center;
        color: #fff;
        line-height: 7.496vh;
        font-size: 2.248rem;
      }
    }
  }
</style>
