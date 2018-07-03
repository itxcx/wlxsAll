<template>
    <div class="Record">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>上下货记录</p>
        </section>
        <!--<section class="selectDate">-->
          <!--<DatePicker type="daterange" size="small" split-panels placeholder="选择查询日期" @on-change="dateSelect"></DatePicker>-->
        <!--</section>-->
      </header>
      <section class="selectHeader">
        <ul>
          <li v-model="city" @click="selectCity">
            <span v-html="city"></span>
            <span :class="!cityDown ? 'down' : 'up'"></span>
          </li>
          <li v-model="address" @click="selectAddress">
            <span v-html="address"></span>
            <span :class="!addressDown ? 'down' : 'up'"></span>
          </li>
          <li v-model="device" @click="selectDevice">
            <span v-html="device"></span>
            <span :class="!deviceDown ? 'down' : 'up'"></span>
          </li>
          <li v-model="action" @click="selectAction">
            <span v-html="action"></span>
            <span :class="!actionList ? 'down' : 'up'"></span>
            <!--<select name="action" id="action" @click="selectAction" @change="clickAction">-->
              <!--<option value="上下货">上下货</option>-->
              <!--<option value="上货">上货</option>-->
              <!--<option value="下货">下货</option>-->
            <!--</select>-->
            <!--<span :class="!actionTypeSelect ? 'down' : 'up'"></span>-->
          </li>
        </ul>
      </section>
      <!--地址-->
      <section class="addressList" v-show="addressDown">
        <ul>
          <li v-for="item in addressList" @click="clickAddress">{{item}}</li>
        </ul>
      </section>
      <!--设备列表-->
      <section class="deviceList" v-show="deviceDown">
        <ul>
          <li v-for="(item, index) in deviceList" @click="clickDevice(index)">{{item.address}}</li>
        </ul>
      </section>
      <!-- 上下货列表显示 -->
      <section class="actionList" v-show="actionList">
        <ul>
          <li @click="clickAction">上下货</li>
          <li @click="clickAction">上货</li>
          <li @click="clickAction">下货</li>
        </ul>
      </section>
      <!--上下架-->
      <section class="action" v-show="actionDown">
        <!--<Scroll class="Scroll" height="83vh" :on-reach-bottom="handleReachBottom">-->
        <!--<loadmore :bottomMethod="getMore">-->
          <ul>
            <li v-for="(item, index) in recordList">
              <p class="recordListInfo">
                <!--<span>{{item.address.search('E') != -1 ? '瞪羚谷E座': ''}}</span>-->
                <span>{{item.callName}}</span>
                <span>{{item.is_unload ? '下货' : '上货'}}</span>
              </p>
              <p class="recordAddr">
                <span>售货柜:</span>
                <span>{{item.address}}</span>
              </p>
              <p class="recordTime">
                <span>{{item.is_unload ? '下货' : '上货'}}时间:</span>
                <span>{{item.created_time}}</span>
              </p>
              <p class="recordMsg">
                <span>{{item.is_unload ? '下货' : '上货'}}商品:</span>
                <span>见详情</span>
              </p>
              <p class="showOrderInfo">
                <span @click="showOrderInfo(index)">查看详情</span>
              </p>
            </li>
          </ul>
          <p class="getMore" @click="getMore">{{ctrlTipTitle}}</p>
        <!--</loadmore>-->
        <!--</Scroll>-->
      </section>
      <!-- 详情 -->
      <div class="RecordMsg" v-show="RecodeMsg">
        <header>
        <span @click="goBackRecord">
          <Icon type="chevron-left"></Icon>
        </span>
          <p>明细</p>
        </header>
        <section class="recordMsg_content">
          <section>
            <p>{{actionMsg ? '下货明细' : '上货明细'}}</p>
          </section>
          <ul class="headerList">
            <li>序号</li>
            <li>商品名称</li>
            <li>数量</li>
            <li>编号</li>
          </ul>
          <ul class="checkItemList">
            <li v-for="(item, index) in recordMsg.goods">
              <span>{{index + 1}}</span>
              <span>{{item.goods_name}}</span>
              <span>{{item.goods_count}}</span>
              <span @click="showLabel(index)">查看</span>
            </li>
          </ul>
        </section>
        <transition name="fade">
          <section class="labelModal" v-show="modalToggle">
            <section class="labelContent">
              <p>{{labelInfo.goods_name}}-标签标号</p>
              <div class="labelList">
                <ul>
                  <li v-for="label in labelInfo.tags">{{label}}</li>
                </ul>
              </div>
            </section>
            <section class="closeBtn" @click="closeBtn">关闭</section>
          </section>
        </transition>
      </div>
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
        name: "Record",
        data() {
            return {
              city: '西安',
              address: '所有地址',
              device: '所有售货柜',
              action: '上下货',//操作
              actionType: '上下货',
              cityDown: false,
              addressDown: false,
              deviceDown: false,
              actionDown: true,
              actionTypeSelect: false,
              tipStatus: false,//错误提示框显示控制
              tipText: '',//提示框内容
              date1: '',
              date2: '',
              actionValue: '',
              device_id: '',
              canGetData: true,
              page: 0,
              ctrlTipTitle: '',
              addressList: [], //地址列表
              deviceList: [],//选择了地址后的设备列表
              allDeviceList: [], //没有选择地址
              recordList: [],
              actionList: false,
              canGetDevice: true,
              loadingModal: false,
              area_name: '',
              recordMsg: {},
              modalToggle: false, //标签列表查看显示
              labelInfo: {},
              actionMsg: '',
              RecodeMsg: false
            }
        },
        mounted() {
          this.$nextTick(() => {
            if(this.address == '所有地址') {
              this.area_name = '';
            }else{
              this.area_name = this.address;
            }
            this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0, this.area_name);
          })
        },
        methods: {
          //查看标签
          showLabel(index) {
            this.modalToggle = true;
            this.labelInfo = this.recordMsg.goods[index];
          },
          //关闭显示框
          closeBtn() {
            this.modalToggle = false;
          },
          //返回
          goBackRecord() {
            // this.$router.back(-1);
            this.RecodeMsg = false;
          },
          //点击城市
          selectCity() {
            this.tipStatus = true;
            this.tipText = '其他城市暂未开放...';
            setTimeout(() => {
              this.tipStatus = false;
            },2000)
          },
          //获取更多数据方法
          getMore() {
            if(this.canGetData) {
              if(this.address == '所有地址') {
                this.area_name = '';
              }else{
                this.area_name = this.address;
              }
              this.page++;
              this.getMoreData(this.date1, this.date2, this.actionValue, this.device_id, this.page, this.area_name);
            }
          },
          goBack() {
            this.$router.push({
              path: '/personal'
            })
          },
          //选择查询时间
          dateSelect(e) {
            this.date1 = e[0];
            this.date2 = e[1];
          },
          getMoreData(date1 = '', date2 = '', action = '', device_id = '', page = 1, area_name) {
            // alert(`${date1}--${date2}--${action}--${device_id}--${page}`);
            this.canGetData = false;
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/updownlist?date1=${date1}&date2=${date2}&action=${action}&device_id=${device_id}&page=${page}&area_name=${area_name}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.recordList = this.recordList.concat(res.data.data);
                for(let i = 0; i < this.recordList.length; i++) {
                  if(this.recordList[i].address.search('E座') !== -1) {
                    this.recordList[i].callName = '瞪羚谷E座';
                  }else if(this.recordList[i].address.search('招商银行') !== -1) {
                    this.recordList[i].callName = '雁塔区招商银行';
                  }else if(this.recordList[i].address.search('都市') !== -1) {
                    this.recordList[i].callName = '都市之门B座';
                  }else if(this.recordList[i].address.search('创新大厦') !== -1) {
                    this.recordList[i].callName = '高新一路创新大厦';
                  }else if(this.recordList[i].address.search('数字') !== -1) {
                    this.recordList[i].callName = '国家数字出版基地';
                  }else if(this.recordList[i].address.search('魔盒') !== -1) {
                    this.recordList[i].callName = '魔盒';
                  }else if(this.recordList[i].address.search('中投') !== -1) {
                    this.recordList[i].callName = '中投国际';
                  }
                }
                this.canGetData = true;
                if(res.data.data.length < 5) {
                  this.ctrlTipTitle = '没有更多数据...';
                }
              }
            }).catch((error) => {
              console.log(error);
            })
          },
          //请求上下架列表方法
          getOrderListData(date1 = '', date2 = '', action = '', device_id = '', page = 0, area_name) {
            // alert(`${date1}--${date2}--${action}--${device_id}--${page}`);
            this.loadingModal = true;
            this.recordList = [];
            this.ctrlTipTitle = '';
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/updownlist?date1=${date1}&date2=${date2}&action=${action}&device_id=${device_id}&page=${page}&area_name=${area_name}`,
              method: 'GET'
            }).then((res) => {
                this.loadingModal = false;
                if(res.data.code == 0) {
                  this.recordList = res.data.data;
                  // this.ctrlTipTitle = '上划加载更多...';
                  this.ctrlTipTitle = '点击加载更多...';
                  for(let i = 0; i < this.recordList.length; i++) {
                    if(this.recordList[i].address.search('E座') !== -1) {
                      this.recordList[i].callName = '瞪羚谷E座';
                    }else if(this.recordList[i].address.search('招商银行') !== -1) {
                      this.recordList[i].callName = '雁塔区招商银行';
                    }else if(this.recordList[i].address.search('都市') !== -1) {
                      this.recordList[i].callName = '都市之门B座';
                    }else if(this.recordList[i].address.search('创新大厦') !== -1) {
                      this.recordList[i].callName = '高新一路创新大厦';
                    }else if(this.recordList[i].address.search('数字') !== -1) {
                      this.recordList[i].callName = '国家数字出版基地';
                    }else if(this.recordList[i].address.search('魔盒') !== -1) {
                      this.recordList[i].callName = '魔盒';
                    }else if(this.recordList[i].address.search('中投') !== -1) {
                      this.recordList[i].callName = '中投国际';
                    }
                  }
                  if(this.recordList.length === 0) {
                    this.ctrlTipTitle = '暂时没有数据...';
                  }else if(this.recordList.length < 5) {
                    this.ctrlTipTitle = '没有更多数据...';
                  }
                }else if(res.data.code == 3) {
                  this.$router.push({
                    path: '/'
                  })
                }
            }).catch((error) => {
              console.log(error);
            })
          },
          //请求地址数据方法
          getDeviceListData() {
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/deviceList`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                let addressData = JSON.stringify(res.data.data);
                localStorage.setItem('addressData', addressData);
                this.addressList = res.data.data.arealist;
                addressData = JSON.parse(addressData);
                if(this.address === '所有地址') {
                  for(let i = 0; i < addressData.arealist.length; i++) {
                    for(let j = 0; j < addressData[addressData.arealist[i]].length; j++){
                      this.deviceList.push(addressData[addressData.arealist[i]][j]);
                    }
                  }
                }else{
                  this.deviceList = addressData[this.address];
                }
                this.deviceList.unshift({"device_id": '', "address": "所有售货柜"});
                this.addressList.unshift('所有地址');
                this.canGetDevice = true;
              }else if(res.data.code == 3) {
                this.$router.push({
                  path: '/'
                })
              }
            }).catch((error) => {
              console.log(error);
            })
          },
          //展示地址
          selectAddress() {
            this.getDeviceListData();
            this.addressDown = true;
            this.deviceDown = false;
            this.actionDown = false;
            this.actionList = false;
            this.address = '所有地址';
            this.device = '所有售货柜';
            // this.action = '上下架';
          },
          //选择地址
          clickAddress(e) {
            this.address = e.target.innerHTML;
            if(this.address !== '所有地址') {
              this.addressDown = false;
              this.deviceDown = false;
              this.actionDown = true;
              this.actionList = false;
              let addressData = JSON.parse(localStorage.getItem('addressData'));
              this.deviceList = addressData[this.address];
              this.canGetData = true;
              this.page = 0;
              this.device_id = '';
              // this.ctrlTipTitle = '上滑加载更多...';
              this.ctrlTipTitle = '点击加载更多...';
              this.area_name = this.address;
              this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0, this.area_name);
            }else{
              this.addressDown = false;
              this.deviceDown = false;
              this.actionDown = true;
              this.actionList = false;
              this.area_name = '';
              this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0, this.area_name);
            }
          },
          //展示设备
          selectDevice() {
            this.deviceList = [];
            this.deviceDown = true;
            this.addressDown = false;
            this.actionDown = false;
            this.actionList = false;
            this.device = '所有售货柜';
            if(this.canGetDevice) {
              this.canGetDevice = false;
              this.getDeviceListData();
            }

          },
          //选择设备
          clickDevice(index) {
            this.device = this.deviceList[index].address;
            this.device_id = this.deviceList[index].device_id;
            //localStorage.setItem('device_id', device_id);
            this.deviceDown = false;
            this.addressDown = false;
            this.canGetData = true;
            this.page = 0;
            this.actionDown = true;
            this.actionList = false;
            this.ctrlTipTitle = '点击加载更多...';
            // this.ctrlTipTitle = '上滑加载更多...';
            if(this.address == '所有地址') {
              this.area_name = '';
            }else{
              this.area_name = this.address;
            }
            this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0 , this.area_name);
          },
          //展示方式
          selectAction() {
            // this.actionTypeSelect = !this.actionTypeSelect;
            // this.actionList = !this.actionList;
            this.actionList = true;
            this.actionDown = false;
            this.deviceDown = false;
            this.addressDown = false;
          },
          //选择方式-
          clickAction(e) {
            // this.actionTypeSelect = !this.actionTypeSelect;
            this.actionList = !this.actionList;
            this.actionDown = true;
            this.deviceDown = false;
            this.addressDown = false;
            let typeAction = e.target.innerHTML;
            this.action = typeAction;
            // alert(typeAction);
            if(typeAction === '上货') {
              this.actionValue = 0;
            }else if(typeAction === '下货') {
              this.actionValue = 1;
            }else{
              this.actionValue = '';
            }
            // this.ctrlTipTitle = '上滑加载更多...';
            this.ctrlTipTitle = '点击加载更多...';
            this.canGetData = true;
            this.page = 0;
            if(this.address == '所有地址') {
              this.area_name = '';
            }else{
              this.area_name = this.address;
            }
            this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0, this.area_name);
          },
          //查看详情
          showOrderInfo(index) {
            this.recordMsg = {};
            this.RecodeMsg = true;
            this.loadingModal = true;
            let order_id = this.recordList[index].order_id;
            let action = this.recordList[index].is_unload;
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/closeDetailbyOrderId?action=${action}&order_id=${order_id}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.loadingModal = false;
                let data = res.data.data;
                // let recordMsg = JSON.stringify(data);
                // localStorage.setItem('recordMsg', recordMsg);
                // this.$router.push({
                //   path: '/recordMsg',
                //   query: {action: action}
                // })
                this.recordMsg = data;
              }
            }).catch((error) => {
              console.log(error);
            })
          }
        }
    }
</script>

<style lang="less">
  @header_background: #66D172;
    .Record{
      .RecordMsg{
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 99;
        background: #fff;
        top: 0;
        left: 0;
        header{
          width: 100vw;
          background: @header_background;
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
        .recordMsg_content{
          section{
            background: #65d172;
            p{
              text-align: center;
              font-size: 2.2488rem;
              color: #fff;
              padding: 1.499vh 0;
            }
          }
          .headerList{
            border-bottom: 1px solid #e5e5e5;
            overflow: hidden;
            li{
              float: left;
              text-align: center;
              font-size: 2.2488rem;
              color: #7b7b7b;
              padding: 1.499vh 0;
              &:nth-of-type(1), &:nth-of-type(3) {
                width: 11%;
              }
              &:nth-of-type(2) {
                width: 50%;
              }
              &:nth-of-type(4) {
                width: 25%;
              }
            }
          }
          .checkItemList{
            li{
              span{
                text-align: center;
                font-size: 2.2488rem;
                display: inline-block;
                width: 21%;
                color: #373737;
                padding: 1.874vh 0;
                &:nth-of-type(1){
                  width: 10%;
                  font-weight: bold;
                }
                &:nth-of-type(3) {
                  width: 10%;
                }
                &:nth-of-type(2) {
                  width: 50%;
                  font-weight: bold;
                }
                &:nth-of-type(4) {
                  width: 16%;
                  border: 1px solid #65d172;
                  color: #65d172;
                  border-radius: 20px;
                  padding: 0;
                  margin-left: 5%;
                }
              }
              &:nth-of-type(even) {
                background: #f7f7f7;
              }
            }
          }
        }
        .labelModal{
          width: 100vw;
          height: 100vh;
          position: fixed;
          z-index: 999;
          background: rgba(0,0,0,.5);
          top: 0;
          left: 0;
          .labelContent{
            width: 90vw;
            height: 74.9625vh;
            background: #fff;
            border-radius: 10px;
            position: absolute;
            left: 4.666vw;
            bottom: 13.4178vh;
            p{
              height: 7.496vh;
              width: 100%;
              background: #65d172;
              color: #fff;
              font-size: 2.6986rem;
              font-weight: bold;
              text-align: center;
              line-height: 7.496vh;
              border-radius: 10px 10px 0 0;
            }
            .labelList{
              height: 66vh;
              overflow: auto;
              padding: 1.5vh 0;
              ul{
                li{
                  margin: 0 4vw;
                  padding: 0 1.333vw;
                  font-size: 2.3988rem;
                  color: #373737;
                  border-bottom: 1px solid #e5e5e5;
                  height: 7.4962vh;
                  line-height: 7.4962vh;
                }
              }
            }
          }
          .closeBtn{
            width: 79.2vw;
            height: 10.4198vh;
            background: url("../../static/images/button_bg.png") no-repeat center center;
            background-size: cover;
            text-align: center;
            font-size: 2.2488rem;
            color: #fff;
            line-height: 8.4198vh;
            position: absolute;
            bottom: 0;
            left: 10.4vw;
            transition: all 0.15s linear;
            &:active{
              opacity: 0.9;
              transform: scale(0.98);
            }
          }
        }
      }
      width: 100vw;
      height: 100vh;
      padding-top: 14.5vh;
      background: #f1f1f1;
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
        z-index: 999;
        .ivu-spin{
          width: 10vw;
          height: 10vw;
          margin: 0 auto;
        }
        .ivu-spin-dot{
          background: #65d172;
        }
      }
      header{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 98;
        background: @header_background;
        .login_top{
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
        .selectDate{
          width: 47.7333vw;
          margin: 0 auto;
        }
      }
      .selectHeader{
        position: fixed;
        top: 5.997vh;
        width: 100%;
        left: 0;
        background: #66D172;
        color: #fff;
        border-top: 1px solid #46bb54;
        z-index: 98;
        ul{
          list-style: none;
          overflow: hidden;
          li{
            float: left;
            font-size: 2.3988rem;
            padding: 2.098vh 0 1.874vh 0;
            text-align: center;
            /*select{*/
              /*-webkit-appearance: none;*/
              /*background: #65d172;*/
              /*color: #fff;*/
              /*outline: none;*/
              /*border: medium;*/
            /*}*/
            &:nth-of-type(4){
              width: 20vw;
              position: relative;
              span:nth-of-type(1){
                display: inline-block;
                width: 65%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                text-align: right;
              }
            }
            &:nth-of-type(1){
              width: 20vw;
              position: relative;
              span:nth-of-type(1) {
                display: inline-block;
                width: 65%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                text-align: right;
              }
            }
            &:nth-of-type(2), &:nth-of-type(3){
              width: 29vw;
              span:nth-of-type(1) {
                display: inline-block;
                width: 70%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                text-align: right;
              }
            }
            span:nth-of-type(2){
              display: inline-block;
              width: 5.333vw;
              height: 2.773vh;
              /*vertical-align: middle;*/
            }
          }

        }
      }
      .addressList, .deviceList, .actionList{
        background: #fff;
        ul{
          li{
            font-size: 2.2488rem;
            padding: 1.1244vh 3.333vw;
            border-bottom: 1px solid #e5e5e5;
          }
        }
      }
      .action{
        width: 100%;
        height: 85vh;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        ul{
          li{
            background: #fff;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 30px;
            .recordListInfo{
              font-size: 2.098rem;
              color: #747475;
              padding: 2.2488vh 3.333vw;
              border-bottom: 1px solid #e5e5e5;
              overflow: hidden;
              span{
                display: inline-block;
                &:nth-of-type(1) {
                  float: left;
                }
                &:nth-of-type(2) {
                  float: right;
                  color: #3ec04d;
                }
              }
            }
            .recordAddr, .recordTime, .recordMsg{
              font-size: 2.2488rem;
              padding: 1.1244vh 3.333vw;
              overflow: hidden;
              span:nth-of-type(1) {
                color: #999898;
                text-align: right;
                display: inline-block;
                width: 18%;
                float: left;
              }
              span:nth-of-type(2) {
                color: #373737;
                display: inline-block;
                width: 80%;
                padding-left: 2vw;
                float: left;
              }
            }
            .recordMsg{
              border-bottom: 1px solid #e5e5e5;
            }
            .showOrderInfo{
              overflow: hidden;
              padding: 1.874vh 3.333vw;
              span{
                display: inline-block;
                float: right;
                padding: 0.249vh 4vw;
                border: 1px solid #3ec04d;
                color: #3ec04d;
                border-radius: 20px;
                font-size: 2.098rem;
              }
            }
          }
        }
        .getMore{
          text-align: center;
          padding: 1vh 0;
          font-weight: bold;
          font-size: 1.924rem;
        }
      }
    }
  .ivu-date-picker{
    width: 100%;
    input{
      display: block;
      width: 47.7333vw;
      margin: 1.874vh auto;
      background: @header_background;
      border-radius: 20px;
      outline: none;
      font-size: 1.924rem;
      color: #fff;
      padding-left: 2vw;
      &::placeholder{
        color: #fff;
        text-align: center;
      }
    }
  }
  .ivu-select-dropdown{
    left: 0!important;
  }
  .ivu-date-picker-with-range .ivu-picker-panel-body {
   min-width: 100vw!important;
  }
  .ivu-picker-panel-body{
    width: 100vw!important;
  }
  .ivu-input-icon{
    right: 0.5333vw;
    bottom: 1.6995vh;
    color: #fff;
  }
  span.ivu-date-picker-cells-cell {
    width: 12.412vw!important;
    height: 2.098vh!important;
    cursor: pointer;
  }
  .ivu-date-picker-cells {
    width: 100%!important;
    margin: 0;
    white-space: normal;
  }
  .ivu-input-icon-normal+.ivu-input {
    padding-right: 0;
    box-shadow: none;
    -webkit-appearance: none;
  }
  .ivu-input-small{
    padding: 0;
  }
  .ivu-date-picker-with-range .ivu-picker-panel-content{
    width: 100%;
  }
  .ivu-date-picker-cells-header span {
    display: inline-block;
    width: 11.87vw!important;
    height: 4.098vh;
  }
  .ivu-date-picker-cells-cell{
    margin-left: 1px;
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
  .loadmore-hint, .loadmore-hint-bottom{
    text-align: center;
  }
</style>
