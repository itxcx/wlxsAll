<template>
  <div class="OpenDoorError">
    <section class="statusMsg">
      <div>
        <div class="doorFalse"></div>
        <div class="receiveMsg">
          <p></p>
          <p>{{receiveMsg}}</p>
        </div>
        <div class="tipText">
          <p>如锁已开请正常购物，关门后会自动结算</p>
          <p>如锁没有开，请重试或尝试其他未来鲜森无人售货柜</p>
        </div>
      </div>
    </section>
    <section class="bottomAdv">
      <div></div>
    </section>
  </div>
</template>
<script>
  export default ({
    name: 'OpenDoorStatus',
    data() {
      return {
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
    methods:{

    }
  })
</script>

<style lang="less">
  @backgroundColor: #f6f6f6;
  .OpenDoorError {
    width: 100vw;
    height: 100vh;
    background: @backgroundColor;
    .statusMsg{
      >div{
        padding: 10vh 0 0 0 ;
      }
      .doorFalse{
        width: 30vh;
        height: 30vh;
        margin: 2vh auto;
        background: url(../../static/images/open_error.png) no-repeat center center;
        background-size: cover;
      }
      .receiveMsg{
        width: 100vw;
        height: 4vh;
        margin: 5vh auto;
        color: #ff0000;
        text-align: center;
        p:nth-of-type(1){
          display: inline-block;
          width: 4vh;
          height: 4vh;
          background: url(../../static/images/procedure_tip.png) no-repeat center center;
          background-size: cover;
          margin-top: 0.5vh;
        }
        p:nth-of-type(2){
          font-size: 3vh;
          height: 4vh;
          line-height: 4vh;
        }
      }
      .tipText{
        text-align: center;
        font-size: 2.5vh;
        color: #454545;
        margin-top: 16vh;
        p{
          margin-top: 1vh;
          font-weight: 600;
          letter-spacing: ;
        }
      }
    }
    .bottomAdv{
      position: absolute;
      bottom: 3px;
      left: 0;
      margin: 1vh;
      div{
        width: 96vw;
        height: 20vh;
        background: url(../../static/images/adv_normal.png) no-repeat center center;
        background-size: cover;
        border-radius: 5px;
      }
    }
  }
</style>
