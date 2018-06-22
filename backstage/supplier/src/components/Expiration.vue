<template>
    <div class="Expiration">
      <section class="login_top">
        <span @click="goMain">
          <Icon type="chevron-left"></Icon>
        </span>
        <p>商品保质期</p>
      </section>
      <header>
        <ul>
          <li v-model="city" @click="selectCity">
            <span v-html="city" class="selectInput"></span>
            <span :class="!cityDown ? 'down' : 'up'"></span>
          </li>
          <li v-model="device" @click="selectDevice">
            <span v-html="device" class="selectInput"></span>
            <span :class="!deviceDown ? 'down' : 'up'"></span>
          </li>
          <!--<li v-model="product" @click="selectProduct">-->
          <!--<span v-html="product" class="selectInput"></span>-->
          <!--<span :class="!productDown ? 'down' : 'up'"></span>-->
          <!--</li>-->
        </ul>
      </header>
      <section class="expirationContent">

      </section>
      <section class="tipModal" v-show="tipStatus">
        <p>{{tipText}}</p>
      </section>
      <!-- 加载中提示框 -->
      <section class="loading" v-show="loadingModal">
        <Spin size="large"></Spin>
        <p>数据获取中...</p>
      </section>
    </div>
</template>

<script>
    export default {
        name: "expiration",
        data() {
            return {
              tipStatus: false,
              tipText: '正在建设，马上开放...',
              city: '西安', //城市
              device: '全部售货柜', //设备
              cityDown: false, //控制城市选择显示
              deviceDown: false, //控制设备选择显示
              productDown: false, //控制商品选择显示
              active: true,
              allList: true,
              itemIsSelect: false, //是否选择具体商品
              showDeviceList: [],
              allProductArray: [], //全部商品
              allDeviceListArray: [
                {
                  "district": "全部",
                  "show": true,
                  "devicelist": [
                    {
                      address: "全部售货柜",
                      area_name: "未来鲜森",
                      device_id: '000000000',
                      goods_list: []
                    }
                  ]
                }
              ],//全部设备
              selectProductArray: [],
              // productItemDown: false,//选择商品没有选择柜子
              itemListArray: [],
              commonArray: null,
              loadingModal: false,
            }
        },
        mounted() {
          this.$nextTick(() => {

          })
        },
        methods: {
          //暂未开放提示方法
          closeCity() {
            this.tipStatus = true;
            let timer = setTimeout(() => {
              this.tipStatus = false;
              clearTimeout(timer);
            }, 1000)
          },
          //返回方法
          goMain() {
            this.$router.push({
              path: '/main'
            })
          },
          //选择城市
          selectCity() {
            // this.cityDown = true;
            // this.deviceDown = false;
            // this.allList = false;
            // this.product = '选择商品';
            // this.device = '全部售货柜';
            // this.productDown = false;
            // this.productItemDown = false;
            //tipText: '正在建设，马上开放...';
            //6.1
            this.tipStatus = true;
            this.tipText = '其他城市马上开放...';
            let timer = setTimeout(() => {
              this.tipStatus = false;
              this.tipText = '正在建设，马上开放...';
              clearTimeout(timer);
            }, 1000)
          },
          //选择设备
          selectDevice() {
            this.allList = false;
            this.cityDown = false;
            this.deviceDown = true;
            this.productDown = false;
            this.city = '西安';
            this.product = '选择商品';
            this.device = '全部售货柜';
          },
          //点击切换设备列表
          changeDistrict(index) {
            this.showDeviceList = this.allDeviceListArray[index].devicelist;
            for(let i = 0; i < this.allDeviceListArray.length; i++) {
              this.allDeviceListArray[i].show = false;
            }
            this.allDeviceListArray[index].show = true;
            this.device = '全部售货柜';
          },
          //列表选择机柜
          entryDevice(index) {
            if(this.showDeviceList[index].address == '全部售货柜') {
              this.device = this.showDeviceList[index].address;
              console.log(this.showDeviceList[index]);
              this.cityDown = false;
              this.deviceDown = false;
              this.productDown = false;
              this.allList = true;
            }else{
              this.device = this.showDeviceList[index].address;
              console.log(this.showDeviceList[index]);
              this.cityDown = false;
              this.deviceDown = false;
              this.productDown = true;
              this.allList = false;
              this.selectProductArray = [];
              this.selectProductArray = this.showDeviceList[index];
            }
          },
        }
    }
</script>

<style lang="less">
  .Expiration{
    width: 100vw;
    height: 100vh;
    background: #f1f1f1;
    .loading{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 20vh;
      text-align: center;
      height: 10vh;
      color: #65d172;
      border-radius: 10px;
      font-size: 2.388rem;
      .ivu-spin{
        width: 10vw;
        height: 10vw;
        margin: 0 auto;
      }
      .ivu-spin-dot{
        background: #65d172;
      }
    }
    .tipModal{
      background: rgba(0,0,0,.7);
      border-radius: 10px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      width: 29.2998rem;
      height: 10rem;
      z-index: 99;
      color: #fff;
      text-align: center;
      font-size: 2.0677rem;
      padding: 3vh 0;
    }
    .login_top{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      width: 100vw;
      background: #65d172;
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
    header{
      position: fixed;
      top: 5.997vh;
      left: 0;
      background: #65d172;
      color: #ffffff;
      height: 7.3718vh;
      z-index: 99;
      ul{
        list-style: none;
        overflow: hidden;
        li{
          float: left;
          font-size: 2.3988rem;
          padding: 2.098vh 0 1.874vh 0;
          text-align: center;
          &:nth-of-type(1) {
            width: 23.2vw;
          }
          /*&:nth-of-type(2), &:nth-of-type(3){*/
          /*width: 38.4vw;*/
          /*}*/
          &:nth-of-type(2){
            width: 71.8vw;
            margin-left: 5vw;
            text-align: center;
          }
          span:nth-of-type(2){
            display: inline-block;
            width: 5.333vw;
            height: 2.773vh;
            /*vertical-align: middle;*/
          }
          .selectInput{
            display: inline-block;
            width: 50%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .down{
    background: url('../../static/images/down.png') no-repeat center center;
    background-size: cover;
    transition: all 0.1s ease-out;
  }
  .up{
    background: url("../../static/images/up.png") no-repeat center center;
    background-size: cover;
    transition: all 0.1s ease-out;
  }
  .normal{
    background: #f4f2f2;
    color: #373737;
  }
  .special{
    background: #ffffff;
    color: #65d172;
  }
</style>
