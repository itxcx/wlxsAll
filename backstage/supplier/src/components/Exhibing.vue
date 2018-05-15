<template>
    <div class="Exhibing">
      <section class="exhib_img"></section>
      <article v-show="openSuccess">
        <p>门已开请放入商品,上货完成</p>
        <p>请及时关门</p>
      </article>
      <article v-show="!openSuccess">
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
    </div>
</template>

<script>
    export default {
      name: "exhibing",
      data() {
        return {
          openSuccess: true,
        }
      },
      mounted() {
        this.$nextTick(() => {
          let device_number = this.$route.query.device_number;
          this.openDoor(device_number);//调用开门方法
        })
      },
      methods: {
        //websocket
        openDoorWs(sid) {
          const socketPath = 'ws://wss.weilaixiansen.com:37023?' + sid;
          const ws = new WebSocket(socketPath);
          ws.onopen = function() {
            ws.send('back');
          }
          ws.onmessage= function(res) { //接收消息方法
            //接收orderId
            let msg = JSON.parse(res.data);
            if(msg && msg.order_id) {
              let order_id = msg.order_id;
              alert(order_id);
            }
          }
          ws.onerror = function(error) {
            console.log(error);
          }
        },
        //开门命令
        openDoor(device_number) {
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/login/shopflow?device_number=${device_number}`,
            method: 'GET'
          }).then((res) => {
            if(res.data.code == 0) { //开门成功
              this.openSuccess = true;
              let sid = res.data.sid;
              this.openDoorWs(sid); //建立websocket连接
            }else if(res.data.code == 3) {
              this.$router.push({
                path: '/'
              })
            }else{ //开门超时
              this.openSuccess = false;
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
    padding-top: 9.67vh;
    background: #fff;
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
          width: 3.8666vw;
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
    .exhib_content{
      margin-top: 1.874vh;
      text-align: center;
      font-size: 2.0989vh;
      color: #5c5c5c;
      p:nth-of-type(1) {
        margin-bottom: 0.937vh;
      }
    }
  }
</style>
