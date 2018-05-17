<template>
  <div class="Ship">
    <section class="ship_img"></section>
    <article v-show="openSuccess">
      <p>门已开,请取出商品</p>
    </article>
    <article v-show="!openSuccess">
      <p>开门超时,请重试</p>
    </article>
    <section class="ship_tips">
      <p>
        <span></span>
        <span>温馨提示</span>
      </p>
    </section>
    <section class="ship_content">
      <p>下架自家商品不会扣款,下架其他</p>
      <p>商品将视作购买,若下架商品过多,请及时补货！</p>
    </section>
  </div>
</template>

<script>
  export default {
    name: "ship",
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
        const socketPath = `ws://wss.weilaixiansen.com:37023?${sid}`;
        const ws = new WebSocket(socketPath);
        ws.onopen = function() {
          ws.send('back');
        }
        ws.onmessage = (res) => { //接收消息方法
          //接收orderId
          let msg = JSON.parse(res.data);
          if(msg && msg.order_id) {
            let order_id = msg.order_id;//orderid
            localStorage.setItem('order_id', order_id);
            this.$router.push({
              path: '/doorclose'
            })
          }
        }
        ws.onerror = function(error) {

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
            let device_address = res.data.address;
            localStorage.setItem('device_address', device_address);
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
  .Ship{
    width: 100vw;
    height: 100vh;
    padding-top: 9.67vh;
    background: #fff;
    .ship_img{
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
    .ship_tips{
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
    .ship_content{
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
