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
            <span :class="!cityDown ? 'down' : 'up'"></span>
          </li>
          <li v-model="address">
            <span v-html="address" class="selectInput"></span>
            <span :class="!addressDown ? 'down' : 'up'"></span>
          </li>
          <li v-model="device">
            <span v-html="device" class="selectInput"></span>
            <span :class="!deviceDown ? 'down' : 'up'"></span>
          </li>
        </ul>
      </section>
      <transition name="bounce" appear>
        <section class="tipModal" v-if="tipStatus">
          <p>{{tipText}}</p>
        </section>
      </transition>
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
              tipText: '其他城市暂未开放'
            }
        },
        mounted() {
          this.$nextTick(() => {
            let date = new Date();
            this.startDate = this.Common.formatDate(date, "yyyy-MM-dd");
            this.endDate = this.Common.formatDate(date, "yyyy-MM-dd");
          })
        },
        methods: {
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
            //this.getSalesData(this.startDate, this.endDate);
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
            //this.getSalesData(this.startDate, this.endDate);
          },
          //销售记录数据获取
          getSalesData() {
            this.$ajax({
              url: ``,
              method: 'GET'
            }).then((res) => {

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
          }
        }
    }
</script>

<style lang="less">
  .SalesRecord{
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
      margin-top: 12.1vh;
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
            width: 33.2vw;
          }
          &:nth-of-type(2), &:nth-of-type(3) {
            width: 33.3vw;
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
</style>
