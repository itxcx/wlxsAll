<template>
    <div class="SalesRecord">
      <header>
        <section class="login_top">
          <span @click="goPersonal">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>销售记录</p>
        </section>
        <section class="datePickSelect">
          <span class="dateRange" v-model="dateRangeText">{{dateRangeText}}</span>
          <span class="timeValue" @click="selectDateTime">
            <time>{{startDate}} / {{endDate}}</time>
            <Icon type="ios-arrow-down" v-show="!datePickerShow"></Icon>
            <Icon type="ios-arrow-up" v-show="datePickerShow"></Icon>
          </span>
          <section class="datePickerContent" v-show="datePickerShow">
            <section class="contentModal">
              <p>
                <span @click="computeDate" :class="{'special': today , '': !today}">今日</span>
                <span @click="computeDate" :class="{'special': weekday , '': !weekday}">本周</span>
                <span @click="computeDate" :class="{'special': month , '': !month}">本月</span>
              </p>
              <p>
                <span @click="computeDate" :class="{'special': yestoday , '': !yestoday}">昨日</span>
                <span @click="computeDate" :class="{'special': lastWeek , '': !lastWeek}">上周</span>
                <span @click="computeDate" :class="{'special': lastMonth , '': !lastMonth}">上月</span>
              </p>
            </section>
            <section class="handleSelectDate">
              <p>
                <DatePicker type="date" placeholder="开始日期" v-model="start"></DatePicker>
              </p>
              <p>
                <DatePicker type="date" placeholder="结束日期" v-model="end"></DatePicker>
              </p>
              <span @click="dateSelectSubmit">确定</span>
            </section>
          </section>
        </section>
      </header>
      <section class="saleSelectList">
        <ul>
          <li v-model="city" @click="citySelect">
            <span v-html="city" class="selectInput"></span>
            <span :class="cityDown ? 'up' : 'down'"></span>
          </li>
          <li v-model="address" @click="addressSelect">
            <span v-html="address" class="selectInput"></span>
            <span :class="addressDown ? 'up' : 'down'"></span>
          </li>
          <li v-model="device" @click="deviceSelect">
            <span v-html="device" class="selectInput"></span>
            <span :class="deviceDown ? 'up' : 'down'"></span>
          </li>
        </ul>
      </section>
      <!-- 销售记录列表 -->
      <section class="allSale" v-show="allSaleDown">
        <!--<scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">-->
        <!--<scroller class="scroller" :on-infinite="infinite" ref="my_scroller">-->
        <loadmore :bottomMethod="getMoreSalesData" class="scroller">
          <ul>
            <li v-for="(item, index) in allSale">
              <section class="saleListAddr">
                <span></span>
                <span>{{item.address}}</span>
              </section>
              <section class="saleGoods">
                <span>销售商品:</span>
                <span v-for="items in item.goods">{{items.goods_name}}x{{items.goods_count}}</span>
              </section>
              <section class="saleTime">
                <span>销售时间:</span>
                <span>{{item.order_time}}</span>
              </section>
            </li>
          </ul>
          <p class="ctrlTipTxt">{{ctrlTipTxt}}</p>
        </loadmore>
        <!--</scroller>-->

      </section>
      <!-- 地址列表 -->
      <section class="addressList" v-show="addressDown">
        <ul>
          <li v-for="item in addressList" @click="addressEntry">{{item}}</li>
        </ul>
      </section>
      <!-- 设备列表 -->
      <section class="deviceList" v-show="deviceDown">
        <ul>
          <li v-for="(item, index) in selectDeviceArray" @click="deviceEntry(index)">{{item.address}}</li>
        </ul>
      </section>
      <transition name="bounce" appear>
        <section class="tipModal" v-if="tipStatus">
          <p>{{tipText}}</p>
        </section>
      </transition>
      <!-- 加载中提示框 -->
      <section class="loading" v-show="loadingModal">
        <Spin size="large"></Spin>
        <p>数据获取中...</p>
      </section>
    </div>
</template>

<script>
    export default {
        name: "SalesRecord",
        data() {
            return {
              dateRangeText: '今日', //选择的时间阶段
              startDate: '',
              endDate: '',
              datePickerShow: false,
              start: '',
              end: '',
              today: true,
              weekday: false,
              month: false,
              yestoday: false,
              lastWeek: false,
              lastMonth: false,
              city: '西安',
              address: '场地',
              device: '售货柜',
              cityDown: false, //城市列表显示
              addressDown: false, //地址列表显示
              deviceDown: false, //设备列表显示
              tipStatus: false, //提示框
              tipText: '其他城市暂未开放',
              addressList: ["全部地址"],
              deviceList: [{"device_id": '',
                "address": "全部设备"
              }], //设备列表
              selectDeviceArray: [{"device_id": '',
                "address": "全部设备"
              }],//选定地址后的设备列表
              allSale: [],
              allSaleDown: true,
              device_id: '',
              ctrlTipTxt: '',
              page: 1,
              loadingModal: false,
            }
        },
        mounted() {
          this.$nextTick(() => {
            let date = new Date();
            this.startDate = this.Common.formatDate(date, "yyyy-MM-dd");
            this.endDate = this.Common.formatDate(date, "yyyy-MM-dd");
            this.getSalesData(this.startDate, this.endDate, '', '', 0);
            this.getDeviceListData();
          })
        },
        methods: {
          // refresh(done) {
          //   this.page = 0;
          //   setTimeout(() => {
          //     this.getSalesData(this.startDate, this.endDate, this.device_id, this.address, 0);
          //     done();
          //   }, 1000)
          //   setTimeout(() => {
          //     console.log('refresh sesize')
          //     this.$refs.my_scroller.resize();
          //   },3000)
          // },
          // infinite(done) {
          //   console.log(this.page);
          //   setTimeout(() => {
          //     if(this.ctrlTipTxt == '上滑加载更多...') {
          //       this.getMoreSalesData(this.startDate, this.endDate, this.device_id, this.address, this.page);
          //       done()
          //     }
          //   }, 2000)
          //   setTimeout(() => {
          //     console.log('infinite sesize')
          //     this.$refs.my_scroller.resize();
          //   },3000)
          // },
          //返回
          goPersonal() {
            this.$router.push({
              path: '/personal'
            })
          },
          //选择时间按钮
          selectDateTime() {
            this.datePickerShow = !this.datePickerShow;
          },
          //获得某月的天数
          getMonthDays(nowYear,myMonth) {
            let monthStartDate = new Date(nowYear, myMonth, 1);
            let monthEndDate = new Date(nowYear, myMonth + 1, 1);
            let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
          },
          //日期计算
          computeDate(e) {
            let dateName = e.target.innerHTML;
            this.dateRangeText = dateName;
            let date = new Date();
            let nowDayOfWeek = date.getDay(); //今天本周的第几天
            let nowDay = date.getDate(); //当前日
            let nowMonth = date.getMonth(); //当前月
            let nowYear = date.getFullYear(); //当前年

            let lastMonthDate = new Date(); //上月日期
            lastMonthDate.setDate(1);
            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
            let lastMonth = lastMonthDate.getMonth();
            //设置显示日期格式
            switch(dateName) {
              case '今日':
                this.startDate = this.Common.formatDate(date, "yyyy-MM-dd");
                this.endDate = this.Common.formatDate(date, "yyyy-MM-dd");
                this.today = true;
                this.weekday = false;
                this.month = false;
                this.yestoday = false;
                this.lastWeek = false;
                this.lastMonth = false;
                break;
              case '昨日':
                let day = new Date();
                day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
                this.startDate = this.Common.formatDate(day, "yyyy-MM-dd");
                this.endDate = this.Common.formatDate(day, "yyyy-MM-dd");
                this.today = false;
                this.weekday = false;
                this.month = false;
                this.yestoday = true;
                this.lastWeek = false;
                this.lastMonth = false;
                break;
              case '本周':
                let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
                this.startDate = this.Common.formatDate(weekStartDate, "yyyy-MM-dd");
                this.endDate = this.Common.formatDate(date, "yyyy-MM-dd");
                this.today = false;
                this.weekday = true;
                this.month = false;
                this.yestoday = false;
                this.lastWeek = false;
                this.lastMonth = false;
                break;
              case '上周':
                let lastWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
                let lastWeekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
                this.startDate = this.Common.formatDate(lastWeekStartDate, "yyyy-MM-dd");
                this.endDate = this.Common.formatDate(lastWeekEndDate, "yyyy-MM-dd");
                this.today = false;
                this.weekday = false;
                this.month = false;
                this.yestoday = false;
                this.lastWeek = true;
                this.lastMonth = false;
                break;
              case '本月':
                let monthStartDate = new Date(nowYear, nowMonth, 1);
                this.startDate = this.Common.formatDate(monthStartDate, "yyyy-MM-dd");
                this.endDate = this.Common.formatDate(date, "yyyy-MM-dd");
                this.today = false;
                this.weekday = false;
                this.month = true;
                this.yestoday = false;
                this.lastWeek = false;
                this.lastMonth = false;
                break;
              case '上月':
                let lastMonthStartDate = new Date(nowYear, lastMonth, 1);
                let lastMonthEndDate = new Date(nowYear, lastMonth, this.getMonthDays(nowYear,lastMonth));
                this.startDate = this.Common.formatDate(lastMonthStartDate, "yyyy-MM-dd");
                this.endDate = this.Common.formatDate(lastMonthEndDate, "yyyy-MM-dd");
                this.today = false;
                this.weekday = false;
                this.month = false;
                this.yestoday = false;
                this.lastWeek = false;
                this.lastMonth = true;
                break;
            }
            this.datePickerShow = false;
            this.page = 1;
            this.getSalesData(this.startDate, this.endDate, this.device_id, this.address, 0);
          },
          //选择后的日期
          dateSelectSubmit() {
            if(this.start && this.end) {
              this.startDate = this.Common.formatDate(this.start, "yyyy-MM-dd");
              this.endDate = this.Common.formatDate(this.end, "yyyy-MM-dd");
            }else if(!this.start && this.end) {
              this.startDate = '';
              this.endDate = this.Common.formatDate(this.end, "yyyy-MM-dd");
            }else if(this.start && !this.end) {
              this.startDate = this.Common.formatDate(this.start, "yyyy-MM-dd");
              this.endDate = '';
            }else{
              this.startDate = '';
              this.endDate = '';
            }
            this.datePickerShow = false;
            this.dateRangeText = '';
            this.page = 1;
            this.getSalesData(this.startDate, this.endDate, this.device_id, this.address, 0);
          },
          //获取更多数据方法
          getMoreSalesData() {
            let area_name = '';
            if(this.address == '场地') {
              area_name = '';
            }
            if(this.ctrlTipTxt == '上划加载更多...') {
              this.$ajax({
                url: `http://merchant.test.weilaixiansen.com/login/selllist?date1=${this.startDate}&date2=${this.endDate}&device_id=${this.device_id}&area_name=${area_name}&page=${this.page}`,
                method: 'GET'
              }).then((res) => {
                if(res.data.code == 0) {
                  this.page++;
                  let data = res.data.data;
                  this.ctrlTipTxt = '上划加载更多...';
                  if(data.length == 0) {
                    this.ctrlTipTxt = '没有更多数据';
                  }
                  this.allSale = this.allSale.concat(data);
                }else if(res.data.code == 3) {
                  this.$router.push({
                    path: '/'
                  })
                }
              }).catch((error) => {
                console.log(error);
              })
            }

          },
          //销售记录数据获取
          getSalesData(date1 = '', date2 = '', device_id = '', area_name = '', page = 0) {
            //参数 ： page 页数     date1     date2  起止时间
            //device_id  设备编号    area_name 分区名称
            this.allSale = [];
            this.ctrlTipTxt = '';
            this.loadingModal = true;
            if(area_name == '场地') {
              area_name = '';
            }
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/selllist?date1=${date1}&date2=${date2}&device_id=${device_id}&area_name=${area_name}&page=${page}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.loadingModal = false;
                let data = res.data.data;
                this.allSale = data;
                this.ctrlTipTxt = '上划加载更多...';
                if(this.allSale.length == 0) {
                  this.ctrlTipTxt = '没有更多数据';
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
          //点击选择城市
          citySelect() {
            this.tipStatus = true;
            let timer = setTimeout(() => {
              this.tipStatus = false;
              clearTimeout(timer);
            }, 1000)
          },
          //选择地址
          addressSelect() {
            this.addressDown = true;
            this.allSaleDown = false;
            this.deviceDown = false;
            this.device = '设备';
          },
          //选定地址
          addressEntry(e) {
            let address = e.target.innerHTML;
            this.address = address;
            this.addressDown = false;
            this.selectDeviceArray = [{"device_id": '',
              "address": "全部设备"
            }];
            if(address === '全部地址') {
              //获取全部地址的数据
              this.address = '场地';
              this.allSaleDown = true;
              this.getSalesData(this.startDate, this.endDate, '', '', 0);
            }else{
              //获取选定地址数据
              this.selectDeviceArray = this.selectDeviceArray.concat(JSON.parse(localStorage.getItem('addressInfo'))[address]);
              console.log(this.selectDeviceArray);
              this.allSaleDown = true;
              this.getSalesData(this.startDate, this.endDate, '', this.address, 0);
            }
          },
          //选择设备
          deviceSelect() {
            this.allSaleDown = false;
            this.deviceDown = true;
            this.addressDown = false;
            this.device = '设备';
            if(this.address == '场地') {
              this.selectDeviceArray = this.deviceList;
            }
          },
          //选定设备
          deviceEntry(index) {
            this.device_id = this.selectDeviceArray[index].device_id;
            this.deviceDown = false;
            this.addressDown = false;
            this.allSaleDown = true;
            this.device = this.selectDeviceArray[index].address;
            if(this.device === '全部设备') {
              this.device = '设备';
            }
            this.getSalesData(this.startDate, this.endDate, this.device_id, this.address, 0);

          },
          //请求地址
          getDeviceListData() {
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/deviceList`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                let data = res.data.data;
                // let data = {
                //   "": [{
                //     "device_id": 6101130013,
                //     "address": "新增魔盒柜子"
                //   }],
                //   "锦业路1号都市之门B座": [{
                //     "device_id": 6101130010,
                //     "address": "都市之门B座1层"
                //   }, {
                //     "device_id": 6101130011,
                //     "address": "都市之门B座1层"
                //   }],
                //   "锦业路69号瞪羚谷E座1层": [{
                //     "device_id": 6101130004,
                //     "address": "瞪羚谷E座1层"
                //   }, {
                //     "device_id": 6101130005,
                //     "address": "瞪羚谷E座1层"
                //   }],
                //   "高新一路创新大厦": [{
                //     "device_id": 6101130002,
                //     "address": "创新大厦1层"
                //   }],
                //   "arealist": ["", "锦业路1号都市之门B座", "锦业路69号瞪羚谷E座1层", "高新一路创新大厦"]
                // }
                localStorage.setItem('addressInfo', JSON.stringify(data));
                this.addressList = this.addressList.concat(data.arealist);
                console.log(this.addressList)
                for(let i = 0; i < data.arealist.length; i++) {
                  this.deviceList = this.deviceList.concat(data[data.arealist[i]]);
                }
                console.log(this.deviceList);
              }else if(res.data.code == 3) {
                this.$router.push({
                  path: '/'
                })
              }
            }).catch((error) => {
              console.log(error);
            })
          },
        }
    }
</script>

<style lang="less">
  .SalesRecord{
    /*width: 100vw;*/
    /*height: 100vh;*/
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
      font-size: 2.6677rem;
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
      .login_top{
        background: #65d172;
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
      .datePickSelect{
        background: #65d172;
        text-align: center;
        font-size: 2.2488rem;
        color: #fff;
        padding: 1.1994vh 0;
        position: relative;
        .timeValue{
          display: inline-block;
          padding: 0 2vw;
          border: 1px solid #fff;
          border-radius: 15px;
          time{
            margin: 2vw;
          }
        }
        .datePickerContent{
          position: absolute;
          top: 6.5vh;
          left: 0;
          width: 100vw;
          background: rgba(0,0,0,.6);
          height: 90vh;
          z-index: 100;
          .contentModal{
            background: #fff;
            p{
              margin: 0 3.5vw;
              display: flex;
              justify-content: space-between;
              color: #373737;
              span{
                display: inline-block;
                margin: 1.0494vh 2vw;
                flex-wrap: wrap;
                width: 30vw;
                height: 4.8725vh;
                line-height: 4.8725vh;
                background: #F2F2F2;
                border-radius: 2px;
                font-size: 2.2488rem;
              }
              .special{
                background: #65d172;
                color: #fff;
              }
              &:nth-of-type(1) {
                border-top: 1px solid #e5e5e5;
              }
            }
          }
          .handleSelectDate{
            background: #fff;
            border-top: 1px solid #e5e5e5;
            padding: 0 3.5vw;
            display: flex;
            justify-content: space-around;
            overflow: hidden;
            >span{
              display: inline-block;
              border: 1px solid #65d172;
              width: 20vw;
              color: #65d172;
              font-size: 2.2488rem;
              height: 4.4977vh;
              line-height: 4.4977vh;
              border-radius: 4px;
              margin-top: 2.0488vh;
            }
          }
        }
      }
    }
    .saleSelectList{
      background: #65d172;
      color: #fff;
      margin-top: 12vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 80;
      ul{
        list-style: none;
        overflow: hidden;
        border-top: 1px solid #46bb54;
        li{
          float: left;
          font-size: 2.3988rem;
          padding: 2.098vh 0 1.874vh 0;
          text-align: center;
          &:nth-of-type(1) {
            width: 22vw;
          }
          &:nth-of-type(2), &:nth-of-type(3) {
            width: 39vw;
            /*margin-left: 5vw;*/
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
            width: 70%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .allSale{
      height: 100vh;
      padding-top: 20vh;
      overflow-y: auto;
      -webkit-overflow-scrolling : touch;
      .ctrlTipTxt{
        text-align: center;
        padding: 1vh 0;
        font-weight: bold;
        font-size: 1.924rem;
        width: 100vw;
      }
      .scroller{
        position: relative;
        ul{
          /*height: 79vh;*/
          background: #f1f1f1;
          li{
            background: #fff;
            margin-bottom: 1.499vh;
            padding: 0 5.33vw;
            .saleListAddr{
              padding: 2.2488vh 0;
              font-size: 2.098rem;
              color: #6e6e6e;
              border-bottom: 1px solid #e5e5e5;
              span:nth-of-type(1) {
                display: inline-block;
                width: 3.333vw;
                height: 2.823vh;
                background: url(../../static/images/xiaoshoujilu.png) no-repeat center center;
                background-size: cover;
                vertical-align: middle;
                margin-right: 10px;
              }
            }
            .saleGoods, .saleTime{
              padding-top: 2.2488vh;
              span:nth-of-type(1) {
                color: #999898;
                font-size: 2.2488rem;
              }
              span:nth-of-type(2) {
                color: #373737;
                font-size: 2.2488rem;
                display: inline-block;
                margin-left: 2.933vw;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                vertical-align: top;
              }
            }
            .saleGoods {
              span {
                color: #373737;
                font-size: 2.2488rem;
                margin-left: 2.933vw;
                /*overflow: hidden;*/
                /*text-overflow:ellipsis;*/
                /*white-space: nowrap;*/
                vertical-align: top;
              }
              span:nth-of-type(1) {
                color: #999898;
                font-size: 2.2488rem;
                margin: 0;
              }
            }
            .saleTime{
              padding-bottom: 2.2488vh;
            }
          }
        }
      }

    }
    .addressList, .deviceList{
      padding-top: 20vh;
      ul{
        height: 79vh;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
        margin: 0 5.333vw;
        li{
          padding: 2.2488vh 0;
          border-bottom: 1px solid #e5e5e5;
          font-size: 2.2488rem;
          color: #373737;
        }
      }
    }
    .ivu-input-icon{
      display: none;
    }
    .ivu-date-picker{
      width: 20vw;
    }
    .ivu-input{
      display: inline-block;
      width: 25.334vw;
      height: 4.5725vh;
      line-height: 4.5725vh;
      padding: 4px 7px;
      font-size: 10px;
      border-radius: 4px;
      background-color: #F2F2F2;
      background-image: none;
      position: relative;
      color: #0e0e0e;
      cursor: text;
      &::placeholder{
        color: #0e0e0e;
        text-align: center;
      }
    }
    .ivu-date-picker-cells-cell{
      color: #65d172;
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
    ._v-container[data-v-ecaca2b0]{
      margin-top: 17vh;
      /*height: 83% !important;*/
    }
    .loading-layer{
      display: none;
    }
  }


</style>
