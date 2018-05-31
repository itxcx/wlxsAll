<template>
    <div class="SaleRoom">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>销售报表</p>
        </section>
        <section class="datePickSelect">
          <span class="dateRange" v-model="dateRangeText">{{dateRangeText}}</span>
          <span class="timeValue" @click="selectDateTime">
            <time>{{startDate}} - {{endDate}}</time>
            <Icon type="ios-arrow-down" v-show="!datePickerShow"></Icon>
            <Icon type="ios-arrow-up" v-show="datePickerShow"></Icon>
          </span>
          <section class="datePickerContent" v-show="datePickerShow">
            <section class="contentModal">
              <p>
                <span>今日</span>
                <span>昨日</span>
                <span>上周</span>
                <span>本周</span>
                <span>上月</span>
                <span>本月</span>
              </p>
            </section>
          </section>
        </section>
      </header>

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
            }
        },
        mounted() {
          this.$nextTick(() => {
            let date = new Date();
            this.startDate = this.Common.formatDate(date, "yyyy.MM.dd");
            this.endDate = this.Common.formatDate(date, "yyyy.MM.dd");
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
          }
        }
    }
</script>

<style lang="less">
  @header_background: #66D172;
  .SaleRoom{
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
        font-size: 1.4992rem;
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
          top: 4.5vh;
          left: 0;
          width: 100vw;
          background: rgba(0,0,0,.6);
          height: 90vh;
          .contentModal{
            background: #fff;
            p{
              margin: 0 3.5vw;
              display: flex;
              justify-content: space-around;
              color: #373737;
              span{
                display: inline-block;
                margin: 1.0494vh 5vw;
                flex-wrap: wrap;
                width: 20vw;
                height: 2.9985vh;
                line-height: 2.9985vh;
                background: #F2F2F2;
                border-radius: 2px;
              }
              &:nth-of-type(1) {
                border-top: 1px solid #e5e5e5;
              }
            }
          }
        }
      }
   }
  }
</style>
