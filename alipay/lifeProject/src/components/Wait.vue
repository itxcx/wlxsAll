<template>
  <div class="Wait">
    <p class="tipTitle">
      <span class="glyphicon glyphicon-exclamation-sign"></span>
      <span>未按时取餐，快餐将被回收，预定费不退。</span>
    </p>
    <p v-show="isEmpty" class="emptyBox">
      <span class="glyphicon glyphicon-compressed"></span>
      <span>没有待取餐数据...</span>
    </p>
    <div class="orderList">
      <ul>
        <li v-for="(item,i) in waitItemList" class="itemList">
          <div class="itemsContent">
            <p>订单编号: <span>{{item.orderId}}</span></p>
            <ul>
              <li v-for="(dList,j) in item.orderList" class="dListLi">
                <div class="dList">
                  <ul>
                    <li v-for="oList in dList.itemList">
                      <div class="oList">
                        <div class="oListImg" :style="{backgroundImage: 'url('+ oList.imgPath +')'}" ></div>
                        <dl>
                          <dt>{{oList.name}}</dt>
                          <dd>
                            <span>￥{{oList.price}}</span>
                            <span>x{{oList.number}}</span>
                          </dd>
                        </dl>
                        <div class="itemTotal">￥{{(oList.price * oList.number).toFixed(2)}}</div>
                      </div>
                    </li>
                  </ul>
                  <p class="totalPrice">小计:<span>￥{{dList.amount}}</span></p>
                  <p class="orderStatus">订单状态:<span v-html="dList.status ? '已取餐' : '待取餐'"></span></p>
                  <p class="orderAddress"><span>取餐地址:</span><span>{{dList.addr}}</span></p>
                </div>
              </li>
            </ul>
            <p class="orderTotalPrice">订单总价:<span>￥{{item.amount}}</span>
              <button class="btn btn-danger" @click="readyScan(goScan, i)">扫码取餐</button>
            </p>
            <p class="takeTime">取餐时间:
              <span>{{item.timeStart}}</span><span>--</span><span>{{item.timeEnd}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <Footer-tab></Footer-tab>
  </div>
</template>

<script>
  import FooterTab from '../components/FooterTab.vue'
  export default({
    name: 'Wait',
    data(){
      return {
        sessionId:'',//扫码成功后获取到的用户ID
        orderId:'',//点击取餐的订单ID
        waitItemList: [],
        showItemsList: [],
        allItemList: [],
        urlPath:'',//扫码后的地址
        isEmpty: this.showItemsList > 0 ? true : false
      }
    },
    mounted (){
      this.$nextTick(() => {
        console.log(this.$route.path);
        if(this.$route.path !== '/'){
          window.clearInterval(this.timer);
        }
      this.$http({
        url: 'reserve/prepareOrderDetail',
        method: 'post'
      }).then( (res) => {
        console.log(res);
        if(res.data.message == 'success' && res.data.code == '0'){
          let itemsList = res.data.data.data;
          this.allItemList = itemsList; //全部订单信息
//          this.showItemsList = this.allItemList;
          if(itemsList.length > 0){
            //分类待取数据
            for(let i = 0; i < itemsList.length; i++){
              let add = false;
              for(let j = 0; j < itemsList[i].orderList.length; j++){
                if(itemsList[i].orderList[j].status == '0'){
                  add = true;
                }
              }
              if(add == true){
                this.waitItemList.push(itemsList[i]);
              }
            }
          }
        }

      }).catch( (error) => {
        console.log('error:' + error);//报错信息
      })
      })
    },
    components:{
      FooterTab
    },
    methods:{
      transformRequest(data) {
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret;
      },
      readyScan(callback, i) {
        this.orderId = this.waitItemList[i].orderId;//订单编号
        if (window.AlipayJSBridge) {
          callback && callback();
        } else {
          // 如果没有注入则监听注入的事件
          document.addEventListener('AlipayJSBridgeReady', callback, false);
        }
      },
      getUrlQuery(urlPath){ //从扫码中获取设备编号方法
        let name = null;
        let value = null;
        let str = urlPath;
        let num = str.indexOf("?");
        str = str.substr(num + 1);
        let arr = str.split("&");
        for(let i = 0; i < arr.length; i++){
          let num = arr[i].indexOf("=");
          if(num > 0){
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            //this[name] = value;
          }
        }
        return value;
      },
      goScan(){
        AlipayJSBridge.call('scan', {
          type: 'qr'
        },  (result) => {
          if(result.error){
            console.log(result.error);
          } else {
            this.urlPath = result.qrCode; //扫码后的地址
            let path = this.urlPath;
            let deviceNo = this.getUrlQuery(path);
            //发送扫码后的设备id和订单id
            this.$http({
              url: 'reserve/urlQRPost',
              method: 'post',
              //data: this.transformRequest({device_no: deviceNo, orderId: this.orderId})
              data: this.transformRequest({device_no: '01ad555d15e4cf134f9e6c550b79522c', orderId: this.orderId})
            }).then( (res) => {
              if(res.data.code == 0){
                this.sessionId = res.data.data.session_id; //sessionId  websocket
                this.goAfterScan();
              }else{
              }
            }).catch( (error) => {
              console.log(error);
            })
          }
        });
      },
      goAfterScan() {
        //扫码成功后跳转页面
        this.$router.push({
          name: 'afterScan',
          query: {
            sessionId: this.sessionId
          }
        })
      }
    }
  })
</script>

<style lang="less">
  @headerHeight : 6vh;
.Wait{
  padding: 0 0 12vh 0;
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
  .tipTitle{
    margin: 1vh 2vw 0 2vw;
    font-size: 3.5vw;
    span:nth-of-type(1){
      color: #F13D3C;
    }
  }
  .emptyBox{
    font-size: 5vw;
    color: #F13D3C;
    padding: 10vh 0 0 0;
    text-align: center;
  }
  .orderItemsList{
    font-size: 4vw;
    .emptyTip{
      font-size: 6vw;
      color: #f73c3b;
      text-align: center;
      padding: 10vh 0 ;
    }
  }
  .orderList{

    ul{
      list-style: none;
      .itemList{
        background: #fff;
        margin: 0 0 2vh 0;
        padding: 2vh 2vw;
        .itemsContent{
          >p:nth-of-type(1){
            padding: 1vh 0;
            border-bottom: 1px solid #f2f2f2;
            font-weight: 600;
          }
          ul{
            list-style: none;
            .dListLi{

              .dList{

                .oList{
                  overflow: hidden;
                  padding: 2vh 0;
                  border-bottom: 1px solid #f2f2f2;
                  .oListImg{
                    width: 12vh;
                    height: 12vh;
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: cover;
                    border: 1px solid #f2f2f2;
                    border-radius: 5px;
                    float: left;
                  }
                  dl{
                    padding: 2vh 0;
                    float: left;
                    margin-left: 4vw;
                    dt{
                      font-size: 4.4vw;
                      font-weight: normal;
                    }
                    dd{
                      span:nth-of-type(1){
                        font-size: 3.7vw;
                        color: #f73c3b;
                        margin-right: 4vw;
                      }
                    }
                  }
                  .itemTotal{
                    float: right;
                    height: 12vh;
                    line-height: 12vh;
                    padding-right: 2vw;
                    color: #f73c3b;
                  }
                }
                .totalPrice{
                  padding: 2vh 0;
                  float: left;
                }
                .orderStatus{
                  padding: 2vh 0;
                  float: right;
                  span{
                    color: #f73c3b;
                    font-weight: 600;
                  }
                }
                .orderAddress{
                  clear: both;
                  border-top: 1px solid #f2f2f2;
                  border-bottom: 1px solid #f2f2f2;
                  padding: 2vh 0;
                  overflow: hidden;
                  span{
                    float: left;
                  }
                  span:nth-of-type(1){
                    width: 20vw;
                  }
                  span:nth-of-type(2){
                    width: 75vw;
                  }
                }
              }
            }
          }
          .orderTotalPrice{
            padding: 2vh 0;
            border-bottom: 1px solid #f2f2f2;
            span{
              color: #f73c3b;
              font-size: 5vw;
            }
            button{
              float: right;
            }
          }
          .takeTime{
            padding: 2vh 0;
            span{
              font-size: 2.5vh;
              font-weight: 600;
              color: #f73c3b;
            }
          }
        }
      }
    }
  }
}

</style>
