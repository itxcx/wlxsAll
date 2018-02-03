<template>
  <div class="OrderSucItem">
    <section class="itemInfo">
      <div class="orderId">
        <span>订单编号:</span>
        <span>{{orderSucItem.orderId}}</span>
      </div>
      <div class="userId">
        <span>下单账号:</span>
        <span>{{phone}}</span>
      </div>
      <div class="orderTime">
        <span>下单时间:</span>
        <span>{{orderSucItem.orderTime}}</span>
      </div>
      <div class="orderAddress">
        <span>下单地址:</span>
        <span>{{orderSucItem.addr}}</span>
      </div>
      <div class="listTitle">
        <span>商品明细</span>
        <span> 所有商品不参与兑奖</span>
      </div>
      <ul class="orderList">
        <li v-for="item in orderSucItem.items">
          <div class="itemImg"></div>
          <dl>
            <dt>{{item.name}}</dt>
            <dd>
              <span>￥{{item.price}}</span>
              <span>￥{{item.origin_price}}</span>
            </dd>
          </dl>
          <div>x{{item.number}}</div>
        </li>
      </ul>
      <div class="amount">
        <span>实付金额</span>
        <span>￥{{orderSucItem.amount}}</span>
      </div>
      <div class="discount">
        <span>优惠金额</span>
        <span>-￥{{orderSucItem.discount}}</span>
      </div>
      <div class="orderMsg" v-show="note">{{note}}</div>
    </section>
    <section class="msg">
    </section>
  </div>
</template>

<script>
export default ({
  name: 'OrderSucItem',
  data() {
    return {
      orderId:'',
      orderSucItem:{},
      note:'',
      phone: ''
    }
  },
  beforeMount(){ //虚拟DOM创建
    function getUrlQuery(){ //从url中获取orderId
      let name = null;
      let value = null;
      let str = decodeURIComponent(location.href);
      let num = str.indexOf("?");
      str = str.substr(num + 1);
      let arr = str.split("&");
      for(let i = 0; i < arr.length; i++){
        num = arr[i].indexOf("=");
        if(num > 0){
          name = arr[i].substring(0, num);
          value = arr[i].substr(num + 1);
          this[name] = value;
        }
      }
    }
    let params = new getUrlQuery();
    this.orderId = params.orderId;
    this.phone = params.phone;
    if(params.note){
      this.note = params.note;
    }
  },
  mounted (){
    this.$nextTick(() => {
      this.$http({
        url: 'user/orderDetail',
        method: 'post',
        data: this.transformRequest({order: this.orderId}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
      }).then( (res) => {
        this.orderSucItem = res.data.data;
      }).catch( (error) => {
        console.log(error);
      })
    })
  },
  methods:{
    transformRequest(data) {
      let ret = '';
      for (let i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
      }
      return ret;
    }
  }
})
</script>

<style lang="less">
  @headerHeight : 6vh;
  .OrderSucItem {
    background: #f2f2f2;
    .itemInfo{
      font-size: 2.5vh;
      background: #fff;
      padding: 0 3vw;
      .orderId, .userId, .orderTime{
        padding: 2vh 0;
        border-bottom: 1px solid #f2f2f2;
      }
      .orderId, .userId, .orderTime{
        span:nth-of-type(1){
          display: inline-block;
          color: #939393;
          width: 11.5vh;
        }
      }
      .orderAddress{
        padding: 2vh 0;
        border-bottom: 1px solid #f2f2f2;
        overflow: hidden;
        span:nth-of-type(1){
          float: left;
          width: 11.5vh;
          color: #939393;
        }
        span:nth-of-type(2){
          float: left;
          width: 73vw;
        }
      }
      .listTitle{
        height: 7vh;
        line-height: 7vh;
        border-bottom: 1px solid #f2f2f2;
        span:nth-of-type(1){
          font-weight: 600;
        }
        span:nth-of-type(2){
          float: right;
          padding-right: 2vw;
          font-weight: 600;
          color: #f73c3b;
          font-size: 2vh;
        }
      }
      .orderList{
        list-style: none;
        li{
          padding: 1vh 0;
          overflow: hidden;
          border-bottom: 1px solid #f2f2f2;
          .itemImg{
            width: 10vh;
            height: 10vh;
            background: url(../../static/images/logo.png) no-repeat center center;
            background-size: cover;
            border-radius: 5px;
            border: 1px solid #f2f2f2;
            float: left;
          }
          dl{
            padding-top: 2vh;
            float: left;
            margin-left: 3vw;
            width: 58vw;
            height: 10vh;
            dt,dd{
              font-weight: normal;
            }
            dd{
              span:nth-of-type(1){
                color: #f73c3b;
              }
              span:nth-of-type(2){
                font-size: 2vh;
                text-decoration: line-through;
              }
            }
          }
          div:nth-of-type(2){
            margin-left: 3vw;
            height: 10vh;
            line-height: 10vh;
            text-align: center;
            float: left;
            width: 10vw;
          }
        }
      }
      .amount, .discount{
        padding: 2vh 0;
        border-bottom: 1px solid #f2f2f2;
        span:nth-of-type(1){
          width: 12vh;
          display: inline-block;
          color: #939393;
        }
        span:nth-of-type(2){
          float: right;
          margin-right: 2vh;
          font-size: 3vh;
          color: #f73c3b;
        }
      }
      .orderMsg{
        padding: 2vh 3vw;
        text-align: right;
        font-size: 1.8vh;
        color: #f73c3b;
        word-wrap: break-word;
        font-weight: 600;
      }
    }
    .msg{
      margin: 15vh 0;
      text-align: center;
      color: #222;
      height: 5vh;
    }
  }
</style>
