<template>
    <div class="MistakeInfo">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>订单详情</p>
        </section>
      </header>
      <section class="misInfoContent">
        <section class="orderId">
          <span>订单编号:</span>
          <span>{{mistakeInfo.order_id}}</span>
          <span>未付款</span>
        </section>
        <section class="detailInfo">
          <ul class="header">
            <li>商品名称</li>
            <li>标签编号</li>
            <li>金额</li>
            <li>状态</li>
          </ul>
          <ul class="detailContent">
            <li v-for="(item, index) in mistakeInfo.goods">
              <section>{{item.goods_name}}</section>
              <section>
                <div v-for="item1 in item.status">
                  <span v-for="itemss in item1.tags">{{itemss}}</span>
                </div>
              </section>
              <section>{{item.price}}</section>
              <section>
                <div v-for="item2 in item.status">
                  <span>{{item2.message}}</span>
                </div>
              </section>
            </li>
          </ul>
        </section>
        <section class="payType">
          <span>支付方式:</span>
          <span>待统一支付</span>
        </section>
        <section class="otherInfo">
          <section>
            <span>下单地点:</span>
            <span>{{mistakeInfo.address}}</span>
          </section>
          <section>
            <span>下单时间:</span>
            <span>{{time}}</span>
          </section>
          <section>
            <span>商品金额:</span>
            <span>￥{{mistakeInfo.amount}}</span>
          </section>
        </section>
        <p class="phone">*如订单明细有异常,请致电客服热线<a href="tel:4007707768">400-770-7768</a></p>
      </section>
    </div>
</template>

<script>
    export default {
        name: "MistakeInfo",
        data() {
            return {
              mistakeInfo: {},
              time: ''
            }
        },
        mounted() {
          this.$nextTick(() => {
            let order_id = this.$route.query.order_id;
            this.time = this.$route.query.time;
            this.mistakeInfoDetail(order_id);
          })
        },
        methods: {
          //返回按钮
          goBack() {
            this.$router.push({
              path: '/mistake'
            })
          },
          //获取数据
          mistakeInfoDetail(order_id) {
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/sellorderdetail?order_id=${order_id}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.mistakeInfo = res.data.data;

                // this.mistakeInfo = {
                //   "order_id": "20180605162235044401",
                //   "address": "瞪羚谷E座1层左柜（XALG0003）",
                //   "goods": [{
                //     "goods_name": "伊利每益添原味",
                //     "price": "6.50",
                //     "status": [{
                //       "status": 6,
                //       "tags": ["AAAC2617", "AAAC2622"],
                //       "message": "商户购买"
                //     }]
                //   }]
                // }

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
  .MistakeInfo{
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
    .misInfoContent{
      padding-top: 6vh;
      background: #f1f1f1;
      height: 100vh;
      .orderId{
        background: #fff;
        padding: 3.337vh;
        font-size: 2.398rem;
        span:nth-of-type(1) {
          color: #999898;
          display: inline-block;
          width: 23%;
        }
        span:nth-of-type(2) {
          color: #373737;
          font-size: 2.098rem;
          display: inline-block;
          width: 50%;
        }
        span:nth-of-type(3) {
          color: #373737;
          display: inline-block;
          width: 22%;
          text-align: right;
        }
      }
      .detailInfo{
        background: #fff;
        margin-top: 1.499vh;
        .header{
          overflow: hidden;
          padding: 0 3.337vh;
          li{
            float: left;
            padding: 1.499vh 0;
            font-size: 2.398rem;
            text-align: center;
            &:nth-of-type(1) {
              width: 27%;
            }
            &:nth-of-type(2) {
              width: 27%;
            }
            &:nth-of-type(3) {
              width: 20%;
            }
            &:nth-of-type(4) {
              width: 26%;
            }
          }
        }
      }
      .detailContent{
        li{
          overflow: hidden;
          padding: 1.874vh 0;
          font-size: 2.098rem;
          border-top: 1px solid #e5e5e5;
          vertical-align: bottom;
          section{
            float: left;
            &:nth-of-type(1) {
              width: 28%;
              text-align: center;
            }
            &:nth-of-type(2) {
              width: 25%;
              span{
                display: inline-block;
              }
            }
            &:nth-of-type(3) {
              width: 18%;
            }
            &:nth-of-type(4) {
              width: 27%;
            }
          }
        }
      }
      .payType{
        background: #fff;
        padding: 3.337vh;
        margin-top: 1.499vh;
        font-size: 2.398rem;
        span:nth-of-type(1) {
          color: #999898;
          display: inline-block;
          width: 26%;
        }
        span:nth-of-type(2) {
          color: #373737;
        }
      }
      .otherInfo{
        margin-top: 1.499vh;
        section{
          background: #fff;
          padding: 3.337vh;
          font-size: 2.398rem;
          span:nth-of-type(1) {
            color: #999898;
            display: inline-block;
            width: 26%;
          }
          span:nth-of-type(2) {
            display: inline-block;
            color: #373737;
            width: 70%;
          }
        }
      }
      .phone{
        font-size: 2.098rem;
        color: #999898;
        margin: 2.098vh 0;
        text-align: center;
        a{
          color: #999898;
        }
      }
    }
  }
</style>
