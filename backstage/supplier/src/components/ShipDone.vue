<template>
  <div class="ShipDone">
    <header>
      <div class="pageTitle">
        <span @click="goBack"><Icon type="chevron-left"></Icon></span>
        <span>下架完成</span>
      </div>
      <div class="location">
        <span></span>
        <span v-html="location">{{location}}</span>
      </div>
    </header>
    <section class="exhibInfo">
      <h3>本次下架商品
        <span>{{itemList.total_count}}</span>个
      </h3>
      <p>
        (扣款: <span>{{price}}</span>元)
      </p>
    </section>
    <section class="checkContent">
      <p>自家商品</p>
      <ul class="headerList">
        <li>序号</li>
        <li>商品名称</li>
        <li>数量</li>
        <li>编号</li>
      </ul>
      <ul class="checkItemList">
        <li v-for="(item, index) in itemList.goods">
          <span>{{index + 1}}</span>
          <span>{{item.goods_name}}</span>
          <span>{{item.goods_count}}</span>
          <span @click="showLabel(index, 'own')">查看</span>
        </li>
      </ul>
    </section>
    <section class="checkContent" v-show="checkOut">
      <p>其他商品</p>
      <ul class="headerList">
        <li>序号</li>
        <li>商品名称</li>
        <li>数量</li>
        <li>编号</li>
      </ul>
      <ul class="checkItemList">
        <li v-for="(item, index) in itemList.sale_goods">
          <span>{{index + 1}}</span>
          <span>{{item.goods_name}}</span>
          <span>{{item.goods_count}}</span>
          <span @click="showLabel(index, 'other')">查看</span>
        </li>
      </ul>
    </section>
    <section class="confirmBtn">
      <p @click="exhibDone">完成</p>
    </section>
    <transition name="fade">
    <section class="labelModal" v-show="modalToggle">
      <section class="labelContent">
        <p>{{labelInfo.goods_name}}-标签标号</p>
        <div class="labelList">
          <ul>
            <li v-for="label in labelInfo.tags">{{label}}</li>
          </ul>
        </div>
      </section>
      <section class="closeBtn" @click="closeBtn">关闭</section>
    </section>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "ShipDone",
    data() {
      return {
        location: '', //设备地址
        modalToggle: false, //标签列表查看显示
        labelInfo: {},
        itemList: {}, //商品列表
        price: 0,//价格
        checkOut: false,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.itemList = JSON.parse(localStorage.getItem('exhibData'));
        // this.itemList = {
        //   "goods": [
        //   {
        //     "goods_name": "摆渡乐源壹品(芒果)",
        //     "goods_count": 1,
        //     "tags": ["AAAB9176"]
        //   }, {
        //     "goods_name": "清谷田园",
        //     "goods_count": 1,
        //     "tags": ["AAAC8741"]
        //   },
        //     {
        //       "goods_name": "清谷田园",
        //       "goods_count": 1,
        //       "tags": ["AAAC8741"]
        //     },
        //     {
        //       "goods_name": "清谷田园",
        //       "goods_count": 1,
        //       "tags": ["AAAC8741"]
        //     },
        //     {
        //       "goods_name": "清谷田园",
        //       "goods_count": 1,
        //       "tags": ["AAAC8741"]
        //     },
        //     {
        //       "goods_name": "清谷田园",
        //       "goods_count": 1,
        //       "tags": ["AAAC8741"]
        //     }],
        //   "sale_goods": [{
        //     "goods_name": "摆渡乐源壹品(芒果)",
        //     "goods_count": 1,
        //     "tags": ["AAAB9176"]
        //   }, {
        //     "goods_name": "清谷田园",
        //     "goods_count": 1,
        //     "tags": ["AAAC8741"]
        //   },
        //     {
        //       "goods_name": "清谷田园",
        //       "goods_count": 1,
        //       "tags": ["AAAC8741"]
        //     },
        //     {
        //       "goods_name": "清谷田园",
        //       "goods_count": 1,
        //       "tags": ["AAAC8741"]
        //     },
        //     {
        //       "goods_name": "清谷田园",
        //       "goods_count": 1,
        //       "tags": ["AAAC8741"]
        //     },
        //     {
        //       "goods_name": "清谷田园",
        //       "goods_count": 1,
        //       "tags": ["AAAC8741"]
        //     }],
        //   "total_count": 2
        // }
        if(this.itemList.sale_goods.length > 0) {
          this.checkOut = true;
          for(let i = 0; i < this.itemList.sale_goods.length; i++) {
            this.price += this.itemList.sale_goods[i].goods_count;
          }
        }
        this.price = this.price.toFixed(2);//显示价格
        this.location = localStorage.getItem('device_address');
      })
    },
    methods: {
      //查看标签
      showLabel(index, type) {
        this.labelInfo = {};
        this.modalToggle = true;
        if(type === 'own') {
          this.labelInfo = this.itemList.goods[index];
        }else if(type === 'other'){
          this.labelInfo = this.itemList.sale_goods[index];
        }
      },
      //完成按钮方法
      exhibDone() {
        this.$router.push({
          path: '/main'
        })
      },
      //关闭显示框
      closeBtn() {
        this.modalToggle = false;
      },
      goBack() {
        this.$router.push({
          path: '/main'
        })
      }
    }
  }
</script>

<style lang="less">
  .ShipDone{
    padding-top: 15vh;
    width: 100vw;
    height: 100vh;
    header{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      background: #65d172;
      color: #fff;
      padding-bottom: 2.248vh;
      .pageTitle{
        width: 100%;
        height: 4.497vh;
        position: relative;
        font-size: 2.698rem;
        span:nth-of-type(1) {
          position: absolute;
          left: 4.6667vw;;
          top: 0;
        }
        span:nth-of-type(2) {
          display: block;
          width: 100%;
          text-align: center;
          height: 4.497vh;
          line-height: 4.497vh;
        }
      }
      .location{
        margin-top: 3.3733vh;
        span:nth-of-type(1) {
          margin-left: 4.6667vw;
          display: inline-block;
          width: 4.6667vw;
          height: 3.598vh;
          background: url("../../static/images/green_location.png") no-repeat center center;
          background-size: cover;
          vertical-align: bottom;
        }
        span:nth-of-type(2) {
          font-size: 2.6986rem;
          margin-left: 2vw;
        }
      }
    }
    .exhibInfo{
      text-align: center;
      padding: 3.7481vh 0 2.6986vh 0;
      border-bottom: 20px solid #f1f1f1;
      h3{
        font-size: 2.5487rem;
        padding-bottom: 2.6986vh;
        font-weight: normal;
        color: #373737;
        span{
          font-size: 2.6986rem;
          color: #65d172;
        }
      }
      p{
        height: 2.923vh;
        font-size: 2.5487vh;
        color: #373737;
        span {
          display: inline-block;
          height: 2.923vh;
          font-size: 2.0989vh;
          color: #65d172;
        }
      }
    }
    .checkContent{
      p{
        font-size: 2.3988rem;
        font-weight: bold;
        padding-left: 1.6667vw;
      }
      .headerList{
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        li{
          float: left;
          text-align: center;
          font-size: 2.2488rem;
          color: #7b7b7b;
          padding: 1.499vh 0;
          &:nth-of-type(1), &:nth-of-type(3) {
            width: 11%;
          }
          &:nth-of-type(2) {
            width: 50%;
          }
          &:nth-of-type(4) {
            width: 25%;
          }
        }
      }
      .checkItemList{
        height: 20vh;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        li{
          span{
            text-align: center;
            font-size: 2.2488rem;
            display: inline-block;
            width: 21%;
            color: #373737;
            padding: 1.874vh 0;
            &:nth-of-type(1){
              width: 10%;
              font-weight: bold;
            }
            &:nth-of-type(3) {
              width: 10%;
            }
            &:nth-of-type(2) {
              width: 50%;
              font-weight: bold;
            }
            &:nth-of-type(4) {
              width: 16%;
              border: 1px solid #65d172;
              color: #65d172;
              border-radius: 20px;
              padding: 0;
              margin-left: 5%;
            }
          }
          &:nth-of-type(even) {
            background: #f7f7f7;
          }
        }
      }
    }
    .confirmBtn{
      position: fixed;
      left: 10.4vw;
      bottom: 0;
      height: 10.4198vh;
      width: 79.2vw;
      z-index: 2;
      p{
        width: 79.2vw;
        height: 10.4198vh;
        background: url("../../static/images/button_bg.png") no-repeat center center;
        background-size: cover;
        text-align: center;
        font-size: 2.2488rem;
        color: #fff;
        line-height: 8.4198vh;
        transition: all 0.15s linear;
        &:active{
          opacity: 0.9;
          transform: scale(0.98);
        }
      }
    }
    .labelModal{
      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 9;
      background: rgba(0,0,0,.5);
      top: 0;
      left: 0;
      .labelContent{
        width: 90vw;
        height: 74.9625vh;
        background: #fff;
        border-radius: 10px;
        position: absolute;
        left: 4.666vw;
        bottom: 13.4178vh;
        p{
          height: 7.496vh;
          width: 100%;
          background: #65d172;
          color: #fff;
          font-size: 2.6986rem;
          font-weight: bold;
          text-align: center;
          line-height: 7.496vh;
          border-radius: 10px 10px 0 0;
        }
        .labelList{
          height: 66vh;
          overflow: auto;
          padding: 1.5vh 0;
          ul{
            li{
              margin: 0 4vw;
              padding: 0 1.333vw;
              font-size: 2.3988rem;
              color: #373737;
              border-bottom: 1px solid #e5e5e5;
              height: 7.4962vh;
              line-height: 7.4962vh;
            }
          }
        }
      }
      .closeBtn{
        width: 79.2vw;
        height: 10.4198vh;
        background: url("../../static/images/button_bg.png") no-repeat center center;
        background-size: cover;
        text-align: center;
        font-size: 2.2488rem;
        color: #fff;
        line-height: 8.4198vh;
        position: absolute;
        bottom: 0;
        left: 10.4vw;
        transition: all 0.15s linear;
        &:active{
          opacity: 0.9;
          transform: scale(0.98);
        }
      }
    }
  }
</style>
