<template>
    <div class="Settlement">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>销售结算</p>
        </section>
      </header>
      <!--&lt;!&ndash; 按钮 &ndash;&gt;-->
      <!--<section class="fixBtn" @click="fixSettleData"></section>-->
      <!-- 销售数据 -->
      <!--<section class="salesModal" v-show="salesModal">-->
        <!--<section class="salesContent">-->
          <!--<h3>销售数据</h3>-->
          <!--<ul class="salesHeader">-->
            <!--<li>日期</li>-->
            <!--<li>上货</li>-->
            <!--<li>下货</li>-->
            <!--<li>销售</li>-->
            <!--<li>库存</li>-->
          <!--</ul>-->
          <!--<ul class="salesItem">-->
            <!--<li v-for="(item, index) in salesModalData.part">-->
              <!--<span>{{item.month.split('-')[1]}}月</span>-->
              <!--<span>{{item.counts.load ? item.counts.load : '0'}}</span>-->
              <!--<span>{{item.counts.unload ? item.counts.unload : '0'}}</span>-->
              <!--<span>{{item.counts.sale ? item.counts.sale : '0'}}</span>-->
              <!--<span>{{item.counts.store ? item.counts.store : '/'}}</span>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<ul class="salesTotal">-->
            <!--<li>-->
              <!--<span>合计</span>-->
              <!--<span>{{salesModalData.sum.load ? salesModalData.sum.load : '0'}}</span>-->
              <!--<span>{{salesModalData.sum.unload ? salesModalData.sum.unload : '0'}}</span>-->
              <!--<span>{{salesModalData.sum.sale ? salesModalData.sum.sale : '0'}}</span>-->
              <!--<span>{{salesModalData.sum.store? salesModalData.sum.store : '0'}}</span>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<section class="closeBtn" @click="closeBtn">关闭</section>-->
        <!--</section>-->
      <!--</section>-->
      <ul class="settleHeader">
        <li>商品名称</li>
        <li>交易单价</li>
        <li>交易数量</li>
        <li>交易总额</li>
        <li>抽成金额</li>
        <li>结算金额</li>
      </ul>
      <section class="settleContent">
        <!--<loadmore :bottomMethod="getMore">-->
          <ul class="settleItem">
            <li v-for="(item, index) in settlementData" class="test">
              <p>
                <span>{{item.month}}</span>
                <span @click="showDetail(index)">每日销售明细</span>
              </p>
              <ul class="settleList">
                <li v-for="(items, ids) in item.goods">
                  <span>{{items.goods_name}}</span>
                  <span>{{items.price}}</span>
                  <span>{{items.count}}</span>
                  <span>{{items.deal_total}}</span>
                  <span>{{items.profit}}</span>
                  <span>{{items.close_total}}</span>
                </li>
              </ul>
              <section class="total">
                <span>合计</span>
                <span></span>
                <span>{{item.numberCount}}</span>
                <span>{{item.deal_totalCount}}</span>
                <span>{{item.profitCount}}</span>
                <span>{{item.clsoe_totalCount}}</span>
              </section>
              <!--<section class="showDetail" @click="showDetail(index)">查看详情</section>-->
            </li>
          </ul>
          <p class="getMore" @click="getMore">{{tipText}}</p>
        <!--</loadmore>-->
      </section>
      <!-- 加载中提示框 -->
      <section class="loading" v-show="loadingModal">
        <Spin size="large"></Spin>
        <p>数据获取中...</p>
      </section>
    </div>
</template>

<script>
    export default {
        name: "Settlement",
        data() {
            return {
              settlementData: [],
              Year: '',
              page: 1,
              tipText: '',
              isRequest: true,
              loadingModal: false,
              // salesModal: false,
              // salesModalData: {
              //   sum: {
              //     "load": 0,
              //     "unload": 0,
              //     "sale": 0,
              //     "store": 0
              //   }
              // }
            }
        },
        mounted() {
          this.$nextTick(() => {
            this.getSettlementData(0);

          })
          ///////////////////////////////////////////////////
          // let settleContent = document.getElementsByClassName('settleContent')[0];
          // function navChangeArea(message, height) {
          //   console.log(height);
          //   console.log(message);
          //   var liveDiv = $("#" + message).length ? $("#" + message) : $("." + message);
          //   // let liveDiv = document.getElementsByClassName('stickyBox');
          //   if(/android/i.test(navigator.userAgent)){
          //     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          //     console.log(scrollTop);
          //     if (scrollTop < height) {
          //       liveDiv.css("position", "relative");
          //       // liveDiv.style.position = "relative";
          //     } else {
          //       liveDiv.css("position", "fixed");
          //       // liveDiv.style.position = "fixed";
          //     }
          //   }
          //   if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
          //     liveDiv.addClass("sticky");
          //   }
          // }
          // settleContent.addEventListener("scroll", function() {
          //   navChangeArea("stickyBox", 100);
          // });
          // settleContent.addEventListener("touchmove", function() {
          //   navChangeArea("stickyBox", 100);
          // });
///////////////////////////////////////////////////
        },
        methods: {
          //返回按钮
          goBack() {
            this.$router.push({
              path: '/personal'
            })
          },
          //获取更多
          getMore() {
            if(this.tipText == '点击加载更多...' && this.isRequest) {
              this.isRequest = false;
              this.$ajax({
                url: `http://merchant.test.weilaixiansen.com/login/checkoutbymonth?page=${this.page}`,
                method: 'GET'
              }).then((res) => {
                if(res.data.code == 0) {
                  if(res.data.data[0].goods.length === 0) {
                    this.tipText = '暂无更多数据';
                  }else if(res.data.data[0].goods.length !== 0 && res.data.data[1].goods.length === 0) {
                    this.tipText = '暂无更多数据';
                    this.settlementData = this.settlementData.concat(res.data.data[0]);
                  }else{
                    this.settlementData = this.settlementData.concat(res.data.data);
                    this.isRequest = true;
                    this.page++;
                  }
                  for(let i = 0; i < this.settlementData.length; i++) {
                    let numberCount = 0, deal_totalCount = 0, profitCount = 0, clsoe_totalCount = 0;
                    for(let j = 0; j < this.settlementData[i].goods.length; j++) {
                      numberCount += Number(this.settlementData[i].goods[j].count);
                      deal_totalCount += Number(this.settlementData[i].goods[j].deal_total);
                      clsoe_totalCount += Number(this.settlementData[i].goods[j].close_total);
                      profitCount += Number(this.settlementData[i].goods[j].profit);
                    }
                    this.settlementData[i].numberCount = numberCount;
                    this.settlementData[i].deal_totalCount = deal_totalCount.toFixed(2);
                    this.settlementData[i].profitCount = profitCount.toFixed(2);
                    this.settlementData[i].clsoe_totalCount = clsoe_totalCount.toFixed(2);
                  }
                }else if(res.data.code == 3) {
                  this.$router.push({
                    path: '/'
                  })
                }
              }).catch((error) => {
                console.log(error);
              })
            }
          },
          //获取数据方法
          getSettlementData(page) {
            this.loadingModal = true;
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/checkoutbymonth?page=${page}`,
              method: 'GET'
            }).then((res) => {
                if(res.data.code == 0) {
                  this.loadingModal = false;
                  this.tipText = '点击加载更多...';
                  this.settlementData = res.data.data;
                  for(let i = 0; i < this.settlementData.length; i++) {
                    let numberCount = 0, deal_totalCount = 0, profitCount = 0, clsoe_totalCount = 0;
                    for(let j = 0; j < this.settlementData[i].goods.length; j++) {
                      numberCount += Number(this.settlementData[i].goods[j].count);
                      deal_totalCount += Number(this.settlementData[i].goods[j].deal_total);
                      clsoe_totalCount += Number(this.settlementData[i].goods[j].close_total);
                      profitCount += Number(this.settlementData[i].goods[j].profit);
                    }
                    this.settlementData[i].numberCount = numberCount;
                    this.settlementData[i].deal_totalCount = deal_totalCount.toFixed(2);
                    this.settlementData[i].profitCount = profitCount.toFixed(2);
                    this.settlementData[i].clsoe_totalCount = clsoe_totalCount.toFixed(2);
                  }
                  if(res.data.data.length == 0) {
                    this.tipText = '没有更多数据';
                  }
                }else if(res.data.code == 3) {
                  this.$router.push({
                    path: '/'
                  })
                }
            }).catch((error) => {
              console.log(error);
            })
          },
          //查看详情
          showDetail(index) {
            let date1 = this.settlementData[index].begin;
            let date2 = this.settlementData[index].end;
            let count = {
              numberCount: this.settlementData[index].numberCount,
              deal_totalCount: this.settlementData[index].deal_totalCount,
              profitCount: this.settlementData[index].profitCount,
              clsoe_totalCount: this.settlementData[index].clsoe_totalCount,
            }
            localStorage.setItem('allCount', JSON.stringify(count));
            this.$router.push({
              path: '/settleListInfo',
              query: {
                date1: date1,
                date2: date2
              }
            })
          },
          //按钮查看数据

          // fixSettleData() {
          //   this.salesModal = true;
          //   this.loadingModal = true;
          //   this.$ajax({
          //     url: `http://merchant.test.weilaixiansen.com/login/totalcount`,
          //     method: 'GET'
          //   }).then((res) => {
          //     this.loadingModal = false;
          //     if(res.data.code == 0) {
          //       this.salesModalData = res.data.data;
          //     }else if(res.data.code == 3) {
          //       this.$router.push({
          //         path: '/'
          //       })
          //     }
          //   }).catch((error) => {
          //     console.log(error);
          //   })
          //   // this.salesModalData = {
          //   //   "part": [{
          //   //   "month": "2018-05",
          //   //   "counts": {
          //   //     "load": "119",
          //   //     "unload": "46",
          //   //     "sale": "112"
          //   //   }
          //   // }, {
          //   //   "month": "2018-06",
          //   //   "counts": {
          //   //     "load": "254",
          //   //     "unload": "45",
          //   //     "sale": "49"
          //   //   }
          //   // }],
          //   //   "sum": {
          //   //   "load": 373,
          //   //     "unload": 91,
          //   //     "sale": 161,
          //   //     "store": 45
          //   // }
          //   // }
          // },
          //close

          closeBtn() {
            this.salesModal = false;
            this.salesModalData = {
              sum: {
                "load": 0,
                  "unload": 0,
                  "sale": 0,
                  "store": 0
              }
            }
          }
        }
    }
</script>

<style lang="less">
  .Settlement{
    background: #f1f1f1;
    padding-top: 14vh;
    /*.fixBtn{*/
      /*width: 24.26vw;*/
      /*height: 24.26vw;*/
      /*background: url(../../static/images/bt_xiaoshoushuju.png) no-repeat center center;*/
      /*background-size: cover;*/
      /*position: fixed;*/
      /*bottom: 5vw;*/
      /*right: 5vw;*/
      /*z-index: 99;*/
      /*transition: all 0.15s linear;*/
      /*&:active{*/
        /*opacity: 0.9;*/
        /*transform: scale(0.98);*/
      /*}*/
    /*}*/
    .loading{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 20vh;
      text-align: center;
      height: 10vh;
      color: #65d172;
      border-radius: 10px;
      font-size: 2.388rem;
      z-index: 999;
      .ivu-spin{
        width: 10vw;
        height: 10vw;
        margin: 0 auto;
      }
      .ivu-spin-dot{
        background: #65d172;
      }
    }
    header{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 98;
      .login_top{
        background: #65d172;
        width: 100vw;
        height: 5.997vh;
        font-size: 2.398rem;
        line-height: 5.997vh;
        text-align: center;
        color: #fff;
        font-weight: 500;
        span{
          position: absolute;
          left: 4vw;
          top: 0;
        }
      }
    }
    .settleHeader{
      border-bottom: 1px solid #e5e5e5;
      overflow: hidden;
      background: #fff;
      position: fixed;
      top: 6vh;
      left: 0;
      z-index: 99;
      li{
        float: left;
        width: 16.666vw;
        text-align: center;
        font-size: 1.949rem;
        color: #7b7b7b;
        padding: 1.499vh 4vw;
      }
    }
    .settleContent{
      height: 86vh;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      .settleItem{
        >li{
          margin-bottom: 20px;
          background: #fff;
          p{
            font-size: 1.949rem;
            color: #7b7b7b;
            width: 100vw;
            padding: 1.649vh 4vw;
            border-bottom: 1px solid #e5e5e5;
            background: #fff;
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            span:nth-of-type(2) {
              color: #65d172;
              float: right;
              font-weight: bold;
              font-size: 2.198rem;
            }
          }
          .settleList{
            li{
              padding: 1.874vh 2vw;
              font-size: 1.949rem;
              &:nth-of-type(even) {
                background: #f7f7f7;
              }
              span{
                display: inline-block;
                width: 15%;
                text-align: center;
                vertical-align: middle;
                &:nth-of-type(1) {
                  width: 18%;
                }
                &:nth-last-of-type(1) {
                  text-align: right;
                }
              }

            }
          }
          .total{
            border: 1px solid #e5e5e5;
            border-left: none;
            border-right: none;
            padding: 1.874vh 2vw;
            font-size: 1.949rem;
            span{
              display: inline-block;
              width: 15%;
              text-align: center;
              &:nth-of-type(1) {
                color: #373737;
                width: 18%;
              }
              &:nth-last-of-type(1) {
                text-align: right;
              }
            }
          }
          .showDetail{
            font-size: 2.3988rem;
            color: #65d172;
            padding: 2.2488vh 0;
            text-align: center;
          }
        }
      }

    }
    .getMore{
      text-align: center;
      padding: 1vh 0;
      font-weight: bold;
      font-size: 1.924rem;
      width: 100vw;
    }
    /*.salesModal{*/
      /*width: 100vw;*/
      /*height: 100vh;*/
      /*position: fixed;*/
      /*top: 0;*/
      /*right: 0;*/
      /*background: rgba(0,0,0,.6);*/
      /*z-index: 100;*/
      /*.salesContent{*/
        /*background: #fff;*/
        /*width: 94vw;*/
        /*margin: 10vh auto;*/
        /*border-radius: 5px;*/
        /*padding: 3.448vh 6vw;*/
        /*h3{*/
          /*text-align: center;*/
          /*font-size: 2.548rem;*/
          /*color: #373737;*/
          /*font-weight: bold;*/
        /*}*/
        /*.salesHeader{*/
          /*overflow: hidden;*/
          /*margin-top: 3.448vh;*/
          /*font-size: 2.2488rem;*/
          /*padding-bottom: 1.499vh;*/
          /*border-bottom: 1px solid #e5e5e5;*/
          /*li{*/
            /*width: 20%;*/
            /*float: left;*/
            /*text-align: center;*/
          /*}*/
        /*}*/
        /*.salesItem{*/
          /*height: 42vh;*/
          /*overflow-y: auto;*/
          /*-webkit-overflow-scrolling: touch;*/
          /*li{*/
            /*border-bottom: 1px solid #e5e5e5;*/
            /*padding: 3.3733vh 0;*/
            /*span{*/
              /*display: inline-block;*/
              /*font-size: 2.0488rem;*/
              /*width: 19%;*/
              /*text-align: center;*/
            /*}*/
          /*}*/
        /*}*/
        /*.salesTotal{*/
          /*li{*/
            /*padding: 3.3733vh 0;*/
            /*span{*/
              /*font-size: 2.0488rem;*/
              /*display: inline-block;*/
              /*width: 19%;*/
              /*text-align: center;*/
            /*}*/
          /*}*/
        /*}*/
        /*.closeBtn{*/
          /*width: 79.2vw;*/
          /*height: 10.4198vh;*/
          /*background: url("../../static/images/button_bg.png") no-repeat center center;*/
          /*background-size: cover;*/
          /*text-align: center;*/
          /*font-size: 2.2488rem;*/
          /*color: #fff;*/
          /*line-height: 8.4198vh;*/
          /*position: absolute;*/
          /*bottom: 0;*/
          /*left: 10.4vw;*/
          /*transition: all 0.15s linear;*/
          /*&:active{*/
            /*opacity: 0.9;*/
            /*transform: scale(0.98);*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/
  }
</style>
