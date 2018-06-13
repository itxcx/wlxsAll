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
        </section>
      </section>
    </div>
</template>

<script>
    export default {
        name: "MistakeInfo",
        data() {
            return {
              mistakeInfo: {}
            }
        },
        mounted() {
          this.$nextTick(() => {
            let order_id = this.$route.query.order_id;
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
            // this.$ajax({
            //   url: `http://merchant.test.weilaixiansen.com/login/sellorderdetail?order_id=${order_id}`,
            //   method: 'GET'
            // }).then((res) => {
            //   if(res.data.code == 0) {
            //     this.mistakeInfo = res.data.data;
                this.mistakeInfo = {
                  "order_id": "20180605162235044401",
                  "address": "瞪羚谷E座1层左柜（XALG0003）",
                  "goods": [{
                    "goods_id": 10001126,
                    "merchant_id": 4,
                    "goods_name": "伊利每益添原味",
                    "category": 0,
                    "price": "6.50",
                    "weight": "0.00",
                    "goods_no": "GB201802051710",
                    "picture": null,
                    "cost_price": "0",
                    "profit_type": 0,
                    "profit_param": "0",
                    "status": 1,
                    "tags": [{
                      "tag_id": 29451,
                      "tag": "AAAC2617",
                      "goods_id": 10001126,
                      "price": "6.50",
                      "device_id": 6101130004,
                      "status": 6,
                      "order_id": "20180605162235044401",
                      "discount": "0.00",
                      "put_item_id": 935,
                      "created_time": "2018-04-20 19:14:40",
                      "updated_time": "2018-06-05 16:22:51",
                      "load_id": 0
                    }, {
                      "tag_id": 29456,
                      "tag": "AAAC2622",
                      "goods_id": 10001126,
                      "price": "6.50",
                      "device_id": 6101130004,
                      "status": 6,
                      "order_id": "20180605162235044401",
                      "discount": "0.00",
                      "put_item_id": 935,
                      "created_time": "2018-04-20 19:14:40",
                      "updated_time": "2018-06-05 16:22:51",
                      "load_id": 0
                    }],
                    "tags_count": 2
                  }]
                }
            //   }else if(res.data.code == 3) {
            //     this.$router.push({
            //       path: '/'
            //     })
            //   }
            // }).catch((error) => {
            //   console.log(error);
            // })
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
    }
  }
</style>
