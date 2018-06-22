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
      <p class="countTime">仅统计保质期剩余<span>3天</span>内的商品</p>
      <section class="expirationContent">
        <!-- 设备列表 -->
        <section v-show="deviceDown" class="deviceList">
          <aside class="left">
            <ul>
              <li v-for="(item, index) in allDeviceListArray" @click="changeDistrict(index)" :class="item.show ? 'special' : 'normal'">
                {{item.district}}
              </li>
            </ul>
          </aside>
          <aside class="right">
            <ul>
              <li v-for="(item, index) in showDeviceList">
                <p @click="entryDevice(index)">{{item.address}}</p>
                <p>
                  <span></span>
                  <span>{{item.area_name}}</span>
                </p>
                <!--<p>距当前定位地址5千米</p>-->
              </li>
            </ul>
          </aside>
        </section>
        <!--商品列表-->
        <section v-show="allList" class="productList">
          <ul>
            <li class="expItemList" v-for="item in itemListArray">
              <dl class="itemInfo">
                <dt></dt>
                <dd>{{item.goods_name}}</dd>
              </dl>
              <section class="itemExp">
                <p><span>过期时间:</span><span>{{item.date}}</span></p>
                <p>{{item.address}}</p>
                <p></p>
              </section>
              <dl class="itemExpTime">
                <dt>
                  <span>{{item.time}}</span>
                  <span>小时</span>
                </dt>
                <dd>剩余保质期</dd>
              </dl>
            </li>
          </ul>
        </section>
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
              device_id: '',
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
            this.getDeviceArray();
            this.getExpirationData(this.device_id);
            //初始化方法 显示全部设备
            this.showDeviceList = this.allDeviceListArray[0].devicelist;
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
          //获取柜子列表方法
          getDeviceArray() {
            this.$ajax({
              url: 'http://merchant.test.weilaixiansen.com/login/goodsList',
              method: 'GET'
            }).then((res) => {
               if(res.data.code == 0) {
                 let deviceData = res.data.data;
                 for(let i = 0; i < deviceData.length; i++) {
                   for(let j = 0; j < deviceData[i].devicelist.length; j++) {
                     this.allDeviceListArray[0].devicelist.push(deviceData[i].devicelist[j]);
                   }
                 }
                 for(let i = 0; i < deviceData.length; i++) {
                   let obj = {
                     "district": deviceData[i].address,
                     "show": false,
                     "devicelist": deviceData[i].devicelist
                   }
                   this.allDeviceListArray.push(obj);
                 }
               }
            }).catch((error) => {
              console.log(error);
            })
          },
          //获取保质期商品数据
          getExpirationData(device_id) {
            this.itemListArray = [];
            // this.$ajax({
            //   url: `http://merchant.test.weilaixiansen.com/login/expirationGoods?device_id=${device_id}`,
            //   method: 'GET'
            // }).then((res) => {
            //   if(res.data.code == 0) {
            //     this.itemListArray = res.data.data;

                this.itemListArray = [
                  {
                  "address": "创新大厦1层左柜（XALG0001）",
                  "goods_name": "古都华天咖喱鸡肉盖饭",
                  "date": "2018-06-21 23:59:59",
                  "time": 0,
                  "goods_id": 10001632
                }, {
                  "address": "创新大厦1层左柜（XALG0001）",
                  "goods_name": "古都华天农家小炒肉盖饭",
                  "date": "2018-06-21 23:59:59",
                  "time": 0,
                  "goods_id": 10001633
                }, {
                  "address": "瞪羚谷E座1层左柜（XALG0003）",
                  "goods_name": "古都华天酱辣鸭脖",
                  "date": "2018-06-25 23:59:59",
                  "time": 95,
                  "goods_id": 10001635
                }, {
                  "address": "中投国际B座9楼银联商务左柜（XALG0007）",
                  "goods_name": "古都华天卤水鱼豆腐",
                  "date": "2018-06-25 23:59:59",
                  "time": 95,
                  "goods_id": 10001640
                }, {
                  "address": "创新大厦1层左柜（XALG0001）",
                  "goods_name": "古都华天排包",
                  "date": "2018-06-23 23:59:59",
                  "time": 47,
                  "goods_id": 10001667
                }, {
                  "address": "创新大厦1层左柜（XALG0001）",
                  "goods_name": "古都华天魔法棒面包",
                  "date": "2018-06-23 23:59:59",
                  "time": 47,
                  "goods_id": 10001668
                }, {
                  "address": "创新大厦1层左柜（XALG0001）",
                  "goods_name": "古都华天萝卜包",
                  "date": "2018-06-23 23:59:59",
                  "time": 47,
                  "goods_id": 10001718
                }, {
                  "address": "创新大厦1层左柜（XALG0001）",
                  "goods_name": "古都华天果仁包",
                  "date": "2018-06-23 23:59:59",
                  "time": 47,
                  "goods_id": 10001719
                }, {
                  "address": "创新大厦1层左柜（XALG0001）",
                  "goods_name": "古都华天黄金乳酪包",
                  "date": "2018-06-23 23:59:59",
                  "time": 47,
                  "goods_id": 10001720
                }, {
                  "address": "瞪羚谷E座1层左柜（XALG0003）",
                  "goods_name": "古都华天酸梅汤(瓶装)",
                  "date": "2018-06-21 23:59:59",
                  "time": 0,
                  "goods_id": 10001736
                }, {
                  "address": "新增魔盒柜子",
                  "goods_name": "蒙牛冠益乳250g",
                  "date": "2018-06-27 23:59:59",
                  "time": 143,
                  "goods_id": 10001741
                }, {
                  "address": "新增魔盒柜子",
                  "goods_name": "蒙牛冠益乳450g",
                  "date": "2018-06-30 23:59:59",
                  "time": 215,
                  "goods_id": 10001742
                }]


            //   }
            // }).catch((error) => {
            //   console.log(error);
            // })
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
              //console.log(this.showDeviceList[index]);
              this.cityDown = false;
              this.deviceDown = false;
              this.productDown = false;
              this.device_id = '';
              this.allList = true;
            }else{
              this.device = this.showDeviceList[index].address;
              //console.log(this.showDeviceList[index]);
              this.cityDown = false;
              this.deviceDown = false;
              this.productDown = true;
              this.allList = false;
              this.device_id = this.showDeviceList[index].device_id;
              this.selectProductArray = [];
              this.selectProductArray = this.showDeviceList[index];
            }
            this.getExpirationData(this.device_id);
          },
        }
    }
</script>

<style lang="less">
  .Expiration{
    width: 100vw;
    height: 100vh;
    background: #f1f1f1;
    padding-top: 20.3688vh;
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
    .countTime{
      position: fixed;
      top: 13.3688vh;
      width: 100vw;
      padding: 2.2488vh 4vw;
      background: #fff;
      font-size: 2.098rem;
      color: #9f9f9f;
      span{
        color: #fa882c;
      }
    }
    .expirationContent{
      background: #f1f1f1;
      margin-top: 1.499vh;
      .deviceList{
        background: #fff;
        height: 86.6312vh;
        overflow: hidden;
        .left{
          width: 27.4466vw;
          float: left;
          font-size: 2.2488rem;
          ul{
            height: 79vh;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
            li{
              padding: 2.2398vh 0;
              text-align: center;
            }
          }

        }
        .right{
          width: 72.5534vw;
          float: right;
          ul{
            height: 79vh;
            overflow-y: auto;
            -webkit-overflow-scrolling : touch;
            li{
              font-size: 2.2488rem;
              color: #373737;
              padding: 0 4vw;
              border-bottom: 1px solid #e5e5e5;
              p:nth-of-type(1) {
                padding: 2.6236vh 0 1.874vh 0;
              }
              p:nth-of-type(2) {
                font-size: 1.949rem;
                color: #999898;
                padding-bottom: 2vh;
                span:nth-of-type(1){
                  display: inline-block;
                  width: 3.733vw;
                  height: 2.548vh;
                  background: url("../../static/images/location_icon.png") no-repeat center center;
                  background-size: cover;
                  vertical-align: bottom;
                }
              }
              /*p:nth-of-type(3) {*/
              /*font-size: 1.799rem;*/
              /*color: #939393;*/
              /*padding: 2.6236vh 0;*/
              /*}*/
            }
          }
        }
      }
      .productList{
        ul{
          .expItemList{
            display: flex;
            justify-content: space-around;
            background: #fff;
            padding: 1.499vh 4vw;
            margin-bottom: 1.499vh;
            .itemInfo{
              width: 18.667%;
              font-size: 2.098rem;
              dt{
                width: 16vw;
                height: 16vw;
                background: url(../../static/images/wlxs_logo.png) no-repeat center center;
                background-size: cover;
              }
            }
            .itemExp{
              width: 60%;
              p{
                font-size: 2.098rem;
                &:nth-of-type(1) {
                  color: #2b2b2b;
                  margin: 2.098vh 0;
                }
                &:nth-of-type(2) {
                  font-size: 1.949rem;
                  color: #9f9f9f;
                }
              }
            }
            .itemExpTime{
              width: 20%;
              margin-top: 2.698vh;
              dt{
                color: #fa882c;
                span:nth-of-type(1) {
                  font-size: 3.748rem;
                }
                span:nth-of-type(2) {
                  font-size: 2.2488rem;
                }
              }
              dd{
                font-size: 1.799rem;
                color: #9f9f9f;
              }
            }
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
