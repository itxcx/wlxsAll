<template>
  <div class="Trolley">
    <section class="TrolleyItems">
      <div v-show="!isEmpty" class="emptyBox">
        <span class="glyphicon glyphicon-inbox"></span>
        <span>购物车空空哒...</span>
      </div>
      <div class="storeItem" v-for="(item,index1) in goodsObj">
        <div class="deviceName">
          <input type="checkbox" name="all" @touchend="chooseShopGoods(index1)" v-model="item.checked" :class="{'checkBoxTrue':!item.checked}"/>
          <span :class="{'simulateTrue':!item.checked, 'simulateFalse': item.checked}"></span>
          <p v-html="item.deviceId"></p>
        </div>
        <div class="storeItemsList">
          <ul>
            <li v-for="(data,index) in item.list">
              <div class="checkIcon">
                <label>
                  <input type="checkbox" name="all" v-model="data.checked" @touchend="choose(index1, index)"  :class="{'checkBoxTrue':data.checked}"/>
                  <span :class="{'simulateTrue':!data.checked, 'simulateFalse': data.checked}"></span>
                </label>
              </div>
              <div :style="{backgroundImage: 'url('+ data.imgPath +')'}" class="itemImg"></div>
              <dl>
                <dt>
                  <span v-html="data.reservaName"></span>
                </dt>
                <dd>
                  <span v-html="priceFormat(data.reservaPrice)"></span>
                  <span v-html="priceFormat(data.purchasePrice)"></span>
                </dd>
              </dl>
              <div class="itemCtrl">
                <span class="reduce" @touchend="numChange(index1, index, -1)" v-bind:class="{ 'disable' : data.reservaCount==1 }"></span>
                <input type="number" readonly v-bind:value="data.reservaCount" class="number" v-bind:data-realStock="data.realStock" v-on:keyUp="numEntry(index1, index)" v-on:keyDown="numEntry(index1, index)" v-model="data.reservaCount"/>
                <span class="add" @touchend="numChange(index1, index, 1)" v-bind:class="{ 'disable' : data.reservaCount==data.realStock }"></span>
              </div>
              <!--删除 暂时不在页面显示-->
              <div style="display: none;">
                <a href="javascript:;" rel="external nofollow" v-on:click="delGoods(index1, index)">删除</a>
              </div>
            </li>
          </ul>
        </div>
        <!--两种金额不在页面显示-->
        <div style="display: none;">
          <p>实付金额: <span v-html="calEveryStore(index1)"></span></p>
          <p>原总金额: <span v-html="calEveryFare(index1)"></span></p>
        </div>
      </div>
      <div class="tip">
        <div>
          <span>优惠活动</span>
        </div>
        <div class="tipList">用优惠券可享受满100减30元</div>
      </div>
      <div class="totalPrice">
        <div class="totalIcon">
          <label>
            <input type="checkbox" @touchend="chooseAllGoods($event)" v-model="allChecked" :class="{'checkBoxTrue': allChecked}"/>
            <span :class="{'simulateTrue':!allChecked, 'simulateFalse': allChecked}"></span>
          </label>
          <span>全选</span>
        </div>
        <div>
          <p style="display: none;">商品总原价:<span v-html="totalFare"></span></p>
          <p>共<span v-html="priceFormat(totalMoney)"></span></p>
        </div>
        <div @click="balance">
          <span>去结算</span>
        </div>
      </div>
    </section>
    <Footer-tab></Footer-tab>
  </div>
</template>

<script>
  import FooterTab from '../components/FooterTab.vue'
 export default({
   name : 'Trolley',
   data () {
     return {
       isEmpty: this.$store.state.trolleyList>0 ? false : true ,
       goodsObj : [],
       totalMoney : 0,
       totalFare : 0,
       allChecked : false,
       balanceData: [],
       successTrolley: true,//判断结算是否成功
     }
   },
   mounted (){
     this.$nextTick(()=>{
       console.log(this.$route.path);
       if(this.$route.path !== '/'){
         window.clearInterval(this.timer);
         console.log(1);
       }
       //购物车数据从localstorage数据
       console.log(JSON.parse(localStorage.getItem('trolleyList')));
       if(localStorage.getItem('trolleyList')){
         this.goodsObj = JSON.parse(localStorage.getItem('trolleyList'));
       }
     })
   },
   components: {
     FooterTab
   },
   methods: {
     //金额
     priceFormat(value) {
       value = Number(value);
       if(isNaN(value)){
         value = 0;
       }
       if(value.toString().split('.')[1] && value.toString().split('.')[1].length < 2){
         value = '￥' + value + '0';
       }else if(value.toString().split('.')[1] && value.toString().split('.')[1].length >= 2){
         value = '￥' + value.toString().split('.')[0] + '.' + value.toString().split('.')[1].substr(0, 2);
       }else{
         value = '￥' + value + '.00';
       }
//       value = value.toString().toFixed(2);
       return value;
     },
     // 全部商品全选
     chooseAllGoods() {
       if(this.goodsObj){
       let flag = true;
       if ( this.allChecked ) {
         flag = false;
       }
       for ( let i = 0, len = this.goodsObj.length; i < len; i++ ) {
         this.goodsObj[i]['checked'] = flag;
         let list = this.goodsObj[i]['list'];
         for ( let k = 0, len1 = list.length; k < len1; k++ ) {
           list[k]['checked'] = flag;
         }
       }
       this.allChecked = !this.allChecked;
       this.calTotalMoney();
       this.calTotalFare();
       }
     },
     // 每个设备下商品全选
     chooseShopGoods(index) {
       if(this.goodsObj){
       let list = this.goodsObj[index]['list'],
         len = list.length;
       if ( this.goodsObj[index]['checked'] ) {
         for (let i = 0; i < len; i++ ) {
           list[i]['checked'] = false;
         }
       } else {
         for (let i = 0; i < len; i++ ) {
           list[i]['checked'] = true;
         }
       }
       this.goodsObj[index]['checked'] = !this.goodsObj[index]['checked'];
       this.isChooseAll();
       this.cal(index);
       }
     },
     //单个选择
     choose( index1, index) {
       if(this.goodsObj){
       let list = this.goodsObj[index1]['list'],
         len = list.length;
       if ( list[index]['checked'] ) {
         this.goodsObj[index1]['checked'] = false;
         this.allChecked = false;
         list[index]['checked'] = !list[index]['checked'];
       } else {
         list[index]['checked'] = !list[index]['checked'];

         // 判断是否选择当前设备的全选
         let flag = true;
         for (let i = 0; i < len; i++ ) {
           if ( list[i]['checked'] === false ) {
             flag = false;
             break;
           }
         }
         flag === true ? this.goodsObj[index1]['checked'] = true : this.goodsObj[index1]['checked'] = false;
       }
       this.isChooseAll();
       this.cal(index1,index);
       }
     },
     // 判断是否选择所有商品的全选
     isChooseAll() {
       if(this.goodsObj){
       let flag1 = true;
       for ( let i = 0, len = this.goodsObj.length; i < len; i++ ) {
         if ( this.goodsObj[i]['checked'] === false ) {
           flag1 = false;
           break;
         }
       }
       flag1 === true ? this.allChecked = true : this.allChecked = false;
       }
     },
     // 商品数量控制
     numChange(index1, index, numChange) {
       if(this.goodsObj){
       let goods = this.goodsObj[index1]['list'][index],
         oThis = this;
       if ( numChange === 1 ) {
         goods.reservaCount++;
       } else if ( numChange === -1 ) {
         goods.reservaCount--;
       }
       //根据预设数量判断
       if ( goods.reservaCount <= 1 ) {
         goods.reservaCount = 1;
       }
       if ( goods.reservaCount >= goods.realStock && goods.realStock > 0) {
         goods.reservaCount = goods.realStock;
       }
       this.cal(index1,index);
       }
     },

     // 数量选择(如果有预定数量的限制，则按照限制选择，如果没有，add一直往上累计)
     numEntry(index1, index) {
       if(this.goodsObj){
       let goods = this.goodsObj[index1]['list'][index];
       if ( goods.reservaCount <=1 ) {
         goods.reservaCount = 1;
       }
       if ( goods.reservaCount > goods.realStock ) {
         goods.reservaCount = goods.realStock;
       }
       this.cal(index1,index);
       }
     },
     // 计算每个设备的应付总额
     calEveryStore(index) {
       if(this.goodsObj){
       let everyStoreMoney = 0,
         list = this.goodsObj[index]['list'];
         list.forEach(function(item, i, arr) {
         if ( list[i]['checked'] ) {
           everyStoreMoney += parseFloat(item.reservaPrice) * parseFloat(item.reservaCount);
         }
       });
       return everyStoreMoney.toFixed(2);
       }
     },
     // 计算每个设备的总原价
     calEveryFare(index) {
       if(this.goodsObj){
       let everyStoreFare = 0,
         list = this.goodsObj[index].list;
       list.forEach(function(item, index, arr) {
         if ( list[index]['checked'] ) {
           everyStoreFare += parseFloat(item.purchasePrice) * parseFloat(item.reservaCount);
         }
       });
       return everyStoreFare.toFixed(2);
       }
     },
     // 计算商品应付总金额
     calTotalMoney() {
       if(this.goodsObj){
       let oThis = this;
       this.totalMoney = 0;
       for ( let i = 0, len = this.goodsObj.length; i < len; i++ ) {
         let list = this.goodsObj[i]['list'];
         list.forEach(function(item, index, arr) {
           if ( list[index]['checked'] ) {
             oThis.totalMoney += parseFloat(item.reservaPrice) * parseFloat(item.reservaCount);
           }
         });
       }
       }
     },
     // 计算商品总原价
     calTotalFare() {
       if(this.goodsObj){
       let oThis = this;
       this.totalFare = 0;
       for ( let i = 0, len = this.goodsObj.length; i < len; i++ ) {
         let list = this.goodsObj[i]['list'];
         list.forEach(function(item, index, arr) {
           if ( list[index]['checked'] ) {
             oThis.totalFare += parseFloat(item.purchasePrice) * parseFloat(item.reservaCount);
           }
         });
       }
       }
     },
     // 计算方法集合
     cal(index1,index) {
       this.calEveryStore(index1);
       this.calEveryFare(index1);
       this.calTotalMoney();
       this.calTotalFare();
     },
     // 删除操作
     delGoods(index1, index) {
       if(this.goodsObj){
       this.goodsObj[index1]['list'].splice(index, 1);
       this.cal(index);
       }
     },
     //下单时间格式转换
     formatDateTime() {
       let date = new Date();
       let y = date.getFullYear();
       let m = date.getMonth() + 1;
           m = m < 10 ? ('0' + m) : m;
       let d = date.getDate();
           d = d < 10 ? ('0' + d) : d;
       let h = date.getHours();
           h = h < 10 ? ('0' + h) : h;
       let minute = date.getMinutes();
       let second = date.getSeconds();
           minute = minute < 10 ? ('0' + minute) : minute;
           second = second < 10 ? ('0' + second) : second;
       return y + '-' + m + '-' + d +' '+ h + ':' + minute + ':' + second;
     },
     //取餐时间格式转换
     formatWaitTime() {
       let date = new Date();
       let y = date.getFullYear();
       let m = date.getMonth() + 1;
       m = m < 10 ? ('0' + m) : m;
       let d = date.getDate();
       d = d < 10 ? ('0' + d) : d;
       let h = date.getHours() + 2;
       h = h < 10 ? ('0' + h) : h;
       let minute = date.getMinutes();
       let second = date.getSeconds();
       minute = minute < 10 ? ('0' + minute) : minute;
       second = second < 10 ? ('0' + second) : second;
       return y + '-' + m + '-' + d +' '+ h + ':' + minute + ':' + second;
     },
     transformRequest(data) {
       let ret = '';
       for (let i in data) {
         ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
       }
       return ret;
     },
     //商品结算操作
     balance(){
       this.balanceData = this.goodsObj;
       let sendDataList = [];
       for(let i = 0; i < this.balanceData.length; i++) {
         let item = {};
         item.deviceId = this.balanceData[i].deviceId;
         item.list = [];
         for(let j = 0; j < this.balanceData[i].list.length; j++){
           if(this.balanceData[i].list[j]['checked'] === true){
             item.list.push(this.balanceData[i].list[j]);
           }
         }
         if(item.list.length > 0){
           sendDataList.push(item);
         }
       }
       /*ajax*/
      //发送的数据
       let isEmpty = sendDataList.length;
       //判断所选商品是不是为空
       if(isEmpty > 0){
         /*ajax*/
         sendDataList = JSON.stringify(sendDataList);
         let data = {'balance': sendDataList};
         this.$http.post('reserve/payMoney', this.transformRequest(data))
           .then( (res) => {
            console.log(res.data);
         if(res.data.message === 'success'){
           this.successTrolley = true;
           //结算后将购物车置空,并跳转到信息反馈页面
         localStorage.setItem('trolleyList', JSON.stringify([]));
           this.$store.state.trolleyList = [];
         this.$router.push(
           {
             name: 'settle',
             query:{
               total: this.priceFormat(this.totalMoney),
               success: this.successTrolley
             }
           }
         );
         } else {
           this.successTrolley = false;
           this.$router.push(
           {
             name: 'settle',
             query:{
               total: res.data.message,
               success: this.successTrolley
             }
           }
         );
         }

         }).catch((error) => {
           console.log(error);
         })
       }

     }
   }
 })
</script>

<style lang="less">
  @headerHeight : 6vh;
  .Trolley{
      font-size: 4vw;
      padding: 0 0 23vh 0;
    .TrolleyItems {
      .emptyBox{
        font-size: 5vw;
        color: #F13D3C;
        text-align: center;
        padding: 3vh 0 0 0;
        margin-bottom: 1vh;
      }
      .checkBoxTrue{
        width: 4vh;
        height: 4vh;
      }
      .checkBoxFalse{
        width: 8vh;
        height: 8vh;
      }
      width: 100%;
      background: #fff;
      font-size: 4vw;
      .storeItem{
        padding: 0 1vw;
        .deviceName{
          border-bottom: 1px solid #f2f2f2;
          padding: 2vh 0;
          overflow: hidden;
          position: relative;
          input{
            position: absolute;
            z-index: 3;
            width: 5vh;
            height: 5vh;
            opacity: 0;
          }
          label{
            width: 10vw;
            float: left;
          }
          .simulateTrue{
            position: absolute;
            top: 2vh;
            left: 0;
            z-index: 1;
            width: 5vh;
            height: 5vh;
            background: url(../../static/images/icon1.png) no-repeat center center;
            background-size: cover;
            display: inline-block;
          }
          .simulateFalse{
            position: absolute;
            top: 2vh;
            left: 0;
            z-index: 1;
            width: 5vh;
            height: 5vh;
            background: url(../../static/images/icon2.png) no-repeat center center;
            background-size: cover;
            display: inline-block;
          }
          p{
            width:85vw;
            float: right;
          }
        }
        .storeItemsList{
          ul{
            list-style: none;
            li{
              border-bottom: 1px solid #f2f2f2;
              padding: 2vh 0;
              overflow: hidden;
              .checkIcon{
                width: 10vw;
                float: left;
                label{
                  position: relative;
                }
                input{
                  position: absolute;
                  z-index: 2;
                  width: 5vh;
                  height: 5vh;
                  opacity: 0;
                }
                .simulateTrue{
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 1;
                  width: 5vh;
                  height: 5vh;
                  background: url(../../static/images/icon1.png) no-repeat center center;
                  background-size: cover;
                  display: inline-block;
                }
                .simulateFalse{
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 1;
                  width: 5vh;
                  height: 5vh;
                  background: url(../../static/images/icon2.png) no-repeat center center;
                  background-size: cover;
                  display: inline-block;
                }
              }
              .itemImg{
                width: 10vh;
                height: 10vh;
                background-size: cover;
                border-radius: 5px;
                background-position: center center;
                background-repeat: no-repeat;
                float: left;
              }
              dl{
                width: 37vw;
                float: left;
                margin: 1.5vh 1vw 0 2vw;
                dt{
                  font-weight: normal;
                }
                dd{
                  span:nth-of-type(1){
                    color: #F13D3C;
                  }
                  span:nth-of-type(2){
                    font-size: 3.5vw;
                    text-decoration: line-through;
                  }
                }
              }
              .itemCtrl{
                width: 30vw;
                float: left;
                height: 10vh;
                padding: 3vh 0;
                input{
                  width: 10vw;
                  border: none;
                  outline: medium;
                  text-align: center;
                  vertical-align: top;
                }
                span{
                  display: inline-block;
                  width: 8vw;
                  height: 8vw;
                  border: 1px solid #555;
                  border-radius: 50%;
                }
                span:nth-of-type(1){

                }
                span:nth-of-type(2){

                }
              }

            }
          }
        }
      }
      .tip{
        overflow: hidden;
        padding: 2vh 2vw;
        div{
          float: left;
        }
        div:nth-of-type(1){
          span{
            border: 1px solid #F13D3C;
            display: inline-block;
            border-radius: 3px;
            font-size: 3.2vw;
            padding: 0.3vh 2vw;
            color: #F13D3C;
            font-weight: bold;
            margin-right: 2vw;
          }
        }
      }
      .totalPrice{
        position: fixed;
        bottom: 11vh;
        left: 0;
        border-top: 1px solid #f2f2f2;
        background: #fff;
        width: 100%;
        height: 8vh;
        font-size: 4.5vw;
        z-index: 999;
        .totalIcon{
          width: 26vw;
          float: left;
          height: 8vh;
          line-height: 8vh;
          font-weight: normal;
          padding: 0 1vw;
          label{
            width: 10vw;
            input{
              position: absolute;
              z-index: 2;
              width: 5vh;
              height: 5vh;
              opacity: 0;
              top: 0;
            }
            .simulateTrue{
              position: absolute;
              top: 1vh;
              left: 1vw;
              z-index: 1;
              width: 5vh;
              height: 5vh;
              background: url(../../static/images/icon1.png) no-repeat center center;
              background-size: cover;
              display: inline-block;
            }
            .simulateFalse{
              position: absolute;
              top: 1vh;
              left: 1vw;
              z-index: 1;
              width: 5vh;
              height: 5vh;
              background: url(../../static/images/icon2.png) no-repeat center center;
              background-size: cover;
              display: inline-block;
            }
          }
        }
        div:nth-of-type(2), div:nth-of-type(3){
          float: left;
          width: 37vw;
          height: 8vh;
          text-align: center;
          line-height: 8vh;
        }
        div:nth-of-type(2){
          text-align: right;
          padding-right: 3vw;
          span{
            font-size: 5vw;
            color: #F13D3C;
            font-weight: 600;
          }
        }
        div:nth-of-type(3){
          background: #F13D3C;
          color: #fff;
        }
      }
    }

  }
</style>
