<template>
    <div class="RecordMsg">
      <header>
        <span @click="goBackRecord"><Icon type="chevron-left"></Icon></span>
        <p>明细</p>
      </header>
      <section class="recordMsg_content">
        <section>
          <p>{{action ? '下货明细' : '上货明细'}}</p>
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
    </div>
</template>

<script>
    export default {
        name: "RecordMsg",
        data() {
            return {
              recordMsg: {},
              modalToggle: false, //标签列表查看显示
              labelInfo: {},
              action: '',
            }
        },
        mounted() {
          this.$nextTick(() => {
            this.action = this.$route.query.action;
            this.recordMsg = JSON.parse(localStorage.getItem('recordMsg'));
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
            this.$router.back(-1);
          }
        }
    }
</script>

<style lang="less">
  @header_background: #66D172;
  @page_background: #ffffff;
  .RecordMsg{
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
      z-index: 9;
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
      }
    }
  }
</style>
