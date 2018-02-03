<template>
  <div class="OpenDoorError">
    <section class="statusMsg">
      <div>
        <div class="doorFalse"></div>
        <!--<p class="statusMsg">{{statusMsg}}</p>-->
        <p class="receiveMsg">{{receiveMsg}}</p>
        <p class="tipText">如锁已开请正常购物，关门后会自动结算。<br/>如锁没有开，请重试或尝试其他未来鲜森无人售货柜。</p>
      </div>
    </section>
  </div>
</template>
<script>
  export default ({
    name: 'OpenDoorStatus',
    data() {
      return {
        statusMsg: '开门超时',
        receiveMsg: ''
      }
    },
    beforeMount(){
      function getUrlQuery(){ //从url中获取
        let name = null;
        let value = null;
        let str = location.href;
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
      this.receiveMsg = decodeURI(params.msg) !== 'undefined' ? decodeURI(params.msg) : ' ';
    },
    mounted (){
      this.$nextTick( () => {

      })
    },
    methods:{

    }
  })
</script>

<style lang="less">
  @headerHeight : 6vh;
  .OpenDoorError {
    background: #f2f2f2;
    padding: 6vh 0 12vh 0;
    .statusMsg{
      >div{
        padding: 10vh 0 0 0 ;
      }
      .doorFalse{
        width: 20vh;
        height: 20vh;
        margin: 2vh auto;
        background: url(../../static/images/kmcs.png) no-repeat center center;
        background-size: cover;
      }
      .statusMsg{
        text-align: center;
        font-size: 5vh;
        color: #F6504E;
      }
      .receiveMsg{
        width: 100vw;
        padding: 2vh 2vw;
        font-size: 2.8vh;
        color: #f73c3b;
        text-align: center;
      }
      .tipText{
        width: 50vw;
        margin: 5vh auto;
        text-align: center;
        font-size: 2.8vh;
        color: #898989;
      }
    }
  }
</style>
