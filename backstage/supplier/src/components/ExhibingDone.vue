<template>
  <div class="CheckExhibing">
    <header>
      <div class="pageTitle">
        <span><</span>
        <span>上货完成</span>
      </div>
      <div class="location">
        <span></span>
        <span v-html="location">{{location}}</span>
      </div>
    </header>
    <section class="exhibInfo">
      <h3>本次上架商品
        <span>{{itemList.total_count}}</span>个
      </h3>
      <p>
        <span></span>
        <span>已实际上货数量为标准，问题商品请开柜带走</span>
      </p>
    </section>
    <section class="checkContent">
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
          <span>查看</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: "check-exhibing",
    data() {
      return {
        location: '', //设备地址
        itemList: {
          "goods": [{
            "goods_name": "清谷田园",
            "goods_count": 1,
            "tags": ["AAAC8741"]
          },
            {
              "goods_name": "清谷田园2",
              "goods_count": 13,
              "tags": ["AAAC8741"]
            }
          ],
          "sale_goods": [{
            "goods_name": "伊利每益添原味",
            "goods_count": 1,
            "goods_price": "6.50",
            "tags": ["AAAC2273"]
          }],
          "total_count": 14
        }, //商品列表
      }
    },
    /* {
            "goods": [{
            "goods_name": "清谷田园",
            "goods_count": 1,
            "tags": ["AAAC8741"]
          }],
            "sale_goods": [{
            "goods_name": "伊利每益添原味",
            "goods_count": 1,
            "goods_price": "6.50",
            "tags": ["AAAC2273"]
          }],
            "total_count": 1
          }*/
    mounted() {
      this.$nextTick(() => {
        //this.itemList = localStorage.getItem('exhibData');
        this.location = localStorage.getItem('device_address');
        console.log(this.location);

      })
    },
    methods: {
    }
  }
</script>

<style lang="less">
  .CheckExhibing{
    width: 100vw;
    header{
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
        span:nth-of-type(1) {
          display: inline-block;
          width: 3.8666vw;
          height: 2.923vh;
          background: url("../../static/images/image_tips.png") no-repeat center center;
          background-size: cover;
          vertical-align: bottom;
        }
        span:nth-of-type(2) {
          display: inline-block;
          margin-left: 5px;
          height: 2.923vh;
          font-size: 2.0989vh;
          color: rgba(36,35,35,.93);
        }
      }
    }
    .checkContent{
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
  }
</style>
