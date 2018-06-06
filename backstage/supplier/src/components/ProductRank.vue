<template>
    <div class="ProductRank">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>商品排行</p>
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
      <section class="rankMsg">
        <ul class="rankMsgHeader">
          <li>序号</li>
          <li>名称</li>
          <li>销售数量</li>
          <li>销售金额</li>
        </ul>
        <ul class="rankItemList">
          <li v-for="(item, index) in productRank" @click="rankList(index)">
            <span>{{index + 1}}</span>
            <span>{{item.goods_name}}</span>
            <span>{{item.goods_num}}</span>
            <span>{{item.sellmoney}}</span>
            <span></span>
          </li>
        </ul>
      </section>
      <section class="rankItemMsg" v-show="rankItemMsg">
        <section>
          <h3>{{goods_name}}销售明细</h3>
          <ul class="rankItemMsgHeader">
            <li>序号</li>
            <li>售货柜</li>
            <li>数量</li>
            <li>金额</li>
          </ul>
          <ul class="rankItemMsgList">
            <li v-for="(item, index) in rankListData">
              <span>{{index + 1}}</span>
              <span>{{item.device_address}}</span>
              <span>{{item.goods_num}}</span>
              <span>{{item.sellmoney}}</span>
            </li>
          </ul>
          <ul class="rankItemTotal">
            <li>
              <span>总计</span>
              <span>/</span>
              <span>{{goods_number}}</span>
              <span>{{sellmoney}}</span>
            </li>
          </ul>
        </section>
        <p @click="closeRankList">关闭</p>
      </section>
    </div>
</template>

<script>
    export default {
        name: "ProductRank",
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
          productRank: [], //商品
          rankListData: [], //商品详情
          rankItemMsg: false,//显示详情
          goods_name: '',//查看商品名称
          goods_number: '',
          sellmoney: ''

        }
      },
      mounted() {
        this.$nextTick(() => {
          let date = new Date();
          this.startDate = this.Common.formatDate(date, "yyyy-MM-dd");
          this.endDate = this.Common.formatDate(date, "yyyy-MM-dd");
          this.getProductRankData(this.startDate, this.endDate);
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
          this.getProductRankData(this.startDate, this.endDate);
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
          this.getProductRankData(this.startDate, this.endDate);
        },
        //当前时间销售额
        getProductRankData(startTime, endTime) {
          startTime = startTime + ' 00:00:00';
          endTime = endTime + ' 23:59:59';
          this.productRank = [];
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/Merstats/m3_1?stime=${startTime}&etime=${endTime}`,
            method: 'GET'
          }).then((res) => {
            if(res.data.code == 0) {//返回数据成功
              this.productRank = res.data.data;
              // this.deviceRank = [
              //   {
              //   "sellmoney": "360.00",
              //   "device_address": "瞪羚谷A座",
              //   "order_id": "A2DASDASDD",
              //   "device_id": 1001001,
              //   "order_num": 1
              // }, {
              //   "sellmoney": "235.00",
              //   "device_address": "中国银行E",
              //   "order_id": "65165454",
              //   "device_id": 6101131125,
              //   "order_num": 1
              // }, {
              //   "sellmoney": "180.00",
              //   "device_address": "瞪羚谷E座sfdsafdsafsaf",
              //   "order_id": "A00124525362",
              //   "device_id": 1001002,
              //   "order_num": 1
              // }, {
              //   "sellmoney": 110,
              //   "device_address": "都市之门",
              //   "order_id": "51564",
              //   "device_id": 6101130010,
              //   "order_num": 3
              // }, {
              //   "sellmoney": "20.00",
              //   "device_address": "招商银行E",
              //   "order_id": "201255",
              //   "device_id": 6101130013,
              //   "order_num": 1
              // }]
            }else if(res.data.code == -1) {//没有数据

            }else if(res.data.code == 1) {//未登录
              this.$router.push({
                path: '/'
              })
            }
          }).catch((error) => {
            console.log(error);
          })
        },
        //查看详情
        rankList(index) {
          let goods_id = this.productRank[index].goods_id;
          this.goods_name = this.productRank[index].goods_name;
          this.getRankListData(this.startDate, this.endDate, goods_id);
        },
        //详情数据
        getRankListData(startDate, endDate, goods_id) {
          startDate = startDate + ' 00:00:00';
          endDate = endDate + ' 23:59:59';
          this.rankListData = [];
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/Merstats/m3_1_1?stime=${startDate}&etime=${endDate}&goods_id=${goods_id}`,
            method: 'GET'
          }).then((res) => {
            if(res.data.code == 0) {
              this.goods_number = res.data.total.goods_num;
              this.sellmoney = res.data.total.sellmoney;
              this.rankItemMsg = true;
              this.rankListData = res.data.data;
              // this.rankListData =  [
              //   {
              //   "goods_name": "果3代",
              //   "goods_num": 1,
              //   "sellmoney": "100.00"
              // }, {
              //   "goods_name": "果2代",
              //   "goods_num": 2,
              //   "sellmoney": "10.00"
              // }, {
              //   "goods_name": "合计",
              //   "goods_num": 3,
              //   "sellmoney": 110
              // }]
            }else if(res.data.code == 1) {//未登录
              this.$router.push({
                path: '/'
              })
            }
          }).catch((error) => {
            console.log(error);
          })
        },
        //关闭
        closeRankList() {
          this.rankItemMsg = false;
        }
      }
    }
</script>

<style lang="less">
  @header_background: #66D172;
  .ProductRank{
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
    .rankMsg{
      margin: 13.5vh 0 0 0;
      box-shadow: 0 -5px 1px 1px #f2f2f2;
      .rankMsgHeader{
        overflow: hidden;
        padding: 1.4992vh 2vw;
        border-bottom: 1px solid #e5e5e5;
        li{
          float: left;
          color: #7b7b7b;
          font-size: 2.2488rem;
          &:nth-of-type(1) {
            width: 10%;
          }
          &:nth-of-type(2) {
            width: 40%;
          }
          &:nth-of-type(3) {
            width: 25%;
          }
          &:nth-of-type(4) {
            width: 25%;
          }
        }
      }
      .rankItemList{
        li{
          padding: 2.2488vh 0;
          &:nth-of-type(even) {
            background: #f7f7f7;
          }
          span{
            display: inline-block;
            vertical-align: middle;
            &:nth-of-type(1) {
              width: 10%;
              font-size: 1.649rem;
              font-weight: 600;
              text-align: center;
            }
            &:nth-of-type(2) {
              width: 39%;
              font-size: 2.2488rem;
              color: #373737;
              font-weight: 600;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              padding: 0 3vw 0 1vw;
            }
            &:nth-of-type(3) {
              width: 22%;
              font-size: 1.874rem;
              text-align: left;
            }
            &:nth-of-type(4){
              width: 18%;
              font-size: 1.874rem;
              text-align: left;
            }
            &:nth-of-type(5) {
              width: 3.066vw;
              height: 2.323vh;
              background: url(../../static/images/next.png) no-repeat center center;
              background-size: cover;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .rankItemMsg{
      background: rgba(0,0,0,.7);
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999;
      padding: 9.745vh 3.467vw;
      section{
        background: #fff;
        border-radius: 5px;
        padding: 3.3733vh 6.667vw;
        h3{
          font-size: 2.998rem;
          text-align: center;
        }
        .rankItemMsgHeader{
          overflow: hidden;
          padding: 1.4992vh 2vw;
          border-bottom: 1px solid #e5e5e5;
          li{
            float: left;
            color: #7b7b7b;
            font-size: 2.2488rem;
            &:nth-of-type(1) {
              width: 15%;
            }
            &:nth-of-type(2) {
              width: 40%;
            }
            &:nth-of-type(3), &:nth-of-type(4) {
              width: 22.5%;
            }
          }
        }
        .rankItemMsgList{
          height: 42vh;
          overflow-y: auto;
          -webkit-overflow-scrolling : touch;
          li{
            padding: 2.2488vh 0;
            border-bottom: 1px solid #e5e5e5;
            span{
              display: inline-block;
              vertical-align: middle;
              &:nth-of-type(1) {
                width: 10%;
                font-size: 1.649rem;
                font-weight: 600;
                text-align: center;
              }
              &:nth-of-type(2) {
                width: 39%;
                font-size: 2.2488rem;
                color: #373737;
                font-weight: 600;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                padding: 0 3vw 0 3vw;
              }
              &:nth-of-type(3) {
                width: 22%;
                font-size: 1.874rem;
                text-align: center;
              }
              &:nth-of-type(4){
                width: 18%;
                font-size: 1.874rem;
                text-align: center;
              }
              &:nth-of-type(5) {
                width: 3.066vw;
                height: 2.323vh;
                background: url(../../static/images/next.png) no-repeat center center;
                background-size: cover;
                vertical-align: middle;
              }
            }
          }
        }
        .rankItemTotal{
          li{
            padding: 2.2488vh 0;
            span{
              display: inline-block;
              vertical-align: middle;
              &:nth-of-type(1) {
                width: 10%;
                font-size: 1.649rem;
                font-weight: 600;
                text-align: center;
              }
              &:nth-of-type(2) {
                width: 39%;
                font-size: 2.2488rem;
                color: #373737;
                font-weight: 600;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                padding: 0 3vw 0 3vw;
              }
              &:nth-of-type(3) {
                width: 22%;
                font-size: 1.874rem;
                text-align: center;
              }
              &:nth-of-type(4){
                width: 18%;
                font-size: 1.874rem;
                text-align: center;
              }
              /*&:nth-of-type(5) {*/
                /*width: 3.066vw;*/
                /*height: 2.323vh;*/
                /*background: url(../../static/images/next.png) no-repeat center center;*/
                /*background-size: cover;*/
                /*vertical-align: middle;*/
              /*}*/
            }
          }
        }
      }
      p{
        width: 79.2vw;
        height: 10.419vh;
        background: url("../../static/images/button_bg.png") no-repeat center center;
        background-size: cover;
        color: #fff;
        font-size: 2.3988rem;
        margin: 6.371vh auto;
        text-align: center;
        line-height: 7.419vh;
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
