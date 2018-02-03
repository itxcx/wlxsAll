<template>
  <div class="Reservation">
    <section class="topHead">
      <div id="banner">
        <Banner></Banner>
      </div>
      <section class="topAddress">
        <select name="city" id="city"  disabled="disabled">
          <option value="西安">西安</option></select>
        <select name="concreteAddress" id="concreteAddress"  disabled="disabled">
          <option value="西安市高新区锦业路69号瞪羚谷Ｅ座餐厅外">西安市高新区锦业路69号瞪羚谷Ｅ座餐厅外</option>
        </select>
      </section>
    </section>
    <section class="reservaList">
        <ul>
          <li v-for="(item,i) in $store.state.reservaList">
            <ul>
              <li v-for="(goods,j) in item.itemList">
                <div class="reservaListImg" :style="{backgroundImage: 'url('+ goods.imgPath +')'}" @click="goDetail(i,j)"></div>
                <div class="reservaContent">
                  <div class="priceAll">
                    <p>{{goods.reservaName}}</p>
                    <span>{{goods.reservaPrice | priceFormat}}</span>
                    <span>{{goods.purchasePrice | priceFormat}}</span>
                  </div>
                  <div class="addBtn">
                    <span style="display:none;">{{j}}</span>
                    <button class="btn btn-danger" @click="addTrolley(i, j)">加入购物车</button>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
    </section>
    <section class="tipModal" v-show="addComplete">
      <span class="glyphicon glyphicon-ok"></span>
      <p>{{addText}}</p>
    </section>
    <Footer-tab></Footer-tab>
  </div>
</template>


<script>
  import Banner from './Banner.vue';
  import FooterTab from './FooterTab.vue';
  export default({
    name: 'reservation',
    data () {
      return {
        addComplete: false,//是否加入购物车
        addText:'添加成功',//添加购物车提示信息
        deviceId: '10000006',//设备id
        reservaList: []
      }
    },
    mounted () {

      //初始化方法
      this.$nextTick(() =>{
        //将预定商品列表更新
        if(this.$store.state.reservaList.length > 0){
          for( let s = 0; s < this.$store.state.reservaList.length; s++){
            this.$store.state.reservaList[s].checked = false;
            for( let n = 0; n < this.$store.state.reservaList[s].itemList.length; n++){
              this.$store.state.reservaList[s].itemList[n].reservaCount =1;
              this.$store.state.reservaList[s].itemList[n].checked = false;
            }
          }
        }
        this.reservaDataGet(this.deviceId);
        //获取预定列表
      })
    },
    components:{Banner, FooterTab},
    //过滤器
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
    methods: {
      transformRequest(data) {
        let ret = '';
        for (let i in data) {
          ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
        }
        return ret;
      },
      reservaDataGet: function (deviceId) {
        this.$http({
          url: 'reserve/goodsList',
          method: 'post',
          data: this.transformRequest({deviceId: deviceId}),
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }).then((res) => {
          this.reservaList = res.data.data.data;
          this.$store.state.reservaList = res.data.data.data;
          console.log(this.$store.state.reservaList);
          console.log(this.reservaList);
        }).catch((error) => {
          console.log(2);
          console.log(error);
        })
      },
      goDetail: function (i, j) {
        this.$router.push(
          {
            name: 'detail',
            query: {
              row: i,
              col: j,
              reserva: this.reservaList
            }
          }
        );
      },
      addTrolley: function (i, j) {
        //添加商品时先读取localstorage数据
        if (localStorage.getItem('trolleyList')) {
          this.$store.state.trolleyList = JSON.parse(localStorage.getItem('trolleyList'))
        }
        console.log(i + '---' + j);
        //let reservaData = this.$store.state.reservaList;
        let device = this.reservaList[i].deviceId;//添加商品所属的设备id
        let addData = this.reservaList[i].itemList[j];//添加的商品信息
        if (this.$store.state.trolleyList.length === 0) {
          //购物车为空
          let item = {};
          item.deviceId = device;
          item.checked = false;
          item.list = [];
          this.reservaList[i].itemList[j].checked = false;
          item.list.push(this.reservaList[i].itemList[j]);
          this.$store.state.trolleyList.push(item);
          console.log(this.$store.state.trolleyList);
        } else if (this.$store.state.trolleyList.length > 0) {
          //购物车的数据不为空
          let addDev = false, num = -1, indexs = -2;
          for (let m = 0; m < this.$store.state.trolleyList.length; m++) {
            if (device === this.$store.state.trolleyList[m].deviceId) {
              addDev = true;
              num = m;
              for (let n = 0; n < this.$store.state.trolleyList[m].list.length; n++) {
                if (addData.reId === this.$store.state.trolleyList[m].list[n].reId) {
                  indexs = n;
                }
              }
            }
          }
          if (addDev === false) {//设备没有添加
            let item = {};
            item.deviceId = device;
            item.checked = false;
            item.list = [];
            this.reservaList[i].itemList[j].checked = false;
            item.list.push(this.reservaList[i].itemList[j]);
            this.$store.state.trolleyList.push(item);
          } else {
            if (indexs === -2) {//商品没有添加
              this.$store.state.trolleyList[num].checked = false;
              this.reservaList[i].itemList[j].checked = false;
              this.$store.state.trolleyList[num].list.push(this.reservaList[i].itemList[j]);
            } else {//商品已经添加
              this.$store.state.trolleyList[num].list[indexs].reservaCount++;
              if(this.$store.state.trolleyList[num].list[indexs].reservaCount > this.$store.state.trolleyList[num].list[indexs].realStock){
                this.$store.state.trolleyList[num].list[indexs].reservaCount = this.$store.state.trolleyList[num].list[indexs].realStock;
              }
            }
          }
        }
        //提示框控制
        this.addComplete = true;
        setTimeout( () => {
          this.addComplete = false;
        }, 1000);
        console.log(this.$store.state.trolleyList);
        //添加商品动态设置localstorage数据
        localStorage.setItem('trolleyList', JSON.stringify(this.$store.state.trolleyList));
        //console.log(this.$store.state.trolleyList);
      }
    }
  })
</script>


<style lang="less">
  @headerHeight : 6vh;
  .Reservation{
    background: #f2f2f2;
    padding: 0 0 12vh 0;
    .tipModal{
      background: rgba(0,0,0,0.8);
      border-radius: 20px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      width: 45vw;
      height: 18vh;
      z-index: 99;
      color: #fff;
      text-align: center;
      font-size: 3.5vw;
      padding: 3vh 0;
      span{
        font-size: 7vh;
      }
    }
    .topHead{
      width: 100vw;
      height: 30vh;
      margin: 0;
      padding: 0;
      position: relative;
      .topAddress{
        position: absolute;
        width: 90vw;
        z-index: 998;
        border-radius: 5px;
        text-align: center;
        background: rgba(246,239,233,0.7);
        top: 2vh;
        left: 5vw;
        height: 7vh;
        select{
          border: none;
          height: 7vh;
          appearance:none;
          -moz-appearance:none;
          -webkit-appearance:none;
          background: none;
          outline: medium;
          font-size: 3.5vw;
        }
        select:nth-of-type(1){
          width: 10vw;
          text-align: center;
        }
        select:nth-of-type(2){
          width: 70vw;
        }

      }
    }

    .reservaList{
      margin-top: 1vh;
      padding: 0 2vw;
      ul{
        list-style: none;
        li{
          margin: 2vh 0;
          font-size: 4vw;
          .reservaListImg{
            width: 100%;
            height: 20vh;
            background-size: cover;
          }
          .reservaContent{
            overflow: hidden;
            background: #fff;

            padding: 1vh 0;
            div{
              float: left;
            }
            .priceAll{
              width: 70%;
              padding-left: 3vw;
              span:nth-of-type(1){
                color: #F13D3C;
              }
              span:nth-of-type(2){
                font-size: 3.7vw;
                text-decoration: line-through;
              }
            }
            .addBtn{
              width: 30%;
              height: 7vh;
              line-height: 7vh;

              text-align: right;
              padding-right: 3vw;
              vertical-align: middle;
              .btn-danger{
                background: #F73C3B;
                font-size: 4vw;
              }
            }
          }
        }
      }
    }
  }
</style>
