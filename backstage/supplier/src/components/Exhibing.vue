<template>
    <div class="Exhibing">
      <section class="login_top">
        <span @click="goMain">
          <Icon type="chevron-left"></Icon>
        </span>
        <p>商品上架操作</p>
      </section>
      <section class="exhib_img"></section>
      <article v-show="openning">
        <p>开门中,请稍后...</p>
        <p>上货完成,请及时关门</p>
      </article>
      <article v-show="openSuccess">
        <p>门已开请放入商品,上货完成</p>
        <p>请及时关门</p>
      </article>
      <article v-show="openError">
        <p>开门超时,请重试,上货完成</p>
        <p>请及时关门</p>
      </article>
      <section class="exhib_tips">
        <p>
          <span></span>
          <span>温馨提示</span>
        </p>
      </section>
      <section class="exhib_content">
        <p>上货前联系未来鲜森运营人员修改价签</p>
        <p>商品陈列过程中请勿将RFID标签贴近金属、液体等</p>
      </section>
      <section class="closeDoor" v-show="doorClose">
        <section class="close_img"></section>
        <p>已关门, 处理中</p>
        <section class="close_tips">
          <p>
            <span></span>
            <span>温馨提示</span>
          </p>
        </section>
        <section class="close_tip_content" v-show="tipContentShow">请耐心等待，预计需要<span>10~30</span>秒</section>
        <section class="close_tip_content" v-show="!tipContentShow">操作完成</section>
      </section>
    </div>
</template>

<script>
    export default {
      name: "exhibing",
      data() {
        return {
          openSuccess: false,
          openError: false,
          openning: true,
          doorClose: false,
          tipContentShow: true
        }
      },
      mounted() {
        this.$nextTick(() => {
          let device_number = this.$route.query.device_number;
          this.openDoor(device_number);//调用开门方法
        })
      },
      methods: {
        goMain() {
          this.$router.push({
            path: '/main'
          })
        },
        //websocket
        openDoorWs(sid) {
          let socketPath = `ws://wss.weilaixiansen.com:37023?${sid}`;
          let ws = new WebSocket(socketPath);
          ws.onopen = function() {
            ws.send('back');
          }
          ws.onmessage = (res) => { //接收消息方法
            //接收orderId
            let msg = JSON.parse(res.data);
            if(msg && msg.order_id) {
              let order_id = msg.order_id;//orderid
              // localStorage.setItem('order_id', order_id);
              // this.$router.push({
              //   path: '/doorclose'
              // })
              this.doorClose = true;
              let operate = localStorage.getItem('operate');
              let action = 0; //判断上下货操作
              if(operate !== 'exhib') {
                action = 1;
              }
              this.getExhibOrderInfo(order_id, action);
            }
          }
          ws.onclose = function() {
            console.log('close');
          }
          ws.onerror = function(error) {

          }
        },
        //调用接口,获取上货详细信息,参数订单ID-order_id && 操作类型-ation
        getExhibOrderInfo(order_id, action) {
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/login/closeDetailbyOrderId?action=${action}&order_id=${order_id}`,
            method: 'GET'
          }).then((res) => {
            //如果数据请求成功,跳转到核验页面
            if(res.data.code == 0) {
              res.data.data = JSON.stringify(res.data.data);
              localStorage.setItem('exhibData', res.data.data);
              let operate = localStorage.getItem('operate');
              if(operate === 'exhib') { //上货完成
                this.$router.push({
                  path: '/exhibingDone'
                })
              }else if(operate === 'ship'){ //下货完成
                this.$router.push({
                  path: '/shipDone'
                })
              }
            }else{
              this.tipContentShow = false;
            }
            console.log(res);
          }).catch((error) => {
            console.log(error);
          })
        },
        //开门命令
        openDoor(device_number) {
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/login/shopflow?device_number=${device_number}`,
            method: 'GET'
          }).then((res) => {
            this.openning = false;
            if(res.data.code == 0) { //开门成功
              this.openSuccess = true;
              let sid = res.data.sid;
              let device_address = res.data.address;
              localStorage.setItem('device_address', device_address);
              this.openDoorWs(sid); //建立websocket连接
            }else if(res.data.code == 3) {
              this.$router.push({
                path: '/'
              })
            }else{ //开门超时
              this.openError = true;
            }
          }).catch((error) => {
            console.log(error);
          })
        }
      }
    }
</script>

<style lang="less">
  .Exhibing{
    width: 100vw;
    height: 100vh;
    background: #fff;
    .login_top{
      width: 100vw;
      background: #65d172;
      height: 5.997vh;
      font-size: 2.398rem;
      line-height: 5.997vh;
      text-align: center;
      color: #fff;
      font-weight: 500;
      margin-bottom: 9.67vh;
      span{
          position: absolute;
          left: 2vw;
          top: 0;
      }
    }
    .exhib_img{
      width: 59.2vw;
      height: 29.91vh;
      margin: 0 auto;
      background: url("../../static/images/openSuccess.gif") no-repeat center center;
      background-size: cover;
    }
    article{
      margin: 5.472vh 0 5.3223vh 0;
      font-size: 2.9985vh;
      color: #373737;
      text-align: center;
      p:nth-of-type(1){
        margin-bottom: 2.2636vh;
      }
    }
    .exhib_tips{
      text-align: center;
      p{
        height: 2.923vh;
        span:nth-of-type(1) {
          display: inline-block;
          width: 4.1067vw;
          height: 3.598vh;
          background: url("../../static/images/image_tips.png") no-repeat center center;
          background-size: cover;
          vertical-align: bottom;
        }
        span:nth-of-type(2) {
          display: inline-block;
          margin-left: 5px;
          height: 2.923vh;
          font-size: 2.0989vh;
          color: rgba(36,35,35,.93);
        }
      }
    }
    .exhib_content{
      margin-top: 1.874vh;
      text-align: center;
      font-size: 2.0989vh;
      color: #5c5c5c;
      p:nth-of-type(1) {
        margin-bottom: 0.937vh;
      }
    }
    .closeDoor{
      width: 100vw;
      height: 100vh;
      background: #fff;
      padding-top: 11.919vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      .close_img{
        width: 59.2vw;
        height: 29.91vh;
        margin: 0 auto;
        background: url("../../static/images/openSuccess.gif") no-repeat center center;
        background-size: cover;
      }
      >p{
        font-size: 2.998vh;
        color: #373737;
        text-align: center;
        margin-top: 8.745vh;
      }
      .close_tips{
        text-align: center;
        margin-top: 4.449vh;
        p{
          height: 2.923vh;
          span:nth-of-type(1) {
            display: inline-block;
            width: 4.0666vw;
            height: 2.923vh;
            background: url("../../static/images/image_tips.png") no-repeat center center;
            background-size: cover;
            vertical-align: bottom;
          }
          span:nth-of-type(2) {
            display: inline-block;
            margin-left: 5px;
            height: 2.923vh;
            font-size: 2.0989vh;
            color: rgba(36,35,35,.93);
          }
        }
      }
      .close_tip_content{
        margin-top: 1.874vh;
        text-align: center;
        font-size: 2.0989vh;
        color: #5c5c5c;
        span{
          color: #ff3f2f;
        }
      }
    }
  }
</style>
