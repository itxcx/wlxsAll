<template>
    <div class="CheckExhibing">
      <header>
        <div class="pageTitle">
          <span><</span>
          <span>入库核验</span>
        </div>
        <div class="location">
          <span></span>
          <span v-html="location">{{location}}</span>
        </div>
      </header>
      <section class="checkContent">
        <ul class="headerList">
          <li>序号</li>
          <li>名称</li>
          <li>单价</li>
          <li>数量</li>
          <li>总价</li>
        </ul>
        <ul class="checkItemList">
          <li v-for="(item, index) in itemList">
            <span>{{index + 1}}</span>
            <span>{{item.name}}</span>
            <span>{{item.amount}}</span>
            <span>{{item.countNum}}</span>
            <span>{{item.amount * item.countNum}}</span>
          </li>
        </ul>
        <p class="dispatch_modal">
          <span>配送方式:</span>
          <span>商家配送</span>
        </p>
        <p class="dispatch_time">
          <span>配送时间:</span>
          <span>2018-5-14 20:55</span>
        </p>
      </section>
    </div>
</template>

<script>
    export default {
        name: "check-exhibing",
        data() {
            return {
              location: '西安市高新区锦业路瞪羚谷E座1F',
              itemList: [
                {
                  name: '乐虎',
                  countNum: 20,
                  amount: 100
                },
                {
                  name: '果汁',
                  countNum: 20,
                  amount: 100
                },
                {
                  name: '孤独',
                  countNum: 20,
                  amount: 100
                },
                {
                  name: '啤酒',
                  countNum: 20,
                  amount: 100
                }
              ]
            }
        },
        mounted() {
          this.$nextTick(() => {
            let location = localStorage.getItem('device_address');
            if(location) {
              this.location = localStorage.getItem('device_address');
            }
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
    .checkContent{
      .headerList{
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        li{
          width: 22%;
          float: left;
          text-align: center;
          font-size: 2.2488rem;
          color: #7b7b7b;
          padding: 1.499vh 0;
          &:nth-of-type(1) {
            width: 11%;
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
            &:nth-of-type(1) {
              width: 10%;
            }
            &:nth-of-type(1), &:nth-of-type(2) {
              font-weight: bold;
            }
          }
          &:nth-of-type(even) {
            background: #f7f7f7;
          }
        }
      }
      .dispatch_modal, .dispatch_time{
        font-size: 2.2448rem;
        overflow: hidden;
        margin: 0 2.4vw;
        border-bottom: 1px solid #e5e5e5;
        border-top: 1px solid #e5e5e5;
        padding: 2.2488vh 0;
        span{
          display: inline-block;
          &:nth-of-type(1) {
            float:left;
            font-weight: bold;
          }
          &:nth-of-type(2) {
            float: right;
            color: #999898;
            margin-right: 3.33vw;
          }
        }
      }
    }
  }
</style>
