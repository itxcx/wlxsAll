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
        <loadmore :bottomMethod="getMore">
          <ul>
            <li v-for="(item, index) in recordList">
              <p class="recordListInfo">
                <span>{{item.address.search('E') != -1 ? '瞪羚谷E座': ''}}</span>
                <span>{{item.is_unload ? '下货' : '上货'}}</span>
              </p>
              <p class="recordAddr">
                <span>售货柜:</span>
                <span>{{item.address}}</span>
              </p>
              <p class="recordTime">
                <span>上货时间:</span>
                <span>{{item.created_time}}</span>
              </p>
              <p class="recordMsg">
                <span>上货商品:</span>
                <span>见详情</span>
              </p>
              <p class="showOrderInfo">
                <span @click="showOrderInfo(index)">查看详情</span>
              </p>
            </li>
          </ul>
          <p class="getMore">{{ctrlTipTitle}}</p>
        </loadmore>
        <!--</Scroll>-->
      </section>
      <section class="tipModal" v-show="tipStatus">
        <p>{{tipText}}</p>
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
              ctrlTipTitle: '上滑加载更多...',
              addressList: [], //地址列表
              deviceList: [],//选择了地址后的设备列表
              allDeviceList: [], //没有选择地址
              recordList: [],
              actionList: false,
              canGetDevice: true,
            }
        },
        mounted() {
          this.$nextTick(() => {
            this.getOrderListData();
          })
        },
        methods: {
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
              this.page++;
              this.getMoreData(this.date1, this.date2, this.actionValue, this.device_id, this.page);
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
          getMoreData(date1 = '', date2 = '', action = '', device_id = '', page = 1) {
            // alert(`${date1}--${date2}--${action}--${device_id}--${page}`);
            this.canGetData = false;
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/updownlist?date1=${date1}&date2=${date2}&action=${action}&device_id=${device_id}&page=${page}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.recordList = this.recordList.concat(res.data.data);
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
          getOrderListData(date1 = '', date2 = '', action = '', device_id = '', page = 0) {
            // alert(`${date1}--${date2}--${action}--${device_id}--${page}`);
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/updownlist?date1=${date1}&date2=${date2}&action=${action}&device_id=${device_id}&page=${page}`,
              method: 'GET'
            }).then((res) => {
                if(res.data.code == 0) {
                  this.recordList = res.data.data;
                  if(this.recordList.length === 0) {
                    this.ctrlTipTitle = '暂时没有数据...';
                  }else if(this.recordList.length < 5) {
                    this.ctrlTipTitle = '没有更多数据...';
                  }
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
              this.ctrlTipTitle = '上滑加载更多...';
              this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0);
            }else{
              this.addressDown = false;
              this.deviceDown = false;
              this.actionDown = true;
              this.actionList = false;
              this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0);
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
            this.ctrlTipTitle = '上滑加载更多...';
            this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0);
          },
          //展示方式
          selectAction() {
            // this.actionTypeSelect = !this.actionTypeSelect;
            this.actionList = !this.actionList;
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
            this.ctrlTipTitle = '上滑加载更多...';
            this.canGetData = true;
            this.page = 0;
            this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0);
          },
          //查看详情
          showOrderInfo(index) {
            let order_id = this.recordList[index].order_id;
            let action = this.recordList[index].is_unload;
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/closeDetailbyOrderId?action=${action}&order_id=${order_id}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                let data = res.data.data;
                let recordMsg = JSON.stringify(data);
                localStorage.setItem('recordMsg', recordMsg);
                this.$router.push({
                  path: '/recordMsg',
                  query: {action: action}
                })
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
      width: 100vw;
      height: 100vh;
      padding-top: 13.5vh;
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
    width: 5.412vw;
    height: 2.098vh;
    cursor: pointer;
  }
  .ivu-date-picker-cells {
    width: 50vw;
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
    width: 50vw;
  }
  .ivu-date-picker-cells-header span {
    display: inline-block;
    width: 4.87vw;
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
