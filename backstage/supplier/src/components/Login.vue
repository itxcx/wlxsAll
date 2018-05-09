<template>
    <div class="Login">
      <header>
        <div class="login_top">登录</div>
        <div class="logo"></div>
      </header>
      <section class="userInfo">
        <div class="phone">
          <span></span>
          <input type="number" pattern="[0-9]*" aria-describedby="basic-addon1" name="phone" placeholder="请输入手机号"/>
        </div>
        <div class="password">
          <span></span>
          <input type="text" name="password" placeholder="请输入登录密码"/>
        </div>
      </section>
      <section class="userInfo_submit" @click="submitUserinfo">登录</section>
    </div>
</template>

<script>
    export default {
      name: "login",
      data() {
        return {}
      },
      methods: {
        //提交按钮方法
        submitUserinfo() {
          //跳转到主页
          this.$router.push({
            name: 'main'
          })
        }
      }
    }
</script>

<style lang="less">
  @font-color: #333;
  @header_background: #66D173;
  @page_background: #ffffff;
  .Login{
    width: 100vw;
    height: 100vh;
    background: @page_background;
    .login_top{
      width: 100vw;
      background: @header_background;
      height: 5.997vh;
      font-size: 2.398rem;
      line-height: 5.997vh;
      text-align: center;
      color: #fff;
      font-weight: 500;
    }
    .logo{
      width: 21.8667vw;
      height: 16.9427vh;
      background: url("../../static/images/logo.png") no-repeat center center;
      background-size: cover;
      margin: 8.395vh auto;
    }
    .userInfo{
      margin-top: 7.87vh;
      .phone, .password{
        position: relative;
        height: 5.997vh;
        width: 74.666vw;
        border: 1px solid #e8e8e8;
        border-radius: 20px;
        margin: 0 auto;
        input{
          position: absolute;
          top: 1.5vh;
          left: 13.6vw;
          width: 53.333vw;
          height: 2.998vh;
          border: none;
        }
        ::placeholder{
          font-size: 1.949rem;
        }
      }
      .phone span{
        display: inline-block;
        margin: 1.2vh 4vw;
        width: 5.6vw;
        height: 3.5982vh;
        background: url("../../static/images/account.png") no-repeat center center;
        background-size: cover;
      }

      .password{
        margin-top: 3.748vh;
        span{
          display: inline-block;
          margin: 1.2vh 4vw;
          width: 5.6vw;
          height: 4.0982vh;
          background: url("../../static/images/password.png") no-repeat center center;
          background-size: cover;
        }
      }
    }
    .userInfo_submit{
      margin: 7.496vh auto;
      width: 79.2vw;
      height: 10.4198vh;
      background: url("../../static/images/button_bg.png") no-repeat center center;
      background-size: cover;
      text-align: center;
      font-size: 2.2488rem;
      color: #fff;
      line-height: 8.4198vh;
    }
  }
</style>
