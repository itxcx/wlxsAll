<template>
  <div class="Procedure">
    <section class="Step">
      <div class="bannerImg"></div>
    </section>
    <ul>
      <li>
        <div class="step1">
          <dl>
            <dt></dt>
            <dd></dd>
          </dl>
          <div></div>
        </div>
      </li>
      <li>
        <div class="step2">
          <div></div>
          <dl>
            <dt></dt>
            <dd></dd>
          </dl>
        </div>
      </li>
      <li>
        <div class="step3">
          <dl>
            <dt></dt>
            <dd></dd>
          </dl>
          <div></div>
        </div>
      </li>
    </ul>
    <section class="procedurTip">
      <div></div>
      <p>请勿将购买的商品放回售货柜</p>
      <p>如订单扣款错误，请致电 <a href="tel://400-770-7768">400-770-7768</a></p>
    </section>
    <section class="goOpenDoor">
      <button @click="goOpenDoor"></button>
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
  @backgroundColor: #f6f6f6;
  .Procedure {
    background: @backgroundColor;
    width: 100vw;
    height: 100vh;
    .Step{
      .bannerImg{
        width: 100vw;
        height: 20vh;
        background: url(../../static/images/procedure_bannner.png) no-repeat center center;
        background-size: cover;
      }
    }
    ul{
      list-style: none;
      margin: 5vh 0;
      li{
        margin: 3vh 0;
        height: 20vh;
        .step1{
          dl{
            width: 50vw;
            float: left;
            dt{
              width: 10vh;
              height: 10vh;
              margin: 0 auto;
              background: url(../../static/images/procedure_step1.png) no-repeat center center;
              background-size: cover;
            }
            dd{
              width: 30vw;
              height: 4vh;
              margin: 2vh auto;
              background: url(../../static/images/procedure_opendoor.png) no-repeat center center;
              background-size: cover;
            }
          }
          div{
            float: left;
            width: 40vw;
            height: 16vh;
            background: url(../../static/images/procedure_scan.png) no-repeat center center;
            background-size: cover;
          }
        }
        .step2{
          dl{
            width: 50vw;
            float: left;
            dt{
              width: 10vh;
              height: 10vh;
              margin: 0 auto;
              background: url(../../static/images/procedure_step2.png) no-repeat center center;
              background-size: cover;
            }
            dd{
              width: 25vw;
              height: 4vh;
              margin: 2vh auto;
              background: url(../../static/images/procedure_choose.png) no-repeat center center;
              background-size: cover;
            }
          }
          div{
            margin-left: 9vw;
            float: left;
            width: 40vw;
            height: 16vh;
            background: url(../../static/images/procedure_scan.png) no-repeat center center;
            background-size: cover;
          }
        }
        .step3{
          dl{
            width: 50vw;
            float: left;
            dt{
              width: 10vh;
              height: 10vh;
              margin: 0 auto;
              background: url(../../static/images/procedure_step3.png) no-repeat center center;
              background-size: cover;
            }
            dd{
              width: 25vw;
              height: 4vh;
              margin: 2vh auto;
              background: url(../../static/images/procedure_close.png) no-repeat center center;
              background-size: cover;
            }
          }
          div{
            float: left;
            width: 20vw;
            height: 16vh;
            margin-left: 9vw;
            background: url(../../static/images/procedure_closeOrder.png) no-repeat center center;
            background-size: cover;
          }
        }
      }
    }
    .procedurTip{
      text-align: center;
      div{
        width: 3vh;
        height: 3vh;
        margin: 0 auto;
        background: url(../../static/images/procedure_tip.png) no-repeat center center;
        background-size: cover;
      }
      p{
        margin-top: 0.6vh;
        font-weight: bold;
      }
    }
    .goOpenDoor{
      text-align: center;
      margin-top: 3vh;
      button{
        width: 100vw;
        height: 8vh;
        border: none;
        background: url(../../static/images/procedure_begin_normal.png) no-repeat center center;
        background-size: cover;
      }
    }
  }
</style>
