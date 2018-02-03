<template>
  <div class="AfterScan">
    <section class="message">
      <div>以下为提示消息，请关注......</div>
      <p>{{message}}</p>
    </section>
  </div>
</template>

<script>
  export default ({
    name: 'afterScan',
    data() {
      return {
        sessionId: '',//扫码后传递过来的sessionid
        message: ''//websocket 消息
      }
    },
    mounted (){
      this.$nextTick( () => {
        this.sessionId = this.$route.query.sessionId;
        alert('support');
        this.socketMes();
        alert('end');
      })
    },
    methods: {
      socketMes(){
        let wsPath = 'ws://ws.weilaixiansen.com:8889/ws/login/' + this.sessionId;//websocket地址
        let websocket = new WebSocket(wsPath);
        websocket.onopen =  () => {
          websocket.send();
        };
        websocket.onmessage =  (res) => { //接收服务器推送消息
          this.message = res.data;
        };
        websocket.onclose =  () => {
        };
      }
    }
  })
</script>

<style lang="less">
  .AfterScan {
    padding: 6vh 0 12vh 0;
    .message{
      padding: 5vh 0;
      div{
        font-size: 3vh;
      }
      p{
        font-size: 3vh;
        text-align: center;

      }
    }
  }

</style>
