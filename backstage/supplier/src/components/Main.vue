<template>
    <div class="Main">
      <section class="topBanner"></section>
      <section class="repertory">
        <div></div>
        <dl>
          <dt>售货柜库存</dt>
          <dd>查询售货柜库存，进行实时补货</dd>
        </dl>
      </section>
      <section class="handle">
        <aside class="exhibit">
          <div></div>
          <dl>
            <dt>商品上架</dt>
            <dd>放入售货柜中</dd>
          </dl>
        </aside>
        <aside class="ship">
          <div></div>
          <dl>
            <dt>商品下架</dt>
            <dd>售货柜中取出</dd>
          </dl>
        </aside>
      </section>
      <Footer-bar></Footer-bar>
    </div>
</template>

<script>
  import FooterBar from './FooterBar.vue';
    export default {
      name: "Main",
      data() {
          return {}
      },
      components:{
        FooterBar
      },
      methods: {

      }
    }
</script>

<style lang="less">
  .Main{
    background: #f5f5f5;
    .topBanner{
      width: 100vw;
      height: 23.2383vh;
      background: url("../../static/images/banner.jpg") no-repeat center center;
      background-size: cover;
    }
    .repertory{
      background: #ffffff;
      margin: 2.667vw;
      padding: 2.6236vh 4vw;
      border-radius: 5px;
      overflow: hidden;
      div{
        background: url("../../static/images/stock.png") no-repeat center center;
        background-size: cover;
        width: 12vw;
        height: 12.1vw;
        float: left;
        margin-right: 3.333vw;
      }
      dl{
        float: left;
        padding-top: 0.6vh;
        dt{
          font-size: 2.248rem;
        }
        dd{
          font-size: 1.949rem;
        }
      }
    }
    .handle{
      display: flex;

      .exhibit, .ship{
        background: #fff;
        border-radius: 5px;
        width: 46.2666vw;
        margin-left: 2.667vw;
        padding: 2.6236vh 4vw;
        div{
          width: 12vw;
          height: 12.1vw;
          float: left;
          margin-right: 3.333vw;
        }
        dl{
          padding-top: 0.6vh;
          dt{
            font-size: 2.248rem;
          }
          dd{
            font-size: 1.949rem;
          }
        }
      }
      .exhibit div{
        background: url("../../static/images/shelf.png") no-repeat center center;
        background-size: cover;
      }
      .ship div{
        background: url("../../static/images/take.png") no-repeat center center;
        background-size: cover;
      }
    }
  }
</style>
