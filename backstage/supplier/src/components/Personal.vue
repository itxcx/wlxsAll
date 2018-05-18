<template>
    <div class="Personal">
      <header>
        <section class="noHeader"></section>
        <section class="bgPerSonal"></section>
        <section class="nickName"></section>
        <section class="userInfo">
          <p>{{nickName}}</p>
          <p>{{phone}}</p>
        </section>
        <section class="saleData">
          <dl>
            <dt>{{saleCount}}</dt>
            <dd>总销售额(元)</dd>
          </dl>
          <dl>
            <dt>{{saleNum}}</dt>
            <dd>售卖数量(个)</dd>
          </dl>
        </section>
      </header>
      <section class="userInfoList">
        <ul>
          <li>
            <span></span>
            <span class="itemTitle">销售记录</span>
            <span class="next"></span>
          </li>
          <li @click="goRecord">
            <span></span>
            <span class="itemTitle">配送记录</span>
            <span class="next"></span>
          </li>
          <li>
            <span></span>
            <span class="itemTitle">联系运营人员</span>
            <span class="next"></span>
          </li>
        </ul>
      </section>
      <Footer-bar></Footer-bar>
    </div>
</template>

<script>
  import FooterBar from './FooterBar';
    export default {
      name: "personal",
      data() {
          return {
            nickName: '古都华天',//用户名
            phone: '18295176350', //手机号
            saleCount: '23456', //销售总额
            saleNum: '11111',//销售数量
          }
      },
      components: {
        FooterBar
      },
      methods: {
        //上下架记录
        goRecord() {
          this.$router.push({
            path: '/record'
          })
        }
      }
    }
</script>

<style lang="less">
  .Personal{
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    header{
      position: relative;
      height: 32.984vh;
      .noHeader{
        height: 6.5967vh;
        background: #65d172;
      }
      .bgPerSonal{
        height: 25.8873vh;
        background: url("../../static/images/image_bg.jpg") no-repeat center center;
        background-size: cover;
      }
      .nickName{
        position: absolute;
        width: 19.2vw;
        height: 19.2vw;
        border-radius: 50%;
        border: 1px solid #65d172;
        top: 1.874vh;
        left: 40vw;
        z-index: 10;
        background: #fff;
      }
      .userInfo{
        width: 100%;
        position: absolute;
        top: 13.868vh;
        left: 0;
        text-align: center;
        p:nth-of-type(1){
          font-size: 2.398rem;
          color: #3d3e3d;
          font-weight: bold;
        }
        p:nth-of-type(2){
          font-size: 2.098rem;
          color: #717171;
        }
      }
      .saleData{
        position: absolute;
        top: 21.7391vh;
        left: 0;
        height: 6.74vh;
        dl{
          width: 49.333vw;
          float: left;
          text-align: center;
          &:nth-of-type(1) {
            border-right: 1px solid #e6e6e6;
          }
          dt{
            font-size: 3vh;
            color: #7f7f7f;
            font-weight: bold;
          }
          dd{
            font-size: 1.949vh;
            color: #989898;
          }
        }
      }
    }
    .userInfoList{
      margin: 0 4.66vw;
      ul{
        list-style: none;
        li{
          border-bottom: 1px solid #e5e5e5;
          height: 9.445vh;
          span{
            display: inline-block;
            float: left;
          }
          &:nth-of-type(1) span:nth-of-type(1) {
            display: inline-block;
            width: 6.666vw;
            height: 3.448vh;
            background: url(../../static/images/image_record.png) no-repeat center center;
            background-size: cover;
            margin-top: 3vh;
          }
          &:nth-of-type(2) span:nth-of-type(1) {
            display: inline-block;
            width: 6.666vw;
            height: 3.448vh;
            background: url(../../static/images/image_distribution.png) no-repeat center center;
            background-size: cover;
            margin-top: 3vh;
          }
          &:nth-of-type(3) span:nth-of-type(1) {
            display: inline-block;
            width: 6.666vw;
            height: 3.448vh;
            background: url(../../static/images/image_contact.png) no-repeat center center;
            background-size: cover;
            margin-top: 3vh;
          }
          .itemTitle{
            display: inline-block;
            font-size: 2.473rem;
            color: #5c5c5c;
            margin: 3vh 0 0 6vw;
          }
          .next{
            display: inline-block;
            width: 2.2667vw;
            height: 2.323vh;
            background: url("../../static/images/next.png") no-repeat center center;
            background-size: cover;
            float: right;
            margin: 3.561vh 1vw;
          }
        }
      }
    }
  }
</style>
