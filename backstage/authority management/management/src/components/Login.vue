<template>
    <div class="Login">
      <section class="login_bg"></section>
      <section class="login_model"></section>
      <section class="login_form">
        <div class="login_logo">
          <a href="http://www.weilaixiansen.com" title="未来鲜森官方网站" target="_blank"></a>
          <span>商户管理平台</span>
        </div>
        <div class="username">
          <label for="username">账号</label>
          <input type="text" id="username" name="username"/>
        </div>
        <div class="password">
          <label for="password">密码</label>
          <input type="password" id="password" name="password"/>
        </div>
        <div class="remember">
          <label><Checkbox v-model="remember"></Checkbox></label>
          <span>记住登录信息</span>

        </div>
        <div class="form_submit">
          <input type="button" value="登录" name="sumbit_button">
        </div>
      </section>
      <footer>
        <p>Copyright&nbsp;&copy;&nbsp;2017-2018 <a href="http://www.weilaixiansen.com" target="_blank">西安未来鲜森智能信息技术有限公司</a></p>
      </footer>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
          return {
            remember: true
          }
        }
    }
</script>

<style lang="less">
  @backgroudColor: #f2f2f2;
  @font-size: 2vh;
  @color: rgba(255, 255, 255, 0.5);
  .Login{
    .login_bg{
      width: 100vw;
      height: 100vh;
      background: url(../assets/images/login_bg.jpg) no-repeat center center;
      background-size: cover;
    }
    .login_model{
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
    }
    .login_form{
      width: 36vw;
      height: 40vh;
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      margin: auto;
      z-index: 99;
      background: rgba(0, 0, 0, 0.75);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.8);
      border: 4px solid rgba(50, 50, 55, 0.2);
      border-radius: 5px;
      text-align: center;
      .login_logo{
        overflow: hidden;
        a{
          display: inline-block;
          float: left;
          width: 10rem;
          height: 4rem;
          margin: 1rem 2.5rem;
          background: url(../assets/images/wlxs_logo.png) no-repeat center center;
          background-size: cover;
        }
        span{
          display: inline-block;
          float: left;
          color: @color;
          font-size: 2.5rem;
          margin: 2vh;
        }

      }
      .username{
        margin-top: 3vh;
        input{
          background: #1B1B1B;
          border: none;
          outline: medium;
          border-radius: 3px;
          color: #fff;
          height: 2rem;
          text-align: center;
        }
        color: #fff;
        font-size: 1rem;
      }
      .password{
        input{
          background: #1B1B1B;
          border: none;
          outline: medium;
          border-radius: 3px;
          color: #fff;
          height: 2rem;
          margin-top: 2vh;
          text-align: center;
        }
        color: #fff;
        font-size: 1rem;
      }
      .remember{
        margin-top: 10px;
        color: #fff;
      }
      .form_submit{
        input{
          background: #1B1B1B;
          border: 1px solid #555;
          outline: medium;
          border-radius: 3px;
          color: #fff;
          width: 10rem;
          height: 2rem;
          margin-top: 2vh;
          cursor: pointer;
          transition: all 0.3s linear;
          &:hover{
            background: #2779aa;
            color: #000;
          }
        }
      }
    }
    footer{
      position: absolute;
      width: 100vw;
      bottom: 3vh;
      color: #fff;
      p{
        text-align: center;
      }
    }
    @media screen and (max-width:900px) {
      .login_form{
        width: 90%;
        height: 50vh;
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        margin: auto;
        z-index: 99;
        background: rgba(0, 0, 0, 0.75);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.8);
        border: 4px solid rgba(50, 50, 55, 0.2);
        border-radius: 5px;
        text-align: center;
        .login_logo{
          overflow: hidden;
          a{
            display: block;
            width: 15rem;
            height: 4rem;
            margin: 0.5rem 2.5rem;
            background: url(../assets/images/wlxs_logo.png) no-repeat center center;
            background-size: cover;
          }
          span{
            display: block;
            color: @color;
            font-size: 1.5rem;
            margin: 1vh;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }

</style>
