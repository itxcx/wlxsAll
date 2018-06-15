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
        <!--<section class="saleData">-->
          <!--<dl>-->
            <!--<dt>{{saleCount}}</dt>-->
            <!--<dd>总销售额(元)</dd>-->
          <!--</dl>-->
          <!--<dl>-->
            <!--<dt>{{saleNum}}</dt>-->
            <!--<dd>售卖数量(个)</dd>-->
          <!--</dl>-->
        <!--</section>-->
        <section class="changeUser">
          <span @click="changeUser">切换账号</span>
        </section>
      </header>
      <section class="userInfoList">
        <ul>
          <li @click="goSalesRecord">
            <span></span>
            <span class="itemTitle">销售记录</span>
            <span class="next"></span>
          </li>
          <li @click="goSettlement">
            <span></span>
            <span class="itemTitle">销售结算</span>
            <span class="next"></span>
          </li>
          <li @click="goMistake">
            <span></span>
            <span class="itemTitle">错拿记录</span>
            <span class="next"></span>
          </li>
          <li @click="goRecord">
            <span></span>
            <span class="itemTitle">上下货记录</span>
            <span class="next"></span>
          </li>
          <li>
            <span></span>
            <span class="itemTitle">
              <a href="tel:18291862150">联系运营人员</a>
            </span>
            <span class="next"></span>
          </li>
        </ul>
      </section>
      <!--<section class="tipModal" v-show="tipStatus">-->
        <!--<p>{{tipText}}</p>-->
      <!--</section>-->
      <Footer-bar></Footer-bar>
    </div>
</template>

<script>
  import FooterBar from './FooterBar';
    export default {
      name: "personal",
      data() {
          return {
            nickName: '未来鲜森',
            phone: '',
            saleCount: '0', //销售总额
            saleNum: '0',//销售数量
            tipStatus: false,
            tipText: '正在建设，马上开放...'
          }
      },
      mounted() {
        this.$nextTick(() => {
          this.phone = localStorage.getItem('phone'); //手机号
        })
      },
      components: {
        FooterBar
      },
      methods: {
        //切换账号
        changeUser() {
          localStorage.setItem('phone', '');
          localStorage.setItem('password', '');
          this.$router.push({
            path: '/'
          })
        },
        //上下架记录
        goRecord() {
          this.$router.push({
            path: '/record'
          })
        },
        //错拿记录
        goMistake() {
          this.$router.push({
            path: '/mistake'
          })
        },
        //销售结算
        goSettlement() {
          this.$router.push({
            path: '/settlement'
          })
        },
        // showModal() {
        //   this.tipStatus = true;
        //   this.tipText = '正在建设，马上开放...';
        //   setTimeout(() => {
        //     this.tipStatus = false;
        //   }, 2000)
        // },
        //销售记录
        goSalesRecord() {
          this.$router.push({
            path: '/salesRecord'
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
        top: 1.874vh;
        left: 40vw;
        border: 1px solid #ebeef5;
        z-index: 10;
        background: url("../../static/images/nickname.png") #fff no-repeat center center;
        background-size: cover;

      }
      .userInfo{
        width: 100%;
        position: absolute;
        top: 14.868vh;
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
      /*.saleData{*/
        /*position: absolute;*/
        /*top: 21.7391vh;*/
        /*left: 0;*/
        /*height: 6.74vh;*/
        /*dl{*/
          /*width: 49.333vw;*/
          /*float: left;*/
          /*text-align: center;*/
          /*&:nth-of-type(1) {*/
            /*border-right: 1px solid #e6e6e6;*/
          /*}*/
          /*dt{*/
            /*font-size: 3vh;*/
            /*color: #7f7f7f;*/
            /*font-weight: bold;*/
          /*}*/
          /*dd{*/
            /*font-size: 1.949vh;*/
            /*color: #989898;*/
          /*}*/
        /*}*/
      /*}*/
      .changeUser{
        position: absolute;
        top: 23.7391vh;
        left: 0;
        height: 6.74vh;
        text-align: center;
        width: 100%;
        font-size: 1.649rem;
        color: #65d172;
        span{
          display: inline-block;
          padding: 0.7496vh 4vw;
          border: 1px solid #65d172;
          border-radius: 20px;
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
          &:nth-of-type(2) span:nth-of-type(1){
            display: inline-block;
            width: 6.666vw;
            height: 3.448vh;
            background: url(../../static/images/image_xiaoshoujiesuan.png) no-repeat center center;
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
          &:nth-of-type(4) span:nth-of-type(1) {
            display: inline-block;
            width: 6.666vw;
            height: 3.448vh;
            background: url(../../static/images/image_shangxiahuo.png) no-repeat center center;
            background-size: cover;
            margin-top: 3vh;
          }
          &:nth-of-type(5) span:nth-of-type(1) {
            display: inline-block;
            margin-left: 0.6vw;
            width: 6.066vw;
            height: 3.548vh;
            background: url(../../static/images/image_lianxi.png) no-repeat center center;
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
        a{
          color: #5c5c5c;
        }
      }
    }
  }
</style>
