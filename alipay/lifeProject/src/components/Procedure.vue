<template>
  <div class="Procedure">
    <section class="Step">
      <div class="bannerImg"></div>
    </section>
    <ul>
      <li>
        <div class="type"></div>
        <p>支付宝，扫一扫</p>
        <div class="steps"></div>
      </li>
      <li>
        <div class="type"></div>
        <p>开门选购商品</p>
        <div class="steps"></div>
      </li>
      <li>
        <div class="type"></div>
        <p>关门自动结算</p>
        <div class="steps"></div>
      </li>
    </ul>
    <section class="goOpenDoor">
      <button @click="goOpenDoor">了解,去开门</button>
    </section>
  </div>
</template>

<script>
  export default ({
    name: 'procedure',
    data(){
      return {
      }
    },
    methods: {
      goOpenDoor(){
        window.location.href = 'user/openDoor';
      }
    }
  })
</script>

<style lang="less">
  @headerHeight : 6vh;
  .Procedure {
    background: #fff;
    height: 100vh;
    padding: 6vh 0 12vh 0;
    .Step{
      .bannerImg{
        width: 100vw;
        height: 20vh;
        background: url(../../static/images/banner.jpg) no-repeat center center;
        background-size: cover;
      }
    }
    ul{
      padding: 2vh 3vw;
      list-style: none;
      li:nth-of-type(1){
        overflow: hidden;
        padding: 2vh 0;
        border-bottom: 1px solid #f2f2f2;
        div:nth-of-type(1){
          width: 10vh;
          height: 10vh;
          float: left;
          background: url(../../static/images/1.png) no-repeat center center;
          background-size: cover;
        }
        p{
          font-size: 3vh;
          width: 58vw;
          height: 10vh;
          line-height: 10vh;
          padding-left: 2vw;
          float: left;
        }
        div:nth-of-type(2){
          width: 10vh;
          margin-top: 2vh;
          height: 7vh;
          float: left;
          background: url(../../static/images/01.png) no-repeat center;
          background-size: cover;
        }
      }
      li:nth-of-type(2){
        overflow: hidden;
        padding: 2vh 0;
        border-bottom: 1px solid #f2f2f2;
        div:nth-of-type(1){
          width: 10vh;
          height: 10vh;
          float: left;
          background: url(../../static/images/2.png) no-repeat center center;
          background-size: cover;
        }
        p{
          font-size: 3vh;
          width: 58vw;
          height: 10vh;
          line-height: 10vh;
          padding-left: 2vw;
          float: left;
        }
        div:nth-of-type(2){
          width: 10vh;
          margin-top: 2vh;
          height: 7vh;
          float: left;
          background: url(../../static/images/02.png) no-repeat center;
          background-size: cover;
        }
      }
      li:nth-of-type(3){
        overflow: hidden;
        padding: 2vh 0;
        border-bottom: 1px solid #f2f2f2;
        div:nth-of-type(1){
          width: 10vh;
          height: 10vh;
          float: left;
          background: url(../../static/images/4.png) no-repeat center center;
          background-size: cover;
        }
        p{
          font-size: 3vh;
          width: 58vw;
          height: 10vh;
          line-height: 10vh;
          padding-left: 2vw;
          float: left;
        }
        div:nth-of-type(2){
          width: 10vh;
          margin-top: 2vh;
          height: 7vh;
          float: left;
          background: url(../../static/images/03.png) no-repeat center;
          background-size: cover;
        }
      }
    }
    .goOpenDoor{
      position: fixed;
      bottom: 2vh;
      width: 100vw;
      text-align: center;
      button{
        width: 83vw;
        height: 8vh;
        background: #f73c3b;
        border: none;
        color: #fff;
        border-radius: 5px;
        font-size: 3vh;
        font-weight: 600;
      }
    }
  }
</style>
