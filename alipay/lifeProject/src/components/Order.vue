<template>
  <div class="Order">
    <section class="typeTap">
      <ul>
        <li :class="{'pitch': all,'unPitch': !all}" @click="switchAll">全部</li>
        <li :class="{'pitch': wait,'unPitch': !wait}" @click="switchWait">待取餐</li>
        <li :class="{'pitch': completeOrder,'unPitch': !completeOrder}" @click="switchComplete">已完成</li>
        <li :class="{'pitch': refunds,'unPitch': !refunds}" @click="switchRefunds">已退款</li>
      </ul>
    </section>
    <section class="orderItemsList">
        <div v-show="!isEmpty" class="emptyTip">
          <p><span class="glyphicon glyphicon-inbox"></span><br/>当前订单信息为空</p>
        </div>
        <div class="orderList">
          <ul>
            <li v-for="item in showItemsList" class="itemList">
              <div class="itemsContent">
                <p>订单编号: <span>{{item.orderId}}</span></p>
                <ul>
                  <li v-for="dList in item.orderList" class="dListLi">
                    <div class="dList">
                      <ul>
                        <li v-for="oList in dList.itemList">
                          <div class="oList">
                            <div class="oListImg" :style="{backgroundImage: 'url('+ oList.imgPath +')'}"></div>
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
                <p class="orderTotalPrice">订单总价:<span>￥{{item.amount}}</span></p>
                <p class="takeTime">取餐时间:
                  <span>{{item.timeStart}}</span><span>--</span><span>{{item.timeEnd}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
    </section>
    <Footer-tab></Footer-tab>
  </div>
</template>
<script>
  import FooterTab from './FooterTab.vue'
export default({
  name: 'Order',
  data(){
    return {
      all: true,
      wait: false,
      completeOrder: false,
      refunds: false,
      allItemList: [],//所有订单
      waitItemList: [],//待取餐
      completeItemList: [],//已完成
      refundsItemList: [],//已退款
      showItemsList: [],//页面显示数据
      isEmpty: this.showItemsList > 0 ? false : true
    }
  },
  mounted (){
    this.$nextTick(() => {
      console.log(this.$route.path);
      if(this.$route.path !== '/'){
        window.clearInterval(this.timer);
        console.log(1);
      }
      this.$http({
        url: 'reserve/prepareOrderDetail',
        method: 'post'
      }).then( (res) => {
      console.log(res);
        if(res.data.message == 'success' && res.data.code == '0'){
          let itemsList = res.data.data.data;
          this.allItemList = itemsList;//全部订单信息
          this.showItemsList = this.allItemList;
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
            //分类已取数据
            for(let i = 0; i < itemsList.length; i++){
              let add = false;
              for(let j = 0; j < itemsList[i].orderList.length; j++){
                if(itemsList[i].orderList[j].status == '1'){
                  add = true;
                }
              }
              if(add == true){
                this.completeItemList.push(itemsList[i]);
              }
            }
            for(let k = 0; k < this.completeItemList.length; k++){
              for(let s = 0; s < this.completeItemList[k].orderList.length; s++){
                if(this.completeItemList[k].orderList[s].status == '0'){
                  this.completeItemList[k].orderList.splice(s,1);
                }
              }
            }
            console.log(this.completeItemList);
            console.log(this.waitItemList);
            this.$store.state.WaitList = this.waitItemList;
          }
        }
        //请求回来的数据按照订单状态分类,0-未取;1-已取
      }).catch( (error) => {
        console.log('error:' + error);//报错信息
      })
    })
  },
  components:{
    FooterTab
  },
  methods:{
    switchAll(){
      this.all = true;
      this.wait = false;
      this.completeOrder = false;
      this.refunds = false;
      this.showItemsList = this.allItemList; //全部订单数据
    },
    switchWait(){
      this.all = false;
      this.wait = true;
      this.completeOrder = false;
      this.refunds = false;
      this.showItemsList = this.waitItemList; //待取订单数据
    },
    switchComplete(){
      this.all = false;
      this.wait = false;
      this.completeOrder = true;
      this.refunds = false;
      this.showItemsList = this.completeItemList; //已取订单数据
    },
    switchRefunds(){
      this.all = false;
      this.wait = false;
      this.completeOrder = false;
      this.refunds = true;
      this.showItemsList = this.refundsItemList;
    }
  }
})
</script>

<style lang="less">
  @headerHeight : 6vh;
  .Order{
    padding: 0 0 12vh 0;
    .typeTap{
      width: 100%;
      height: 7vh;
      position: fixed;
      background: #fff;
      border-bottom: 1px solid #f2f2f2;
      ul{
        list-style: none;
        li{
          width: 25%;
          height: 7vh;
          line-height: 7vh;
          text-align: center;
          float: left;
          font-size: 2.7vh;
        }
        .pitch{
          border-bottom: 2px solid #f73c3b;
          color: #f73c3b;
        }
        .unPitch{
          color: #333;
        }
      }
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
      padding-top: 5vh;
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
                      border-radius: 10px;
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
              text-align: right;
              border-bottom: 1px solid #f2f2f2;
              span{
                color: #f73c3b;
                font-size: 5vw;
              }
            }
            .takeTime{
              padding: 2vh 0;
              span{
                font-size: 3.3vw;
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
