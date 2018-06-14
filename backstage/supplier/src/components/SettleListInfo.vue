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
      <section class="settleContent">
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
    </div>
</template>

<script>
    export default {
        name: "SettleListInfo",
        data() {
            return {
              settleListArray: [],
              count: {}
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
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/checkoutbyday?date1=${date1}&date2=${date2}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.settleListArray = res.data.data;

                // this.settleListArray =  [
                //   {
                //   "date": "2018-06-01",
                //   "goods": [{
                //     "goods_name": "谷粒多早餐奶",
                //     "price": "3.22",
                //     "count": 2,
                //     "clsoe_total": "6.44",
                //     "deal_total": "6.44",
                //     "profit": 0,
                //     "date": "2018-06-01"
                //   }]
                // }, {
                //   "date": "2018-06-02",
                //   "goods": [{
                //     "goods_name": "果2代",
                //     "price": "8.00",
                //     "count": 1,
                //     "clsoe_total": "8.00",
                //     "deal_total": "8.00",
                //     "profit": 0,
                //     "date": "2018-06-02"
                //   }, {
                //     "goods_name": "王老吉黑凉茶",
                //     "price": "4.66",
                //     "count": 1,
                //     "clsoe_total": "4.66",
                //     "deal_total": "4.66",
                //     "profit": 0,
                //     "date": "2018-06-02"
                //   }]
                // }, {
                //   "date": "2018-06-03",
                //   "goods": [{
                //     "goods_name": "芙列浓巧克力",
                //     "price": "8.99",
                //     "count": 1,
                //     "clsoe_total": "8.99",
                //     "deal_total": "8.99",
                //     "profit": 0,
                //     "date": "2018-06-03"
                //   }, {
                //     "goods_name": "姚太太精品梅子",
                //     "price": "9.90",
                //     "count": 1,
                //     "clsoe_total": "9.90",
                //     "deal_total": "9.90",
                //     "profit": 0,
                //     "date": "2018-06-03"
                //   }, {
                //     "goods_name": "新希望香蕉芒果牛奶",
                //     "price": "3.22",
                //     "count": 3,
                //     "clsoe_total": "9.66",
                //     "deal_total": "9.66",
                //     "profit": 0,
                //     "date": "2018-06-03"
                //   }]
                // }, {
                //   "date": "2018-06-04",
                //   "goods": [{
                //     "goods_name": "果2代",
                //     "price": "8.00",
                //     "count": 1,
                //     "clsoe_total": "4.88",
                //     "deal_total": "4.88",
                //     "profit": 0,
                //     "date": "2018-06-04"
                //   }, {
                //     "goods_name": "似水柔情自煮懒人火锅",
                //     "price": "19.88",
                //     "count": 1,
                //     "clsoe_total": "0.10",
                //     "deal_total": "0.10",
                //     "profit": 0,
                //     "date": "2018-06-04"
                //   }, {
                //     "goods_name": "农夫山泉NFC果汁",
                //     "price": "7.88",
                //     "count": 3,
                //     "clsoe_total": "14.64",
                //     "deal_total": "14.64",
                //     "profit": 0,
                //     "date": "2018-06-04"
                //   }, {
                //     "goods_name": "雀巢咖啡",
                //     "price": "5.49",
                //     "count": 7,
                //     "clsoe_total": "27.45",
                //     "deal_total": "27.45",
                //     "profit": 0,
                //     "date": "2018-06-04"
                //   }, {
                //     "goods_name": "王老吉黑凉茶",
                //     "price": "4.66",
                //     "count": 1,
                //     "clsoe_total": "2.88",
                //     "deal_total": "2.88",
                //     "profit": 0,
                //     "date": "2018-06-04"
                //   }, {
                //     "goods_name": "农夫山泉矿泉水",
                //     "price": "2.00",
                //     "count": 7,
                //     "clsoe_total": "14.00",
                //     "deal_total": "14.00",
                //     "profit": 0,
                //     "date": "2018-06-04"
                //   }]
                // }, {
                //   "date": "2018-06-05",
                //   "goods": [{
                //     "goods_name": "农夫山泉NFC果汁",
                //     "price": "7.88",
                //     "count": 9,
                //     "clsoe_total": "46.92",
                //     "deal_total": "46.92",
                //     "profit": 0,
                //     "date": "2018-06-05"
                //   }, {
                //     "goods_name": "雀巢咖啡",
                //     "price": "5.49",
                //     "count": 10,
                //     "clsoe_total": "42.09",
                //     "deal_total": "42.09",
                //     "profit": 0,
                //     "date": "2018-06-05"
                //   }, {
                //     "goods_name": "王老吉黑凉茶",
                //     "price": "4.66",
                //     "count": 2,
                //     "clsoe_total": "5.76",
                //     "deal_total": "5.76",
                //     "profit": 0,
                //     "date": "2018-06-05"
                //   }, {
                //     "goods_name": "似水柔情火锅",
                //     "price": "17.99",
                //     "count": 1,
                //     "clsoe_total": "17.99",
                //     "deal_total": "17.99",
                //     "profit": 0,
                //     "date": "2018-06-05"
                //   }, {
                //     "goods_name": "测试单品",
                //     "price": "0.10",
                //     "count": 46,
                //     "clsoe_total": "4.60",
                //     "deal_total": "4.60",
                //     "profit": 0,
                //     "date": "2018-06-05"
                //   }]
                // }, {
                //   "date": "2018-06-06",
                //   "goods": [{
                //     "goods_name": "果2代",
                //     "price": "8.00",
                //     "count": 4,
                //     "clsoe_total": "32.00",
                //     "deal_total": "32.00",
                //     "profit": 0,
                //     "date": "2018-06-06"
                //   }, {
                //     "goods_name": "农夫山泉NFC果汁",
                //     "price": "7.88",
                //     "count": 2,
                //     "clsoe_total": "9.76",
                //     "deal_total": "9.76",
                //     "profit": 0,
                //     "date": "2018-06-06"
                //   }, {
                //     "goods_name": "雀巢咖啡",
                //     "price": "5.49",
                //     "count": 5,
                //     "clsoe_total": "18.30",
                //     "deal_total": "18.30",
                //     "profit": 0,
                //     "date": "2018-06-06"
                //   }, {
                //     "goods_name": "谷粒多早餐奶",
                //     "price": "3.22",
                //     "count": 1,
                //     "clsoe_total": "3.22",
                //     "deal_total": "3.22",
                //     "profit": 0,
                //     "date": "2018-06-06"
                //   }, {
                //     "goods_name": "王老吉黑凉茶",
                //     "price": "4.66",
                //     "count": 1,
                //     "clsoe_total": "2.88",
                //     "deal_total": "2.88",
                //     "profit": 0,
                //     "date": "2018-06-06"
                //   }, {
                //     "goods_name": "摆渡经口葡萄糖水",
                //     "price": "9.88",
                //     "count": 3,
                //     "clsoe_total": "14.97",
                //     "deal_total": "14.97",
                //     "profit": 0,
                //     "date": "2018-06-06"
                //   }, {
                //     "goods_name": "测试单品",
                //     "price": "0.10",
                //     "count": 81,
                //     "clsoe_total": "8.10",
                //     "deal_total": "8.10",
                //     "profit": 0,
                //     "date": "2018-06-06"
                //   }]
                // }, {
                //   "date": "2018-06-07",
                //   "goods": [{
                //     "goods_name": "果2代",
                //     "price": "8.00",
                //     "count": 2,
                //     "clsoe_total": "16.00",
                //     "deal_total": "16.00",
                //     "profit": 0,
                //     "date": "2018-06-07"
                //   }, {
                //     "goods_name": "阿宽四川红油面皮",
                //     "price": "5.30",
                //     "count": 1,
                //     "clsoe_total": "5.30",
                //     "deal_total": "5.30",
                //     "profit": 0,
                //     "date": "2018-06-07"
                //   }, {
                //     "goods_name": "似水柔情自煮懒人火锅",
                //     "price": "19.88",
                //     "count": 1,
                //     "clsoe_total": "0.10",
                //     "deal_total": "0.10",
                //     "profit": 0,
                //     "date": "2018-06-07"
                //   }, {
                //     "goods_name": "农夫山泉NFC果汁",
                //     "price": "7.88",
                //     "count": 1,
                //     "clsoe_total": "7.88",
                //     "deal_total": "7.88",
                //     "profit": 0,
                //     "date": "2018-06-07"
                //   }, {
                //     "goods_name": "王老吉黑凉茶",
                //     "price": "4.66",
                //     "count": 1,
                //     "clsoe_total": "2.88",
                //     "deal_total": "2.88",
                //     "profit": 0,
                //     "date": "2018-06-07"
                //   }, {
                //     "goods_name": "似水柔情火锅",
                //     "price": "17.99",
                //     "count": 1,
                //     "clsoe_total": "17.99",
                //     "deal_total": "17.99",
                //     "profit": 0,
                //     "date": "2018-06-07"
                //   }, {
                //     "goods_name": "摆渡经口葡萄糖水",
                //     "price": "9.88",
                //     "count": 4,
                //     "clsoe_total": "0.40",
                //     "deal_total": "0.40",
                //     "profit": 0,
                //     "date": "2018-06-07"
                //   }, {
                //     "goods_name": "测试单品",
                //     "price": "0.10",
                //     "count": 61,
                //     "clsoe_total": "6.10",
                //     "deal_total": "6.10",
                //     "profit": 0,
                //     "date": "2018-06-07"
                //   }]
                // }, {
                //   "date": "2018-06-08",
                //   "goods": [{
                //     "goods_name": "似水柔情自煮懒人火锅",
                //     "price": "19.88",
                //     "count": 2,
                //     "clsoe_total": "-3.58",
                //     "deal_total": "-3.58",
                //     "profit": 0,
                //     "date": "2018-06-08"
                //   }, {
                //     "goods_name": "农夫山泉NFC果汁",
                //     "price": "7.88",
                //     "count": 1,
                //     "clsoe_total": "7.88",
                //     "deal_total": "7.88",
                //     "profit": 0,
                //     "date": "2018-06-08"
                //   }, {
                //     "goods_name": "雀巢咖啡",
                //     "price": "5.49",
                //     "count": 4,
                //     "clsoe_total": "16.47",
                //     "deal_total": "16.47",
                //     "profit": 0,
                //     "date": "2018-06-08"
                //   }, {
                //     "goods_name": "王老吉黑凉茶",
                //     "price": "4.66",
                //     "count": 3,
                //     "clsoe_total": "12.20",
                //     "deal_total": "12.20",
                //     "profit": 0,
                //     "date": "2018-06-08"
                //   }, {
                //     "goods_name": "摆渡经口葡萄糖水",
                //     "price": "9.88",
                //     "count": 2,
                //     "clsoe_total": "9.98",
                //     "deal_total": "9.98",
                //     "profit": 0,
                //     "date": "2018-06-08"
                //   }, {
                //     "goods_name": "测试单品",
                //     "price": "0.10",
                //     "count": 88,
                //     "clsoe_total": "8.80",
                //     "deal_total": "8.80",
                //     "profit": 0,
                //     "date": "2018-06-08"
                //   }]
                // }, {
                //   "date": "2018-06-09",
                //   "goods": [{
                //     "goods_name": "谷粒多早餐奶",
                //     "price": "3.22",
                //     "count": 1,
                //     "clsoe_total": "3.22",
                //     "deal_total": "3.22",
                //     "profit": 0,
                //     "date": "2018-06-09"
                //   }]
                // }, {
                //   "date": "2018-06-10",
                //   "goods": [{
                //     "goods_name": "果2代",
                //     "price": "8.00",
                //     "count": 1,
                //     "clsoe_total": "8.00",
                //     "deal_total": "8.00",
                //     "profit": 0,
                //     "date": "2018-06-10"
                //   }, {
                //     "goods_name": "雀巢咖啡",
                //     "price": "5.49",
                //     "count": 1,
                //     "clsoe_total": "3.66",
                //     "deal_total": "3.66",
                //     "profit": 0,
                //     "date": "2018-06-10"
                //   }]
                // }, {
                //   "date": "2018-06-11",
                //   "goods": [{
                //     "goods_name": "果2代",
                //     "price": "8.00",
                //     "count": 3,
                //     "clsoe_total": "20.88",
                //     "deal_total": "20.88",
                //     "profit": 0,
                //     "date": "2018-06-11"
                //   }, {
                //     "goods_name": "似水柔情自煮懒人火锅",
                //     "price": "19.88",
                //     "count": 1,
                //     "clsoe_total": "-1.79",
                //     "deal_total": "-1.79",
                //     "profit": 0,
                //     "date": "2018-06-11"
                //   }, {
                //     "goods_name": "谷粒多早餐奶",
                //     "price": "3.22",
                //     "count": 1,
                //     "clsoe_total": "3.22",
                //     "deal_total": "3.22",
                //     "profit": 0,
                //     "date": "2018-06-11"
                //   }, {
                //     "goods_name": "摆渡经口葡萄糖水",
                //     "price": "9.88",
                //     "count": 2,
                //     "clsoe_total": "9.98",
                //     "deal_total": "9.98",
                //     "profit": 0,
                //     "date": "2018-06-11"
                //   }, {
                //     "goods_name": "兵兵有礼冰箱贴",
                //     "price": "25.00",
                //     "count": 1,
                //     "clsoe_total": "25.00",
                //     "deal_total": "25.00",
                //     "profit": 0,
                //     "date": "2018-06-11"
                //   }, {
                //     "goods_name": "测试单品",
                //     "price": "0.10",
                //     "count": 24,
                //     "clsoe_total": "2.40",
                //     "deal_total": "2.40",
                //     "profit": 0,
                //     "date": "2018-06-11"
                //   }]
                // }, {
                //   "date": "2018-06-12",
                //   "goods": [{
                //     "goods_name": "果2代",
                //     "price": "8.00",
                //     "count": 3,
                //     "clsoe_total": "20.88",
                //     "deal_total": "20.88",
                //     "profit": 0,
                //     "date": "2018-06-12"
                //   }, {
                //     "goods_name": "阿宽四川红油面皮",
                //     "price": "5.30",
                //     "count": 2,
                //     "clsoe_total": "10.60",
                //     "deal_total": "10.60",
                //     "profit": 0,
                //     "date": "2018-06-12"
                //   }, {
                //     "goods_name": "似水柔情自煮懒人火锅",
                //     "price": "19.88",
                //     "count": 2,
                //     "clsoe_total": "-10.69",
                //     "deal_total": "-10.69",
                //     "profit": 0,
                //     "date": "2018-06-12"
                //   }, {
                //     "goods_name": "农夫山泉NFC果汁",
                //     "price": "7.88",
                //     "count": 1,
                //     "clsoe_total": "4.88",
                //     "deal_total": "4.88",
                //     "profit": 0,
                //     "date": "2018-06-12"
                //   }, {
                //     "goods_name": "谷粒多早餐奶",
                //     "price": "3.22",
                //     "count": 1,
                //     "clsoe_total": "3.22",
                //     "deal_total": "3.22",
                //     "profit": 0,
                //     "date": "2018-06-12"
                //   }, {
                //     "goods_name": "王老吉黑凉茶",
                //     "price": "4.66",
                //     "count": 3,
                //     "clsoe_total": "12.20",
                //     "deal_total": "12.20",
                //     "profit": 0,
                //     "date": "2018-06-12"
                //   }, {
                //     "goods_name": "新希望香蕉芒果牛奶",
                //     "price": "3.22",
                //     "count": 1,
                //     "clsoe_total": "3.22",
                //     "deal_total": "3.22",
                //     "profit": 0,
                //     "date": "2018-06-12"
                //   }, {
                //     "goods_name": "摆渡经口葡萄糖水",
                //     "price": "9.88",
                //     "count": 2,
                //     "clsoe_total": "9.98",
                //     "deal_total": "9.98",
                //     "profit": 0,
                //     "date": "2018-06-12"
                //   }, {
                //     "goods_name": "测试单品",
                //     "price": "0.10",
                //     "count": 129,
                //     "clsoe_total": "12.90",
                //     "deal_total": "12.90",
                //     "profit": 0,
                //     "date": "2018-06-12"
                //   }]
                // }, {
                //   "date": "2018-06-13",
                //   "goods": [{
                //     "goods_name": "果2代",
                //     "price": "8.00",
                //     "count": 3,
                //     "clsoe_total": "24.00",
                //     "deal_total": "24.00",
                //     "profit": 0,
                //     "date": "2018-06-13"
                //   }, {
                //     "goods_name": "雀巢咖啡",
                //     "price": "5.49",
                //     "count": 1,
                //     "clsoe_total": "3.66",
                //     "deal_total": "3.66",
                //     "profit": 0,
                //     "date": "2018-06-13"
                //   }, {
                //     "goods_name": "王老吉黑凉茶",
                //     "price": "4.66",
                //     "count": 2,
                //     "clsoe_total": "7.54",
                //     "deal_total": "7.54",
                //     "profit": 0,
                //     "date": "2018-06-13"
                //   }, {
                //     "goods_name": "测试单品",
                //     "price": "0.10",
                //     "count": 9,
                //     "clsoe_total": "0.90",
                //     "deal_total": "0.90",
                //     "profit": 0,
                //     "date": "2018-06-13"
                //   }]
                // }]

              }else if(res.data.code == 3) {
                this
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
    padding-top: 20vh;
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
      height: 93vh;
      overflow-y: auto;
      -webkit-overflow-scrolling : touch;
      .settleHeader{
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        background: #fff;
        position: fixed;
        top: 6vh;
        z-index: 999;
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
        z-index: 999;
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
