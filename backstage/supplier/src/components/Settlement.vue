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
        <ul class="settleItem">
          <li v-for="(item, index) in settlementData">
            <p>{{Year}}.{{item.month}}</p>
            <ul class="settleHeader">
              <li>商品名称</li>
              <li>商品标价</li>
              <li>交易数量</li>
              <li>交易金额</li>
              <li>抽成金额</li>
              <li>结算金额</li>
            </ul>
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
      </section>
    </div>
</template>

<script>
    export default {
        name: "Settlement",
        data() {
            return {
              settlementData: [],
              Year: ''
            }
        },
        mounted() {
          this.$nextTick(() => {
            document.title = 'ceshi';
            this.getSettlementData(0);
            this.Year = new Date().getFullYear();
          })
        },
        methods: {
          //返回按钮
          goBack() {
            this.$router.push({
              path: '/personal'
            })
          },
          //获取数据方法
          getSettlementData(page) {
            // this.$ajax({
            //   url: `http://merchant.test.weilaixiansen.com/login/checkoutbymonth?page=${page}`,
            //   method: 'GET'
            // }).then((res) => {
            //     if(res.data.code == 0) {
            //       this.settlementData = res.data.data;
            this.settlementData =   [
              {
              "goods": [{
                "goods_name": "果2代",
                "price": "8.00",
                "count": 15,
                "deal_total": "110.64",
                "close_total": "110.64",
                "profit": 0
              }, {
                "goods_name": "芙列浓巧克力",
                "price": "8.99",
                "count": 1,
                "deal_total": "8.99",
                "close_total": "8.99",
                "profit": 0
              }, {
                "goods_name": "阿宽四川红油面皮",
                "price": "5.30",
                "count": 3,
                "deal_total": "15.90",
                "close_total": "15.90",
                "profit": 0
              }, {
                "goods_name": "似水柔情自煮懒人火锅",
                "price": "19.88",
                "count": 9,
                "deal_total": "-15.66",
                "close_total": "-15.66",
                "profit": 0
              }, {
                "goods_name": "农夫山泉NFC果汁",
                "price": "7.88",
                "count": 17,
                "deal_total": "91.96",
                "close_total": "91.96",
                "profit": 0
              }, {
                "goods_name": "雀巢咖啡",
                "price": "5.49",
                "count": 28,
                "deal_total": "111.63",
                "close_total": "111.63",
                "profit": 0
              }, {
                "goods_name": "姚太太精品梅子",
                "price": "9.90",
                "count": 1,
                "deal_total": "9.90",
                "close_total": "9.90",
                "profit": 0
              }, {
                "goods_name": "谷粒多早餐奶",
                "price": "3.22",
                "count": 6,
                "deal_total": "19.32",
                "close_total": "19.32",
                "profit": 0
              }, {
                "goods_name": "王老吉黑凉茶",
                "price": "4.66",
                "count": 13,
                "deal_total": "48.12",
                "close_total": "48.12",
                "profit": 0
              }, {
                "goods_name": "新希望香蕉芒果牛奶",
                "price": "3.22",
                "count": 4,
                "deal_total": "12.88",
                "close_total": "12.88",
                "profit": 0
              }, {
                "goods_name": "似水柔情火锅",
                "price": "17.99",
                "count": 2,
                "deal_total": "35.98",
                "close_total": "35.98",
                "profit": 0
              }, {
                "goods_name": "摆渡经口葡萄糖水",
                "price": "9.88",
                "count": 13,
                "deal_total": "45.31",
                "close_total": "45.31",
                "profit": 0
              }, {
                "goods_name": "农夫山泉矿泉水",
                "price": "2.00",
                "count": 7,
                "deal_total": "14.00",
                "close_total": "14.00",
                "profit": 0
              }, {
                "goods_name": "兵兵有礼冰箱贴",
                "price": "25.00",
                "count": 1,
                "deal_total": "25.00",
                "close_total": "25.00",
                "profit": 0
              }, {
                "goods_name": "测试单品",
                "price": "0.10",
                "count": 394,
                "deal_total": "39.40",
                "close_total": "39.40",
                "profit": 0
              }],
              "month": "6",
              "begin": "2018-06-01 00:00:00",
              "end": "2018-06-13 10:35:02"
            }, {
              "goods": [{
                "goods_name": "香橙蛋糕",
                "price": "13.80",
                "count": 17,
                "deal_total": "186.93",
                "close_total": "186.93",
                "profit": 0
              }, {
                "goods_name": "乐虎(每日两罐3.88)",
                "price": "4.99",
                "count": 76,
                "deal_total": "-216.44",
                "close_total": "-216.44",
                "profit": 0
              }, {
                "goods_name": "果2代",
                "price": "8.00",
                "count": 74,
                "deal_total": "592.00",
                "close_total": "592.00",
                "profit": 0
              }, {
                "goods_name": "好吃点甄好曲奇",
                "price": "3.88",
                "count": 8,
                "deal_total": "31.04",
                "close_total": "31.04",
                "profit": 0
              }, {
                "goods_name": "进口梅子百事可乐",
                "price": "9.88",
                "count": 5,
                "deal_total": "49.40",
                "close_total": "49.40",
                "profit": 0
              }, {
                "goods_name": "麦吉士蛋糕",
                "price": "4.99",
                "count": 6,
                "deal_total": "29.94",
                "close_total": "29.94",
                "profit": 0
              }, {
                "goods_name": "大龍燚自煮懒人火锅",
                "price": "19.88",
                "count": 8,
                "deal_total": "139.04",
                "close_total": "139.04",
                "profit": 0
              }, {
                "goods_name": "似水柔情自煮懒人火锅",
                "price": "19.88",
                "count": 14,
                "deal_total": "1.40",
                "close_total": "1.40",
                "profit": 0
              }, {
                "goods_name": "农夫山泉NFC果汁",
                "price": "7.88",
                "count": 7,
                "deal_total": "55.16",
                "close_total": "55.16",
                "profit": 0
              }, {
                "goods_name": "雀巢咖啡",
                "price": "5.49",
                "count": 19,
                "deal_total": "104.31",
                "close_total": "104.31",
                "profit": 0
              }, {
                "goods_name": "BK黄金曲奇",
                "price": "13.00",
                "count": 1,
                "deal_total": "13.00",
                "close_total": "13.00",
                "profit": 0
              }, {
                "goods_name": "德芙白巧克力",
                "price": "13.88",
                "count": 1,
                "deal_total": "13.88",
                "close_total": "13.88",
                "profit": 0
              }, {
                "goods_name": "Q弹布丁",
                "price": "4.66",
                "count": 4,
                "deal_total": "9.52",
                "close_total": "9.52",
                "profit": 0
              }, {
                "goods_name": "闲趣芝士酥心卷",
                "price": "4.66",
                "count": 1,
                "deal_total": "0.10",
                "close_total": "0.10",
                "profit": 0
              }, {
                "goods_name": "闲趣芝士酥心棒",
                "price": "5.66",
                "count": 1,
                "deal_total": "0.10",
                "close_total": "0.10",
                "profit": 0
              }, {
                "goods_name": "低卡代餐汤饭",
                "price": "4.99",
                "count": 1,
                "deal_total": "0.10",
                "close_total": "0.10",
                "profit": 0
              }, {
                "goods_name": "谷粒多早餐奶",
                "price": "3.22",
                "count": 13,
                "deal_total": "41.86",
                "close_total": "41.86",
                "profit": 0
              }, {
                "goods_name": "王老吉黑凉茶",
                "price": "4.66",
                "count": 20,
                "deal_total": "93.20",
                "close_total": "93.20",
                "profit": 0
              }, {
                "goods_name": "新希望香蕉芒果牛奶",
                "price": "3.22",
                "count": 10,
                "deal_total": "32.20",
                "close_total": "32.20",
                "profit": 0
              }, {
                "goods_name": "悦活U格",
                "price": "3.88",
                "count": 15,
                "deal_total": "58.20",
                "close_total": "58.20",
                "profit": 0
              }, {
                "goods_name": "似水柔情火锅",
                "price": "17.99",
                "count": 14,
                "deal_total": "215.42",
                "close_total": "215.42",
                "profit": 0
              }, {
                "goods_name": "农家小炒肉盖饭",
                "price": "16.00",
                "count": 3,
                "deal_total": "48.00",
                "close_total": "48.00",
                "profit": 0
              }, {
                "goods_name": "玲珑香梨",
                "price": "5.90",
                "count": 26,
                "deal_total": "59.56",
                "close_total": "59.56",
                "profit": 0
              }, {
                "goods_name": "玲珑白心火龙果",
                "price": "5.90",
                "count": 53,
                "deal_total": "152.39",
                "close_total": "152.39",
                "profit": 0
              }, {
                "goods_name": "玲珑红心火龙果",
                "price": "6.90",
                "count": 13,
                "deal_total": "30.78",
                "close_total": "30.78",
                "profit": 0
              }, {
                "goods_name": "玲珑碧娇粉圣女果",
                "price": "6.90",
                "count": 4,
                "deal_total": "12.87",
                "close_total": "12.87",
                "profit": 0
              }, {
                "goods_name": "玲珑沃柑",
                "price": "9.80",
                "count": 54,
                "deal_total": "236.37",
                "close_total": "236.37",
                "profit": 0
              }, {
                "goods_name": "玲珑小黄瓜",
                "price": "4.90",
                "count": 35,
                "deal_total": "107.48",
                "close_total": "107.48",
                "profit": 0
              }, {
                "goods_name": "牛轧奶芙",
                "price": "18.80",
                "count": 1,
                "deal_total": "18.80",
                "close_total": "18.80",
                "profit": 0
              }, {
                "goods_name": "玲珑洛川红富士",
                "price": "5.90",
                "count": 13,
                "deal_total": "53.24",
                "close_total": "53.24",
                "profit": 0
              }, {
                "goods_name": "农夫山泉矿泉水",
                "price": "2.00",
                "count": 62,
                "deal_total": "124.00",
                "close_total": "124.00",
                "profit": 0
              }, {
                "goods_name": "活动商品",
                "price": "0.10",
                "count": 37,
                "deal_total": "3.70",
                "close_total": "3.70",
                "profit": 0
              }, {
                "goods_name": "伊利每益添赠饮",
                "price": "1.00",
                "count": 56,
                "deal_total": "14.00",
                "close_total": "14.00",
                "profit": 0
              }, {
                "goods_name": "兵兵有礼公仔",
                "price": "25.00",
                "count": 29,
                "deal_total": "725.00",
                "close_total": "725.00",
                "profit": 0
              }, {
                "goods_name": "兵兵有礼玉米杯",
                "price": "46.00",
                "count": 10,
                "deal_total": "460.00",
                "close_total": "460.00",
                "profit": 0
              }, {
                "goods_name": "大唐丰韵",
                "price": "50.00",
                "count": 11,
                "deal_total": "550.00",
                "close_total": "550.00",
                "profit": 0
              }, {
                "goods_name": "兵兵有礼果冻杯",
                "price": "22.00",
                "count": 7,
                "deal_total": "154.00",
                "close_total": "154.00",
                "profit": 0
              }, {
                "goods_name": "兵兵有礼陕西美食本",
                "price": "15.00",
                "count": 20,
                "deal_total": "300.00",
                "close_total": "300.00",
                "profit": 0
              }],
              "month": "5",
              "begin": "2018-05-01 00:00:00",
              "end": "2018-05-31 23:59:59"
            }]
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
            //     }else if(res.data.code == 3) {
            //       this.$router.push({
            //         path: '/'
            //       })
            //     }
            // }).catch((error) => {
            //   console.log(error);
            // })
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
  .Settlement{
    background: #f1f1f1;
    padding-top: 7vh;
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
      .settleItem{
        >li{
          margin-bottom: 20px;
          background: #fff;
          p{
            font-size: 1.949rem;
            color: #7b7b7b;
            padding: 1.649vh 4vw;
            border-bottom: 1px solid #e5e5e5;
          }
          .settleHeader{
            border-bottom: 1px solid #e5e5e5;
            overflow: hidden;
            li{
              float: left;
              width: 16.666vw;
              text-align: center;
              font-size: 1.949rem;
              color: #7b7b7b;
              padding: 1.499vh 4vw;
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
  }
</style>
