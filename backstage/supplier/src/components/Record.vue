<template>
    <div class="Record">
      <header>
        <section class="login_top">上下架记录</section>
        <section class="selectDate">
          <DatePicker type="daterange" size="small" split-panels placeholder="选择查询日期" @on-change="dateSelect"></DatePicker>
        </section>
      </header>
      <section class="selectHeader">
        <ul>
          <li v-model="city">
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
          <li v-model="action">
            <!--<span v-html="action"></span>-->
            <!--<span :class="!actionDown ? 'down' : 'up'"></span>-->
            <select name="action" id="action" @click="selectAction" @change="clickAction">
              <option value="上下货">上下货</option>
              <option value="上货">上货</option>
              <option value="下货">下货</option>
            </select>
            <span :class="!actionTypeSelect ? 'down' : 'up'"></span>
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
      <!--上下架-->
      <section class="action" v-show="actionDown">
        <ul>
          <li v-for="(item, index) in recordList">
            <p class="recordListInfo">
              <span>{{item.address}}</span>
              <span>{{item.is_unload ? '下货' : '上货'}}</span>
            </p>
            <p class="recordAddr">
              <span>上架地点:</span>
              <span>{{item.address}}</span>
            </p>
            <p class="recordTime">
              <span>上架时间:</span>
              <span>{{item.created_time}}</span></p>
            <p class="recordMsg">
              <span>上架商品: </span>
              <span>见详情</span>
            </p>
            <p class="showOrderInfo">
              <span @click="clickAction(index)">查看详情</span>
            </p>
          </li>
        </ul>
      </section>
    </div>
</template>

<script>
    export default {
        name: "Record",
        data() {
            return {
              city: '西安',
              address: '地址',
              device: '售货柜',
              action: '上下架',//操作
              actionType: '上下架',
              cityDown: false,
              addressDown: false,
              deviceDown: false,
              actionDown: true,
              actionTypeSelect: false,
              date1: '',
              date2: '',
              actionValue: '',
              device_id: '',
              addressList: [], //地址列表
              deviceList: [],//选择了地址后的设备列表
              allDeviceList: [], //没有选择地址
              // recordList: [
              //   {
              //   "order_id": "20180517190512650301",
              //   "is_unload": 1,
              //   "created_time": "2018-05-17 19:05:30",
              //   "address": "E座左侧04"
              // }, {
              //   "order_id": "20180517190423634901",
              //   "is_unload": 0,
              //   "created_time": "2018-05-17 19:04:41",
              //   "address": "E座左侧04"
              // }, {
              //   "order_id": "20180517190343732801",
              //   "is_unload": 1,
              //   "created_time": "2018-05-17 19:04:04",
              //   "address": "E座左侧04"
              // }, {
              //   "order_id": "20180517190259340501",
              //   "is_unload": 0,
              //   "created_time": "2018-05-17 19:03:12",
              //   "address": "E座左侧04"
              // }, {
              //   "order_id": "20180517190216125801",
              //   "is_unload": 1,
              //   "created_time": "2018-05-17 19:02:37",
              //   "address": "E座左侧04"
              // }],//上下架记录数据
              recordList: []
            }
        },
        mounted() {
          this.$nextTick(() => {
            this.getOrderListData();
          })
        },
        methods: {
          //选择查询时间
          dateSelect(e) {
            this.date1 = e[0];
            this.date2 = e[1];
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
                if(this.address === '地址') {
                  for(let i = 0; i < addressData.arealist.length; i++) {
                    for(let j = 0; j < addressData[addressData.arealist[i]].length; j++){
                      this.deviceList.push(addressData[addressData.arealist[i]][j]);
                    }
                  }
                }else{
                  this.deviceList = addressData[this.address];
                }
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
            this.address = '地址';
            this.device = '售货柜';
            this.action = '上下架';
          },
          //选择地址
          clickAddress(e) {
            this.address = e.target.innerHTML;
            this.addressDown = false;
            this.deviceDown = true;
            this.actionDown = false;
            let addressData = JSON.parse(localStorage.getItem('addressData'));
            this.deviceList = addressData[this.address];

          },
          //展示设备
          selectDevice() {
            this.deviceList = [];
            this.deviceDown = true;
            this.addressDown = false;
            this.actionDown = false;
            this.device = '售货柜';
            this.getDeviceListData();
          },
          //选择设备
          clickDevice(index) {
            this.device = this.deviceList[index].address;
            this.device_id = this.deviceList[index].device_id;
            //localStorage.setItem('device_id', device_id);
            this.deviceDown = false;
            this.addressDown = false;
            this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0);
            this.actionDown = true;
          },
          //展示方式
          selectAction() {
            this.actionTypeSelect = !this.actionTypeSelect;
          },
          //选择方式
          clickAction(e) {
            this.actionTypeSelect = !this.actionTypeSelect;
            let typeAction = e.target.value;
            if(typeAction === '上货') {
              this.actionValue = 0;
            }else if(typeAction === '下货'){
              this.actionValue = 1;
            }else{
              this.actionValue = '';
            }
            this.getOrderListData(this.date1, this.date2, this.actionValue, this.device_id, 0);
          }
        }
    }
</script>

<style lang="less">
  @header_background: #66D172;
    .Record{
      background: #f1f1f1;
      header{
        background: @header_background;
        .login_top{
          width: 100vw;
          height: 5.997vh;
          font-size: 2.398rem;
          line-height: 5.997vh;
          text-align: center;
          color: #fff;
          font-weight: 500;
        }
        .selectDate{
          width: 47.7333vw;
          margin: 0 auto;
        }
      }
      .selectHeader{
        background: #66D172;
        color: #fff;
        border-top: 1px solid #46bb54;
        ul{
          list-style: none;
          overflow: hidden;
          li{
            float: left;
            font-size: 2.3988rem;
            padding: 2.098vh 0 1.874vh 0;
            text-align: center;
            select{
              -webkit-appearance: none;
              background: #65d172;
              color: #fff;
              outline: none;
              border: medium;
            }
            &:nth-of-type(4){
              position: relative;
              span{
                position: absolute;
                top: 2.373vh;
                right: -6vw;
                width: 5.333vw;
                height: 2.773vh;
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
      .addressList, .deviceList{
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
              span:nth-of-type(1) {
                color: #999898;
              }
              span:nth-of-type(2) {
                color: #373737;
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
      font-size: 1.724rem;
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
    width: 6.412vw;
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
  }
  .ivu-input-small{
    padding: 0;
  }
  .ivu-date-picker-with-range .ivu-picker-panel-content{
    width: 50vw;
  }
  .ivu-date-picker-cells-header span {
    display: inline-block;
    width: 5.87vw;
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
</style>
