<template>
    <div class="statement">
      <!--<section class="headerTitle">-->
        <!--<p>智能报表</p>-->
      <!--</section>-->
      <!--<header>-->
        <!--<p>今日销售额 (元)</p>-->
        <!--<p class="saleroom">{{saleroom}}</p>-->
        <!--<div class="totalCount">-->
          <!--<dl>-->
            <!--<dt>交易笔数(笔)</dt>-->
            <!--<dd>{{volume}}</dd>-->
          <!--</dl>-->
          <!--<dl>-->
            <!--<dt>售卖商品(个)</dt>-->
            <!--<dd>{{numberCount}}</dd>-->
          <!--</dl>-->
        <!--</div>-->
      <!--</header>-->
      <!--<section class="statement_content">-->
        <!--&lt;!&ndash;今日货柜排行&ndash;&gt;-->
        <!--<div class="counter">-->
          <!--<h3>今日货柜排行</h3>-->
          <!--<dl>-->
            <!--<dt>{{counterAddr}}</dt>-->
            <!--<dd>交易金额<span>{{countAmount}}</span>元</dd>-->
          <!--</dl>-->
        <!--</div>-->
        <!--&lt;!&ndash;今日商品排行&ndash;&gt;-->
        <!--<div class="goods">-->
          <!--<h3>今日商品排行</h3>-->
          <!--<dl>-->
            <!--<dt>{{goodsTop}}</dt>-->
            <!--<dd>售卖数量<span>{{goodsNum}}</span>个</dd>-->
          <!--</dl>-->
        <!--</div>-->
        <!--&lt;!&ndash;今日上货数量&ndash;&gt;-->
        <!--<div class="exhibit">-->
          <!--<h3>今日上货数量(个)</h3>-->
          <!--<dl>-->
            <!--<dt>{{exhibitNum}}</dt>-->
            <!--<dd>智能售货柜<span>{{exhibitDevice}}</span>台</dd>-->
          <!--</dl>-->
        <!--</div>-->
        <!--&lt;!&ndash;今日下货数量&ndash;&gt;-->
        <!--<div class="ship">-->
          <!--<h3>今日下货数量(个)</h3>-->
          <!--<dl>-->
            <!--<dt>{{shipNum}}</dt>-->
            <!--<dd>智能售货柜<span>{{shipDevice}}</span>台</dd>-->
          <!--</dl>-->
        <!--</div>-->
      <!--</section>-->
      <section class="buildingComponent">
        <div></div>
        <p>正在建设，马上开放...</p>
      </section>
      <Footer-bar></Footer-bar>
    </div>
</template>

<script>
  import FooterBar from './FooterBar';
    export default {
      name: "statement",
      data() {
          return {
            saleroom: '888.98', //销售额
            volume: '200', //交易笔数
            numberCount: '50', //售卖商品个数
            counterAddr: '瞪羚谷创业园',//柜子地址
            countAmount: '500',//柜子销售额
            goodsTop: '乐虎',//排行商品名称
            goodsNum: '50',//商品销售数量
            exhibitNum: '100',//上货数量统计
            exhibitDevice: '10',//上货设备数量统计
            shipNum: '100',//下货数量统计
            shipDevice: '10',//下货设备数量统计
          }
      },
      components: {
        FooterBar
      },
      methods: {

      }
    }
</script>

<style lang="less">
  .statement{
    height: 100vh;
    background: #fff;
    .headerTitle{
      width: 100vw;
      background: #65d172;
      height: 5.997vh;
      font-size: 2.398rem;
      line-height: 5.997vh;
      text-align: center;
      color: #fff;
      font-weight: 500;
    }
    .buildingComponent{
      div{
        width: 23.8667vw;
        height: 16.9427vh;
        background: url("../../static/images/logo.png") no-repeat center center;
        background-size: cover;
        margin: 8.395vh auto;
      }
      p{
        text-align: center;
        font-size: 2.2488rem;
      }
    }
    header{
      font-family: "PingFang SC";
      width: 100%;
      height: 29.985vh;
      background: #4dbf5b;
      p:nth-of-type(1) {
        padding-top: 5.0975vh;
        font-size: 2.248rem;
        color: #ddfbe1;
        text-align: center;
      }
      p:nth-of-type(2) {
        font-size: 6.2218vh;
        color: #ffffff;
        text-align: center;
      }
      .totalCount{
        margin-top: 2.6235vh;
        height: 5.397vh;
        dl{
          width: 49.333vw;
          float: left;
          text-align: center;
          &:nth-last-of-type(1) {
            border-left: 2px solid #ffffff;
          }
          dt{
            font-size: 2.098rem;
            color: #ddfbe1;
          }
          dd{
            font-size: 3.1484rem;
            color: #ffffff;
            font-weight: bold;
          }
        }
      }
    }
    .statement_content{
      width: 88vw;
      margin: 4.6476vh 11vw;
      overflow: hidden;
      div{
        width: 39vw;
        height: 19.34vh;
        float: left;
        &:nth-of-type(1){
          border-right: 1px solid #ebebeb;
          border-bottom: 1px solid #ebebeb;
        }
        &:nth-of-type(2){
          border-bottom: 1px solid #ebebeb;
          padding: 0 0 6.666vw 6.666vw;
        }
        &:nth-of-type(3){
          border-right: 1px solid #ebebeb;
          padding: 6.666vw 6.666vw 0 0;
        }
        &:nth-of-type(4){

          padding: 6.666vw 0 0 6.666vw ;
        }
        h3{
          font-size: 2.248rem;
          color: #666666;
          font-weight: normal;
          margin-bottom: 3.33vw;
        }
        dl{
          margin-top: 3.33vw;
          dt{
            font-size: 3.5982rem;
            color: #353a3e;
            font-weight: bold;
          }
          dd{
            margin-top: 3.33vw;
            font-size: 1.949rem;
            color: #a1a1a1;
            span{
              color: #65d172;
            }
          }
        }
      }
    }

  }
</style>
