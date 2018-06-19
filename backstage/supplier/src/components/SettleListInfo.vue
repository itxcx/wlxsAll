<template>
    <div class="SettleListInfo">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>销售结算详情</p>
        </section>
      </header>
      <ul class="settleHeader">
        <li>商品名称</li>
        <li>商品标价</li>
        <li>交易数量</li>
        <li>交易金额</li>
        <li>抽成金额</li>
        <li>结算金额</li>
      </ul>
      <section class="total">
        <span>合计</span>
        <span></span>
        <span>{{count.numberCount}}</span>
        <span>{{count.deal_totalCount}}</span>
        <span>{{count.profitCount}}</span>
        <span>{{count.clsoe_totalCount}}</span>
      </section>
      <section class="settleContent">
        <ul class="settleItem">
          <li v-for="(item, index) in settleListArray" class="test">
            <p>{{item.date}}</p>
            <ul class="settleList">
              <li v-for="(items, ids) in item.goods">
                <span>{{items.goods_name}}</span>
                <span>{{items.price}}</span>
                <span>{{items.count}}</span>
                <span>{{items.deal_total}}</span>
                <span>{{items.profit}}</span>
                <span>{{items.clsoe_total}}</span>
              </li>
            </ul>
          </li>
        </ul>
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
        name: "SettleListInfo",
        data() {
            return {
              settleListArray: [],
              count: {},
              loadingModal: false,
            }
        },
        mounted() {
          this.$nextTick(() => {
            let date1 = this.$route.query.date1;
            let date2 = this.$route.query.date2;
            this.count = JSON.parse(localStorage.getItem('allCount'));
            this.getSettleInfoData(date1, date2);
          })
        },
        methods: {
          //返回
          goBack() {
            this.$router.push({
              path: '/settlement'
            })
          },
          //获取数据
          getSettleInfoData(date1, date2) {
            this.loadingModal = true;
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/checkoutbyday?date1=${date1}&date2=${date2}`,
              method: 'GET'
            }).then((res) => {
              this.loadingModal = false;
              if(res.data.code == 0) {
                this.settleListArray = res.data.data;
              }else if(res.data.code == 3) {
                this.$router.push({
                  path: '/'
                })
              }
            }).catch((error) => {
              console.log(error);
            })
          }
        }
    }
</script>

<style lang="less">
  .SettleListInfo{
    background: #f1f1f1;
    padding: 20vh 0 2vh 0;
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
    .settleHeader{
      border-bottom: 1px solid #e5e5e5;
      overflow: hidden;
      background: #fff;
      position: fixed;
      top: 6vh;
      z-index: 900;
      li{
        float: left;
        width: 16.666vw;
        text-align: center;
        font-size: 1.949rem;
        color: #7b7b7b;
        padding: 1.499vh 4vw;
      }
    }
    .total{
      width: 100%;
      border: 1px solid #e5e5e5;
      border-left: none;
      border-right: none;
      padding: 1.874vh 2vw;
      font-size: 1.949rem;
      position: fixed;
      background: #fff;
      top: 14.8vh;
      z-index: 900;
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
    .settleContent{
      height: 93vh;
      overflow-y: auto;
      -webkit-overflow-scrolling : touch;

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
            top: 1vh;
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
        }
      }
    }
  }
</style>
