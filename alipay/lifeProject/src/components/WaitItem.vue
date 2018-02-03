<template>
  <div class="WaitItem">
    <section class="waitHeader">
      <p>
        <span class="glyphicon glyphicon-time"></span>
      </p>
      <p>待取餐</p>
    </section>
    <section class="waitInfo">
      <ul>
        <li>
          <div class="waitTime">
            <span>取餐时间</span>
            <span>{{waitItem.takeTime}}</span>
          </div>
          <div class="waitAddress">
            <span>取餐地点</span>
            <span>{{waitAddress}}</span>
          </div>
          <div class="waitInfoList">
            <ul>
              <li v-for="goods in waitItem.list">
                <div :style="{backgroundImage: 'url('+ goods.imgPath +')'}"></div>
                <dl>
                  <dt>{{goods.reservaName}}</dt>
                  <dd>
                    <span>{{goods.reservaPrice | priceFormat}}</span>
                    <span>{{goods.purchasePrice | priceFormat}}</span>
                    <span>{{goods.reservaCount | numberFormat}}</span>
                  </dd>
                </dl>
              </li>
            </ul>
            <div class="goScan">
              <button class="btn btn-danger" @click="readyScan(goScan, i, j)">扫码取餐</button>
            </div>
          </div>
          <div class="totalPrice">
            <div class="discount">
              <span>优惠金额</span>
              <span>{{ waitItem.totalFare - waitItem.totalMoney}}</span>
            </div>
            <div class="amount">
              <span>实付金额</span>
              <span>{{waitItem.totalMoney}}</span>
            </div>
          </div>
          <div class="detailInfo">
            <div class="detailNumber">
              <span>订单编号</span>
              <span>{{waitItem.orderId}}</span>
            </div>
            <div class="detailNumber">
              <span>下单时间</span>
              <span>{{waitItem.currentTime}}</span>
            </div>
            <div class="detailType">
              <span>支付方式</span>
              <span>{{waitItem.payment}}</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <Footer-tab></Footer-tab>
  </div>
</template>
<script>
  import FooterTab from './FooterTab.vue'
  export default ({
    name: 'WaitItem',
    data() {
      return {
        waitItem: [],
        waitAddress: '',
        orderId: ''
      }
    },
    mounted (){
      this.$nextTick(() => {
        let row = this.$route.query.row;
        let col = this.$route.query.col;
        console.log(row+'----'+col);
        this.waitAddress = this.$store.state.WaitList[row].deviceId;
        console.log(this.$store.state.WaitList[row].itemsData[col]);
        this.waitItem = this.$store.state.WaitList[row].itemsData[col];
      })
    },
    components:{
      FooterTab
    },
    filters:{
      //金额
      priceFormat: function (value) {
        if(value.toString().split('.')[1] && value.toString().split('.')[1].length < 2){
          value = '￥' + value + '0';
        }else if(value.toString().split('.')[1] && value.toString().split('.')[1].length >= 2){
          value = '￥' + value.toString().split('.')[0] + '.' + value.toString().split('.')[1].substr(0, 2);
        }else{
          value = '￥' + value + '.00';
        }
        return value;
      },
      //数量
      numberFormat: function (value) {
        value = 'x' + value;
        return value;
      }
    },
    methods:{
      goWait(){
        this.$router.push('wait');
      },
      readyScan(callback, i, j) {
        this.orderId = this.$store.state.WaitList[i].itemsData[j].orderId;
        // 如果jsbridge已经注入则直接调用
        if (window.AlipayJSBridge) {
          callback && callback();
        } else {
          // 如果没有注入则监听注入的事件
          document.addEventListener('AlipayJSBridgeReady', callback, false);
        }
      },
      goScan(){
        AlipayJSBridge.call('scan', {
          type: 'qr',
          actionType: 'scanAndRoute'
        }, function (result) {
//          alert(JSON.stringify(result));
          //扫码成功后建立websocker连接，接收服务器的消息
          this.socketMes();
        });
      },
      socketMes(){
        let websocket = new WebSocket('');//地址
        websocket.onopen = function () {
          websocket.send();
        };
        websocket.onmessage = function (res) {
          let msg = res.message;
          //需要跳转路由还是需要显示页面
          this.$router.push({
            name: 'afterScan',
            query: {
              message: msg
            }
          })
        };
        websocket.onclose = function () {};
      }
    }
  })
</script>
<style lang="less">
  @headerHeight : 6vh;
  .WaitItem{
    background: #fff;
    padding: 0 0 11vh 0;
    header{
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      height: @headerHeight;
      line-height: @headerHeight;
      background: #fff;
      border-bottom: 1px solid #f2f2f2;
      span{
        position: absolute;
        left: 3vw;
        top: 1.5vh;
        font-size: 4vw;
        font-weight: normal;
      }
      p{
        text-align: center;
        font-size: 4vw;
      }
    }
    .waitHeader{
      background: #F63D3B;
      text-align: center;
      color: #fff;
      padding: 2vh 0;
      font-size: 4vw;
      p:nth-of-type(1){
        font-size: 7vw;
      }
    }
    .waitInfo{
      padding: 2vh 2vw;
      ul{
        list-style: none;
        li{
          font-size: 4vw;
          .waitTime{
            border-bottom: 1px solid #f2f2f2;
            padding: 0 0 2vh 0;
            span:nth-of-type(1){
              color: #939393;
              width: 30vw;
              display: inline-block;
            }
            span:nth-of-type(2){
              color: #F63D3B;
            }
          }
          .waitAddress{
            overflow: hidden;
            padding: 2vh 0;
            border-bottom: 1px solid #f2f2f2;
            span:nth-of-type(1){
              color: #939393;
              width: 30vw;
              display: inline-block;
              float: left;
            }
            span:nth-of-type(2){
              width: 60vw;
              float: left;
            }
          }
          .waitInfoList{
            ul{
              list-style: none;
              li{
                overflow: hidden;
                padding: 2vh 0;
                border-bottom: 1px solid #f2f2f2;
                div{
                  width: 25vw;
                  height: 25vw;
                  border-radius: 5px;
                  background-size: cover;
                  float: left;
                }
                dl{
                  width: 65vw;
                  float: right;
                  padding: 2vh 0;
                  dt{
                    font-size: 4vw;
                    font-weight: normal;
                  }
                  dd{
                    padding: 2vh 0;
                    overflow: hidden;
                    span{
                      display: inline-block;
                    }
                    span:nth-of-type(1){
                      color: #F63D3B;
                    }
                    span:nth-of-type(2){
                      font-size: 3.5vw;
                      text-decoration: line-through;
                    }
                    span:nth-of-type(3){
                      float: right;
                      padding-right: 2vw;
                    }
                  }
                }
              }
            }
            .goScan{
              width: 100vw;
              text-align: center;
              padding: 1vh 0;
            }
          }
          .totalPrice{
            border-top: 1vh solid #f2f2f2;
            .discount,.amount{
              padding: 2vh 0;
              border-bottom: 1px solid #f2f2f2;
              color: #939393;
              span:nth-of-type(2){
                font-size: 5vw;
                float: right;
                color: #F63D3B;
              }
            }

          }
          .detailInfo{
            border-top: 1vh solid #f2f2f2;
            .detailNumber,.detailNumber,.detailType{
              padding: 2vh 0;
              border-bottom: 1px solid #f2f2f2;
              span:nth-of-type(1){
                color: #939393;
                width: 30vw;
                display: inline-block;
              }
              span:nth-of-type(2){
                float: right;
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
</style>
