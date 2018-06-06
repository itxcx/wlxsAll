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
          <input type="password" name="password" v-model="password" placeholder="请输入登录密码"/>
        </div>
        <p class="modify" @click="modifyPsw">修改密码</p>
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
          let resData = '';
          for (let resKey in data) {
            resData += encodeURIComponent(resKey) + '=' + encodeURIComponent(data[resKey]) + '&'
          }
          return resData;
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
                if(res.data.code == 0) {
                  localStorage.setItem('phone', phone);//用户手机号
                  this.modalFun('登录成功,即将跳转', 1000);
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
          }else{
            this.modalFun('稍后重试', 1000);
          }
        },
        //修改密码
        modifyPsw() {
          this.$router.push({
            path: '/modifyPassword'
          })
        }
      }
    }
</script>

<style lang="less">
  @font-color: #333;
  @header_background: #66D172;
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
      width: 29.2998rem;
      height: 10rem;
      z-index: 99;
      color: #fff;
      text-align: center;
      font-size: 2.6677rem;
      padding: 3vh 0;
    }
    .login_top{
      width: 100vw;
      background: @header_background;
      height: 5.997rem;
      font-size: 2.398rem;
      line-height: 5.997rem;
      text-align: center;
      color: #fff;
      font-weight: 500;
    }
    .logo{
      width: 11.2934rem;
      height: 13.9427rem;
      background: url("../../static/images/logo.png") no-repeat center center;
      background-size: cover;
      margin: 6.395rem auto;
    }
    .userInfo{
      margin-top: 5.87rem;
      .phone, .password{
        position: relative;
        height: 6.497rem;
        width: 39.666rem;
        border: 1px solid #e8e8e8;
        border-radius: 20px;
        margin: 0 auto;
        input{
          position: absolute;
          top: 1.2rem;
          left: 6.6rem;
          width: 30.333rem;
          height: 3.998rem;
          border: none;
          font-size: 2.549rem;
        }
        ::placeholder{
          font-size: 2.549rem;
        }
      }
      .phone span{
        display: inline-block;
        margin: 0.85rem 1.4rem;
        width: 3.6rem;
        height: 3.5982rem;
        background: url("../../static/images/account.png") no-repeat center center;
        background-size: cover;
      }
      .password{
        margin-top: 3.748vh;
        span{
          display: inline-block;
          margin: 0.85rem 1.4rem;
          width: 3.6rem;
          height: 4.1982rem;
          background: url("../../static/images/password.png") no-repeat center center;
          background-size: cover;
        }
      }
      .modify{
        margin: 2vh 5vw;
        text-align: right;
        font-size: 2.2488rem;
        color: #65d172;
      }
    }
    .userInfo_submit{
      margin: 4.496rem auto 2.496rem auto;
      width: 39.6rem;
      height: 8.8198rem;
      background: url("../../static/images/button_bg.png") no-repeat center center;
      background-size: cover;
      text-align: center;
      font-size: 2.5488rem;
      color: #fff;
      line-height: 6.2198rem;
    }
  }
</style>
