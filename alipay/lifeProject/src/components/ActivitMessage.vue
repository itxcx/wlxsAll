<template>
  <div class="ActivitMessage">
    <section class="topImg"></section>
    <section class="msg" v-show="msg">{{msg}}
      <div>
        <button class="btn btn-danger" @click="readyScan(goScan)">去使用</button>
      </div>
    </section>

  </div>
</template>
<script>
  
 export default({
   name: 'ActivitMessage',
   data() {
     return {
       msg: ''
     }
   },
   beforeMount(){
     function getUrlQuery(){ //从url中获取 msg
       let name = null;
       let value = null;
       let str = decodeURIComponent(location.href);
       let num = str.indexOf("?");
       str = str.substr(num + 1);
       let arr = str.split("&");
       for(let i = 0; i < arr.length; i++){
         num = arr[i].indexOf("=");
         if(num > 0){
           name = arr[i].substring(0, num);
           value = arr[i].substr(num + 1);
           this[name] = value;
         }
       }
     }
     let params = new getUrlQuery();
     this.msg = params.msg;
   },
   methods: {
     readyScan(callback) {
       if (window.AlipayJSBridge) {
         callback && callback();
       } else {
         // 如果没有注入则监听注入的事件
         document.addEventListener('AlipayJSBridgeReady', callback, false);
       }
     },
     goScan(){
       AlipayJSBridge.call('scan', {
         type: 'qr'
       },  (result) => {
         if(result.error){
           console.log(result.error);
         } else{
           window.location.href = result.qrCode;
           }
       }).catch( (error) => {
         console.log(error);
       })
     }
   }
 })
</script>
<style lang="less">
  .ActivitMessage{
    background: #f2f2f2;
    padding: 6vh 0 12vh 0;
    .topImg{
      width: 30vh;
      height: 30vh;
      margin: 2vh auto;
      background-size: cover;
      border-radius: 50%;
    }
    .msg{
      margin-top: 10vh;
      text-align: center;
      font-size: 2.8vh;
      color: #F6504E;
      button{
        margin: 5vh;
        width: 40vw;
        height: 7vh;
        font-size: 3vh;
        background: #F6504E;
        border: none;
      }
    }
  }
</style>
