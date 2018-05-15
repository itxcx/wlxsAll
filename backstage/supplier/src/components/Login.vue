<template>
    <div class="Login">
      <header>
        <div class="login_top">登录</div>
        <div class="logo"></div>
      </header>
      <section class="userInfo">
        <div class="phone">
          <span></span>
          <input type="number" pattern="[0-9]*" v-model="phone" aria-describedby="basic-addon1" name="phone" placeholder="请输入手机号" @blur="phoneBlur"/>
        </div>
        <div class="password">
          <span></span>
          <input type="text" name="password" v-model="password" placeholder="请输入登录密码"/>
        </div>
      </section>
      <section class="userInfo_submit" @click="submitUserinfo">登录</section>
      <section class="tipModal" v-show="tipStatus">
        <p>{{tipText}}</p>
      </section>
    </div>
</template>

<script>
    export default {
      name: "login",
      data() {
        return {
          phone: '',
          password: '',
          tipStatus: false,//错误提示框显示控制
          tipText: '',//提示框内容
          submitAlready: false,
          phoneLegal: false
        }
      },
      methods: {
        transformRequest(data) {
          let ret = '';
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret;
        },
        //手机号输入失焦
        phoneBlur(){
          let phoneCheck = /^1[345789]\d{9}$/;
          if(!phoneCheck.test(this.phone)){
            this.modalFun('手机号输入错误', 2000);
          } else {
            this.phoneLegal = true;
          }
        },
        //错误提示框显示控制
        modalFun(text, timer) {
          this.tipStatus = true;
          this.tipText = text;
          setTimeout(() => {
            this.tipStatus = false;
          },timer)
        },
       //提交按钮方法
        submitUserinfo() {
          let phone = this.phone;
          let password = this.password;
          if(!this.submitAlready) {
            this.submitAlready = true;
            if(this.phoneLegal && password) {
              this.$ajax({
                url: `http://merchant.test.weilaixiansen.com/merchant/login?phone=${phone}&password=${password}`,
                method: 'GET'
              }).then((res) => {
                console.log(res);
                if(res.data.code == 0) {
                  this.modalFun('登录成功', 1000);
                  setTimeout(() => {
                    this.$router.push({
                      path: '/main'
                    })
                  }, 1000)
                }else{
                  this.submitAlready = false;
                  this.modalFun('用户信息错误', 2000);
                }
              }).catch((error) => {
                this.submitAlready = false;
                this.modalFun('操作错误,请重试', 2000);
              })
            }
          }
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
    .tipModal{
      background: rgba(0,0,0,.7);
      border-radius: 10px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      width: 45vw;
      height: 9vh;
      z-index: 99;
      color: #fff;
      text-align: center;
      font-size: 3.5vw;
      padding: 3vh 0;
      span{
        font-size: 7vh;
      }
    }
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
