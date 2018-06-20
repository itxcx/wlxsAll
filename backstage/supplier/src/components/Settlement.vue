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
      <section class="settleContent">
        <loadmore :bottomMethod="getMore">
          <ul class="settleItem">
            <li v-for="(item, index) in settlementData" class="test">
              <div class="stickyBox">
                <p>{{item.month}}</p>
                <ul class="settleHeader">
                  <li>商品名称</li>
                  <li>商品标价</li>
                  <li>交易数量</li>
                  <li>交易金额</li>
                  <li>抽成金额</li>
                  <li>结算金额</li>
                </ul>
              </div>
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
              <section class="showDetail" @click="showDetail(index)">查看详情</section>
            </li>
          </ul>
          <p class="getMore">{{tipText}}</p>
        </loadmore>
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
            if(this.tipText == '上划加载更多...' && this.isRequest) {
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
                  }else {
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
                    this.settlementData[i].numberCount = numberCount.toFixed(2);
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
                  this.tipText = '上划加载更多...';
                  this.settlementData = res.data.data;
                  for(let i = 0; i < this.settlementData.length; i++) {
                    let numberCount = 0, deal_totalCount = 0, profitCount = 0, clsoe_totalCount = 0;
                    for(let j = 0; j < this.settlementData[i].goods.length; j++) {
                      numberCount += Number(this.settlementData[i].goods[j].count);
                      deal_totalCount += Number(this.settlementData[i].goods[j].deal_total);
                      clsoe_totalCount += Number(this.settlementData[i].goods[j].close_total);
                      profitCount += Number(this.settlementData[i].goods[j].profit);
                    }
                    this.settlementData[i].numberCount = numberCount.toFixed(2);
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
          }
        }
    }
</script>

<style lang="less">
  .sticky {
    position: -webkit-sticky;
    position: sticky;
  }
  .Settlement{
    background: #f1f1f1;
    padding-top: 7vh;
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
    .settleContent{
      /*height: auto;*/
      /*width: 100%;*/
      height: 93vh;
      overflow-y: auto;
      -webkit-overflow-scrolling : touch;
      .settleItem{
        >li{
          margin-bottom: 20px;
          background: #fff;
          .stickyBox{
            width: 100vw;
            position: -webkit-sticky;
            position: sticky;
            top: 0vh;
            p{
              font-size: 1.949rem;
              color: #7b7b7b;
              width: 100vw;
              padding: 1.649vh 4vw;
              border-bottom: 1px solid #e5e5e5;
              background: #fff;
              /*position: -webkit-sticky;*/
              /*position: sticky;*/
              /*top: 0;*/
            }
            .settleHeader{
              border-bottom: 1px solid #e5e5e5;
              overflow: hidden;
              background: #fff;
              /*position: -webkit-sticky;*/
              /*position: sticky;*/
              /*top: 6.3vh;*/
              li{
                float: left;
                width: 16.666vw;
                text-align: center;
                font-size: 1.949rem;
                color: #7b7b7b;
                padding: 1.499vh 4vw;
              }
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
  }
</style>
