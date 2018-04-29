<template>
    <div class="Login">
      <header>
        <div class="login_top">登录</div>
        <div class="logo"></div>
      </header>
      <section class="userInfo">
        <div class="phone">
          <span></span>
          <input type="number" name="phone" placeholder="请输入手机号"/>
        </div>
        <div class="password">
          <span></span>
          <input type="text" name="password" placeholder="请输入登录密码"/>
        </div>
      </section>
    </div>
</template>

<script>
    export default {
      name: "login",
      data() {
        return {}
      },
      methods: {

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
      width: 21.333vw;
      height: 21.333vw;
      background: url("../../static/images/wlxs_logo.png") no-repeat center center;
      background-size: cover;
      margin: 8.395vh auto;
    }
    .userInfo{
      margin-top: 7.87vh;
      .phone, .password{
        height: 5.997vh;
        width: 74.666vw;
        border: 1px solid #f2f2f2;
        border-radius: 20px;
        margin: 0 auto;
        input{
          width: 53.333vw;
          height: 2.998vh;
          margin: 1.5vh 0;
        }
        ::placeholder{
          font-size: 1.949rem;
        }
      }
      .password{
        margin-top: 3.748vh;
      }

    }
  }
</style>
