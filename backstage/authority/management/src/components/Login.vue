<template>
    <div class="Login">
      <section class="login_bg"></section>
      <section class="login_model"></section>
      <section class="login_form">
        <div class="login_logo">
          <a href="http://www.weilaixiansen.com" title="未来鲜森官网" target="_blank"></a>
          <span>商户管理平台</span>
        </div>
          <div class="username">
            <label for="username">账号</label>
            <input type="text" id="username" name="username" v-model="username" @blur="usernameBlur" @focus="usernameFocus"/>
          </div>
          <div class="password">
            <label for="password">密码</label>
            <input type="password" id="password" name="password" v-model="password" @blur="passwordBlur" @focus="passwordFocus"/>
          </div>
          <div class="remember">
            <!--<Checkbox v-model="remember" @click="rememberChange"></Checkbox>-->
            <!--<span>记住登录信息</span>-->
            <span class="tipTitle">{{tipTitle}}</span>
          </div>
          <div class="form_submit">
            <input type="button" value="登录" name="sumbit_button" @click="sumbitLogin">
          </div>

      </section>
      <footer>
        <p>Copyright&nbsp;&copy;&nbsp;2017-2018
          <a href="http://www.weilaixiansen.com" target="_blank" title="访问未来鲜森官网">西安未来鲜森智能信息技术有限公司</a>
          <span>&nbsp;&nbsp;</span>
          <span>技术支持: 400-770-7768</span>
        </p>
      </footer>
    </div>
</template>

<script>
    export default {
      name: "login",
      data() {
        return {
          remember: true,
          username: '',
          password: '',
          tipTitle: '',
        }
      },
      methods: {
        //账号失焦
        usernameBlur() {

        },
        //账号获取焦点
        usernameFocus() {
          this.tipTitle = "";
        },
        //密码失焦
        passwordBlur() {

        },
        //密码获取焦点
        passwordFocus() {
          this.tipTitle = "";
        },
        //登录
        sumbitLogin() {
          let username = this.username;
          let password = this.password;
          if(username && password) {
            this.$ajax({
              url: "/api/login/getUserInfo",
              method: "POST",
              data: this.transformRequest({
                username: username,
                password: password
              }),
            }).then((res) => {
              if(res.data.code === 0) { //登录成功处理方法-1.通过路由传参2.通过vuex全局数据共享
                  // this.$store.state.activeUser = username;
                  // localStorage.setItem('username', username);
                  this.$router.push({
                    name: 'main',
                  })
                }else{//返回错误信息
                  this.tipTitle = res.data.message;
                }
            }).catch((error) => {
                //this.tipTitle = error;
            })
          }else if(!username && password){
            this.tipTitle = '请输入账号';
          }else if(username && !password){
            this.tipTitle = '请输入密码';
          }else{
            this.tipTitle = '请输入账号和密码';
          }
        },
        transformRequest(data) {
          let ret = '';
          for (let i in data) {
            ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
          }
          return ret;
        },
      }
    }
</script>

<style lang="less">
  @backgroudColor: #f2f2f2;
  @font-size: 2vh;
  @color: rgba(255, 255, 255, 0.5);
  .Login{
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
          width: 5rem;
          height: 5rem;
          margin: 0.5rem 2.5rem;
          background: url(../../static/images/wlxs_logo.png) no-repeat center center;
          background-size: cover;
        }
        span{
          display: inline-block;
          float: left;
          color: #fff;
          font-size: 2.5rem;
          margin: 2vh;
        }
      }
      .username{
        margin-top: 3vh;
        input{
          background: #1B1B1B;
          outline-color: #54a635;
          border: none;
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
          outline-color: #54a635;
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
        height: 0.8rem;
        span:nth-of-type(2), span:nth-of-type(3){
          display: inline-block;
          width: 8rem;
        }
        .tipTitle{
          text-align: right;
          color: #54a635;
          font-weight: 600;
        }
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
            background: #54a635;
            color: #000;
          }
        }
      }
    }
    .login_bg{
      width: 100vw;
      height: 100vh;
      background: url(../../static/images/login_bg.png) no-repeat center center;
      background-size: cover;
    }
    footer{
      position: absolute;
      width: 100vw;
      bottom: 3vh;
      color: #fff;
      p{
        text-align: center;
        a{
          position: relative;
          display: inline-block;
          color: #54a635;
          transition: all .3s linear;
          &:hover{
            color: #006dcc;
            transform: translateY(-5px);
          }
        }
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
            width: 5rem;
            height: 5rem;
            margin: 0.5rem 2.5rem;
            background: url(../../static/images/wlxs_logo.png) no-repeat center center;
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
