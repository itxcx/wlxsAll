<template>
    <div class="Main">
      <section class="topBanner"></section>
      <section class="repertory" @click="goRepertory">
        <div></div>
        <dl>
          <dt>售货柜库存</dt>
          <dd>查询售货柜库存，进行实时补货</dd>
        </dl>
      </section>
      <section class="handle">
        <aside class="exhibit" @click="exhibitScan">
          <div></div>
          <dl>
            <dt>商品上架</dt>
            <dd>放入售货柜中</dd>
          </dl>
        </aside>
        <aside class="ship"  @click="shipScan">
          <div></div>
          <dl>
            <dt>商品下架</dt>
            <dd>售货柜中取出</dd>
          </dl>
        </aside>
      </section>
      <Footer-bar></Footer-bar>
    </div>
</template>

<script>
  import FooterBar from './FooterBar.vue';
    export default {
      name: "Main",
      data() {
          return {}
      },
      components:{
        FooterBar
      },
      //页面初始化
      mounted() {
        this.$nextTick(() => {
          //发送请求，获取配置参数
          this.$ajax({
            url: 'http://merchant.test.weilaixiansen.com/merchant/config',
            method: 'GET'
          }).then((res) => {
            if(res.data.code == 0) {
              let configData = res.data.data;
              this.getConfigParames(configData.appId, configData.noncestr, configData.timestamp, configData.signature);
            }
          })
        })
      },
      methods: {
        //查看库存
        goRepertory() {
          this.$router.push({
            path: '/repertory'
          })
        },
        //获取config
        getConfigParames(_appId, _nonceStr, _timestamp, _signature) {
          wx.config({
            debug : false,
            appId : _appId,
            timestamp : _timestamp,
            nonceStr : _nonceStr,
            signature : _signature,
            jsApiList : ['scanQRCode']
          });
        },
        //上货
        exhibitScan() {
          localStorage.setItem('operate', 'exhib'); //上货操作
          this.wxScan();//调用扫码开门
        },
        //下货
        shipScan() {
          localStorage.setItem('operate', 'ship'); //上货操作
          this.wxScan();//调用扫码开门
        },
        //微信扫一扫
        wxScan() {
          wx.scanQRCode({
            needResult: 1,
            scanType: ["qrCode", "barCode"],
            success: (res) => {
              let result = res.resultStr;
              let device_number = result.split('?')[1].split('=')[1];//设备id
              if(device_number) {
                this.scanResult(device_number);
              }
            }
          })
        },
        //扫一扫结果处理回调方法
        scanResult(device_number) {
          let operate = localStorage.getItem('operate'); //判断操作类型
          if(operate === 'exhib') { //上货
            this.$router.push({
              path: '/exhibing',
              query: {device_number: device_number}
            })
          }else if(operate === 'ship') { //下货
            this.$router.push({
              path: '/ship',
              query: {device_number: device_number}
            })
          }
        }
      }
    }
</script>

<style lang="less">
  .Main{
    width:100vw;
    height: 100vh;
    background: #f5f5f5;
    font-family: "PingFang SC-Medium";
    .topBanner{
      width: 100vw;
      height: 23.2383vh;
      background: url("../../static/images/banner.jpg") no-repeat center center;
      background-size: cover;
    }
    .repertory{
      background: #ffffff;
      margin: 2.667vw;
      padding: 2.6236vh 4vw;
      border-radius: 5px;
      overflow: hidden;
      div{
        background: url("../../static/images/stock.png") no-repeat center center;
        background-size: cover;
        width: 12vw;
        height: 12.1vw;
        float: left;
        margin-right: 3.333vw;
      }
      dl{
        float: left;
        padding-top: 0.6vh;
        dt{
          font-size: 2.248rem;
          color: #373737;
        }
        dd{
          font-size: 1.949rem;
          color: #9f9f9f;
        }
      }
    }
    .handle{
      display: flex;
      .exhibit, .ship{
        background: #fff;
        border-radius: 5px;
        width: 46.2666vw;
        margin-left: 2.667vw;
        padding: 2.6236vh 4vw;
        div{
          width: 12.1vw;
          height: 12.1vw;
          float: left;
          margin-right: 3.333vw;
        }
        dl{
          padding-top: 0.6vh;
          dt{
            font-size: 2.248rem;
            color: #373737;
          }
          dd{
            font-size: 1.949rem;
            color: #9f9f9f;
          }
        }
      }
      .exhibit div{
        background: url("../../static/images/shelf.png") no-repeat center center;
        background-size: cover;
      }
      .ship div{
        background: url("../../static/images/take.png") no-repeat center center;
        background-size: cover;
      }
    }
  }
</style>
