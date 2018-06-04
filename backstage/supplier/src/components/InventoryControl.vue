<template>
    <div class="InventoryControl">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>{{pageTitle}}数量</p>
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
      <section class="InventoryControlMsg">
        <p>{{pageTitle}}数量</p>
        <p class="inventoryControl">{{inventoryControl}}</p>
        <div class="totalCount">
          <dl>
            <dt>智能售货柜</dt>
            <dd>{{volume}}</dd>
          </dl>
          <dl>
            <dt>商品品类</dt>
            <dd>{{numberCount}}</dd>
          </dl>
        </div>
      </section>
    </div>
</template>

<script>
  export default {
    name: "SaleRoom",
    data() {
      return {
        dateRangeText: '今日', //选择的时间阶段
        startDate: '',
        endDate: '',
        datePickerShow: false,
        start: '',
        end: '',
        inventoryControl: '', //上下货数量
        volume: '', //售货柜数量
        numberCount: '', //商品种类
        today: true,
        weekday: false,
        month: false,
        yestoday: false,
        lastWeek: false,
        lastMonth: false,
        pageTitle: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        let type = this.$route.query.type;
        if(type == 0) {
          this.pageTitle = '上货';
        }else{
          this.pageTitle = '下货';
        }
        let date = new Date();
        this.startDate = this.Common.formatDate(date, "yyyy-MM-dd");
        this.endDate = this.Common.formatDate(date, "yyyy-MM-dd");
        this.getInventoryControlData(this.startDate, this.endDate, type);
      })
    },
    methods: {
      goBack() {
        this.$router.push({
          path: '/statement'
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
        this.getSaleroomData(this.startDate, this.endDate);
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
        this.getSaleroomData(this.startDate, this.endDate);
      },
      //当前时间销售额
      getInventoryControlData(startTime, endTime, type) {
        this.$ajax({
          url: `http://merchant.test.weilaixiansen.com/Merstats/m3and4?stime=${startTime}&etime=${endTime}&is_unload=${type}`,
          method: 'GET'
        }).then((res) => {
          if(res.data.code == 0) {//返回数据成功
            let inventoryControlData = res.data.data;
            this.inventoryControl = inventoryControlData.total_money;
            this.volume = saleData.order_num;
            this.numberCount = saleData.goods_total;
          }else if(res.data.code == -1) {//没有数据
            this.inventoryControl = 0;
            this.volume = 0;
            this.numberCount = 0;
          }else if(res.data.code == 1) {//未登录
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
  @header_background: #66D172;
  .InventoryControl{
    header{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 98;
      .login_top{
        background: @header_background;
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
        text-align: center;
        font-size: 2.2488rem;
        color: #65d172;
        padding: 1.1994vh 0;
        position: relative;
        .timeValue{
          display: inline-block;
          padding: 0 2vw;
          border: 1px solid #65d172;
          border-radius: 10px;
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
    .InventoryControlMsg{
      font-family: "PingFang SC";
      width: 92vw;
      height: 29.985vh;
      margin: 13.5vh 4vw 0 4vw;
      box-shadow: -1px 1px 15px 5px #e1e1e1;
      border-radius: 4px;
      p:nth-of-type(1) {
        padding-top: 5.0975vh;
        font-size: 2.248rem;
        text-align: center;
      }
      p:nth-of-type(2) {
        font-size: 6.2218vh;
        text-align: center;
      }
      .totalCount{
        margin-top: 2.6235vh;
        height: 5.397vh;
        dl{
          width: 44.333vw;
          float: left;
          text-align: center;
          &:nth-last-of-type(1) {
            border-left: 2px solid #e5e5e5;
          }
          dt{
            font-size: 2.098rem;
          }
          dd{
            font-size: 3.1484rem;
            font-weight: bold;
          }
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
  }
</style>
