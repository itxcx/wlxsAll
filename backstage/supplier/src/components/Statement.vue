<template>
    <div class="statement">
      <!--<section class="headerTitle">-->
        <!--<p>智能报表</p>-->
      <!--</section>-->

      <section class="getPageTime">
        数据更新时间: {{getPageTime}}
      </section>
      <section class="main">
        <scroller :on-refresh="infinite" ref="myscroller">
          <p class="getMore" v-show="isPull">{{ctrlTipTitle}}</p>
          <header @click="goSaleRoom">
            <p>今日销售额 (元)</p>
            <p class="saleroom">{{saleroom}}</p>
            <div class="totalCount">
              <dl>
                <dt>交易笔数(笔)</dt>
                <dd>{{volume}}</dd>
              </dl>
              <dl>
                <dt>售卖商品(个)</dt>
                <dd>{{numberCount}}</dd>
              </dl>
            </div>
          </header>
          <section class="statement_content">
            <!--今日货柜排行-->
            <div class="counter" @click="goDeviceRank">
              <h3>今日货柜排行</h3>
              <dl>
                <dt>{{counterAddr}}</dt>
                <dd>交易金额<span>{{countAmount}}</span>元</dd>
              </dl>
            </div>
            <!--今日商品排行-->
            <div class="goods" @click="goProductRank">
              <h3>今日商品排行</h3>
              <dl>
                <dt style="display: table-cell;">{{goodsTop}}</dt>
                <dd>售卖数量<span>{{goodsNum}}</span>个</dd>
              </dl>
            </div>
            <!--今日上货数量-->
            <div class="exhibit" @click="invenCtrl(0)">
              <h3>今日上货数量(个)</h3>
              <dl>
                <dt>{{exhibitNum}}</dt>
                <dd>智能售货柜<span>{{exhibitDevice}}</span>台</dd>
              </dl>
            </div>
            <!--今日下货数量-->
            <div class="ship" @click="invenCtrl(1)">
              <h3>今日下货数量(个)</h3>
              <dl>
                <dt>{{shipNum}}</dt>
                <dd>智能售货柜<span>{{shipDevice}}</span>台</dd>
              </dl>
            </div>
          </section>
        </scroller>
      </section>
      <Footer-bar></Footer-bar>
    </div>
</template>

<script>
  import FooterBar from './FooterBar';
  import vScroll from './Refresh'
    export default {
      name: "statement",
      data() {
          return {
            saleroom: '', //销售额
            volume: '', //交易笔数
            numberCount: '', //售卖商品个数
            counterAddr: '',//柜子地址
            countAmount: '',//柜子销售额
            goodsTop: '',//排行商品名称
            goodsNum: '',//商品销售数量
            exhibitNum: '',//上货数量统计
            exhibitDevice: '',//上货设备数量统计
            shipNum: '',//下货数量统计
            shipDevice: '',//下货设备数量统计
            getPageTime: '',
            ctrlTipTitle: '',
            isPull: false
          }
      },
      components: {
        FooterBar, vScroll
      },
      mounted() {
        this.$nextTick(() => {
          //获取时间
          let date = new Date();
          let startTime = this.Common.formatDate(date, "yyyy-MM-dd") + ' 00:00:00';
          let endTime = this.Common.formatDate(date, "yyyy-MM-dd hh:mm:ss");
          let pageTime = new Date().getHours();
          this.getPageTime = this.Common.formatDate(date, "yyyy-MM-dd") + ' ' + pageTime + ':00:00';
          this.getSaleroomData(startTime, endTime);
        })
      },
      methods: {
        infinite() {
          setTimeout(() => {
            this.$refs.myscroller.resize();
            let date = new Date();
            let startTime = this.Common.formatDate(date, "yyyy-MM-dd") + ' 00:00:00';
            let endTime = this.Common.formatDate(date, "yyyy-MM-dd hh:mm:ss");
            let pageTime = new Date().getHours();
            this.getPageTime = this.Common.formatDate(date, "yyyy-MM-dd") + ' ' + pageTime + ':00:00';
            this.getSaleroomData(startTime, endTime);
          }, 1000)
        },
        //当前时间销售额
        getSaleroomData(startTime, endTime) {
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/Merstats/m1?stime=${startTime}&etime=${endTime}`,
            method: 'GET'
          }).then((res) => {
            this.isPull = false;
            this.getDeviceBest(startTime, endTime);
             if(res.data.code == 0) {//返回数据成功
               let saleData = res.data.data;
                this.saleroom = saleData.total_money;
                this.volume = saleData.order_num;
                this.numberCount = saleData.goods_total;
             }else if(res.data.code == -1) {//没有数据
               this.saleroom = 0;
               this.volume = 0;
               this.numberCount = 0;
             }else if(res.data.code == 1) {//未登录
                this.$router.push({
                  path: '/'
                })
             }
          }).catch((error) => {
            console.log(error);
          })
        },
        //今日货柜排行
        getDeviceBest(startTime, endTime) {
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/Merstats/m2?stime=${startTime}&etime=${endTime}`,
            method: 'GET'
          }).then((res) => {
            this.getProductBest(startTime, endTime);
            if(res.data.code == 0) {
              this.counterAddr = res.data.data.device_address;
              this.countAmount = res.data.data.total_money;
            }else{
              this.counterAddr = '无';
              this.countAmount = 0;
            }
          }).catch((error) => {
            console.log(error);
          })
        },
        //今日商品排行
        getProductBest(startTime, endTime) {
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/Merstats/m3?stime=${startTime}&etime=${endTime}`,
            method: 'GET'
          }).then((res) => {
            this.getExhibingData(startTime, endTime);
            if(res.data.code == 0) {
              this.goodsTop = res.data.data.goods_name;
              this.goodsNum  = res.data.data.goods_num;
            }else{
              this.goodsTop = '无';
              this.goodsNum  = 0;
            }
          }).catch((error) => {
              console.log(error);
          })
        },
        //今日上货数量
        getExhibingData(startTime, endTime) {
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/Merstats/m3and4?stime=${startTime}&etime=${endTime}&is_unload=0`,
            method: 'GET'
          }).then((res) => {
            this.getShipData(startTime, endTime);
             if(res.data.code == 0) {
               this.exhibitNum = res.data.data.goods_count;
               this.exhibitDevice = res.data.data.device_num;
             }else{
               this.exhibitNum = 0;
               this.exhibitDevice = 0;
             }
          }).catch((error) => {
            console.log(error);
          })
        },
        //今日下货数量
        getShipData(startTime, endTime) {
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/Merstats/m3and4?stime=${startTime}&etime=${endTime}&is_unload=1`,
            method: 'GET'
          }).then((res) => {
            if(res.data.code == 0) {
              this.shipNum = res.data.data.goods_count;
              this.shipDevice = res.data.data.device_num;
            }else{
              this.shipNum = 0;
              this.shipDevice = 0;
            }
          }).catch((error) => {
            console.log(error);
          })
        },
        //销售报表
        goSaleRoom() {
          this.$router.push({
            path: '/saleRoom'
          })
        },
        //售货柜排行
        goDeviceRank() {
          this.$router.push({
            path: '/deviceRank'
          })
        },
        //商品排行
        goProductRank() {
          this.$router.push({
            path: '/productRank'
          })
        },
        //上下货记录
        invenCtrl(type) {
          this.$router.push({
            path: '/inventoryControl',
            query: {
              type: type
            }
          })
        }
      }
    }
</script>

<style lang="less">
  .statement{
    height: 100vh;
    background: #fff;
    .headerTitle{
      width: 100vw;
      background: #65d172;
      height: 5.997vh;
      font-size: 2.398rem;
      line-height: 5.997vh;
      text-align: center;
      color: #fff;
      font-weight: 500;
    }
    .getPageTime{
      width: 100vw;
      background: #65d172;
      height: 5.997vh;
      font-size: 2.098rem;
      line-height: 5.997vh;
      padding-left: 5vw;
      color: #fff;
      font-weight: 500;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
    }
    .main{
      overflow: auto;
      height: 85vh;
      .getMore{
        text-align: center;
        padding: 1vh 0;
        font-weight: bold;
        font-size: 1.924rem;
      }
      .loadmore-hint{
        color: #65d172;
        text-align: center;
        display: none;
      }
      header{
        font-family: "PingFang SC";
        width: 100%;
        height: 29.985vh;
        background: #4dbf5b;
        p:nth-of-type(1) {
          padding-top: 5.0975vh;
          font-size: 2.248rem;
          color: #ddfbe1;
          text-align: center;
        }
        p:nth-of-type(2) {
          font-size: 6.2218vh;
          color: #ffffff;
          text-align: center;
        }
        .totalCount{
          margin-top: 2.6235vh;
          height: 5.397vh;
          dl{
            width: 49.333vw;
            float: left;
            text-align: center;
            &:nth-last-of-type(1) {
              border-left: 2px solid #ffffff;
            }
            dt{
              font-size: 2.098rem;
              color: #ddfbe1;
            }
            dd{
              font-size: 3.1484rem;
              color: #ffffff;
              font-weight: bold;
            }
          }
        }
      }
      .statement_content{
        width: 88vw;
        margin: 4.6476vh 6vw;
        div{
          width: 44vw;
          height: 22.34vh;
          float: left;
          &:nth-of-type(1){
            border-right: 1px solid #ebebeb;
            border-bottom: 1px solid #ebebeb;
          }
          &:nth-of-type(2){
            border-bottom: 1px solid #ebebeb;
            padding: 0 0 6.666vw 6.666vw;
          }
          &:nth-of-type(3){
            border-right: 1px solid #ebebeb;
            padding: 6.666vw 6.666vw 0 0;
          }
          &:nth-of-type(4){

            padding: 6.666vw 0 0 6.666vw ;
          }
          h3{
            font-size: 2.248rem;
            color: #666666;
            font-weight: normal;
            margin-bottom: 3.33vw;
          }
          dl{
            margin-top: 3.33vw;
            dt{
              display: table-cell;
              height: 8.5vh;
              vertical-align: middle;
              font-size: 2.9982rem;
              line-height: 2.9982rem;
              color: #353a3e;
              font-weight: bold;
              padding-right: 2vw;
              /*overflow: hidden;*/
              /*text-overflow:ellipsis;*/
              /*white-space: nowrap;*/
            }
            dd{
              margin-top: 3.33vw;
              font-size: 1.949rem;
              color: #a1a1a1;
              span{
                color: #65d172;
              }
            }
          }
        }
      }
    }

  }
  ._v-container[data-v-ecaca2b0] {
    padding-top: 4vh;
  }
</style>
