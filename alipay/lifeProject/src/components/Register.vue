<template>
  <div class="Register">
    <section class="registerInfo">
      <div class="logo"></div>
      <div class="username">
        <div class="col-md-1 col-xs-1"></div>
        <div class="phone col-md-10 col-xs-10">
          <p>手机号</p>
          <div>
            <input id="phone" type="number" pattern="[0-9]*" aria-describedby="basic-addon1" v-model="phone" name="phone" code="phone" placeholder="请输入手机号" @blur="phoneBlur"/>
          </div>
        </div>
      </div>
      <div class="password">
        <div class="col-md-1 col-xs-1"></div>
        <div class="phoneCode col-md-10 col-xs-10">
          <p>验证码</p>
          <div>
            <input id="code" type="number" pattern="[0-9]*" aria-describedby="basic-addon1" v-model="code" name="phone" code="phone" placeholder="请输入验证码"/>
            <span @click="getPhoneCode">{{getText}}</span>
          </div>
        </div>
      </div>
      <div class="agreeMent">
        <div class="col-md-1 col-xs-1"></div>
        <div class="agree col-md-10 col-xs-10">
          <input type="checkbox" checked @click="agreeChange"/>
          <span :class="{'agreeCheck': agree,'agreeUnCheck': !agree}"></span>
          <span>我已阅读并同意</span>
          <span>《新零售服务协议》</span>
        </div>
      </div>
    </section>
    <section class="submitRegister">
      <button @click="submitRegisterMsg"></button>
    </section>
    <section class="tipModal" v-show="tipStatus">
      <span class="glyphicon glyphicon-remove"></span>
      <p>{{tipText}}</p>
    </section>
    <section class="tipModal" v-show="rightStatus">
      <span class="glyphicon glyphicon-ok"></span>
      <p>{{tipText}}</p>
    </section>
  </div>

</template>
<script>
  export default ({
    name: 'register',
    data() {
      return {
        getText: '获取验证码',//获取验证码内容显示
        agree: true,//协议是否选择
        phone: '',//手机号
        phoneLegal: false,//手机号输入合法
        code: '',//验证码
        tipStatus: false,//错误提示框显示控制
        tipText: '',//提示框内容
        rightStatus: false,//正确提示框显示控制
        submitAlready: false,//是否已经提交
      }
    },
    mounted (){
      this.$nextTick( () => {

      })
    },
    methods: {
      agreeChange(){//改变协议选择
        this.agree = !this.agree;
      },
      phoneBlur(){//手机号输入失焦
        let phoneCheck = /^1[34578]\d{9}$/;
        if(!phoneCheck.test(this.phone)){
          this.phoneLegal = false;
          this.modalFun('手机号输入错误', 2000);
        } else {
          this.phoneLegal = true;
          console.log(this.phoneLegal);
        }
      },
      transformRequest(data) {
        let ret = '';
        for (let i in data) {
          ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
        }
        return ret;
      },
      getPhoneCode(){ //获取验证码
        if(this.phoneLegal){ //判断手机号输入合法，才能获取验证码
          if(this.getText === '获取验证码'){ //验证码发完一次后，过60s才能再次发送
            this.$http({
              url: 'user/sendTemplateSMS',
              method: 'post',
              data: this.transformRequest({phone: this.phone,code: 1}),
              headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
            }).then((res) => { //发送成功
              if(res.data.code === 0){
                this.modalShow('发送成功', 2000);
              }else{
                this.modalFun(res.data.message, 2000);
              }
            }).catch( (error) => {
              //alert(error);
            });
            let n = 60;
            let timer = setInterval(() => {
              n--;
              if(n < 10){
                n = '0' + n;
              }
              this.getText = n + 'S后再试';
              if(n < 1){
                clearInterval(timer);
                this.getText = '获取验证码';
              }
            },1000)
          }
        }else{
          this.modalFun('手机号输入错误', 2000);
        }
      },
      submitRegisterMsg(){
        let phoneCheck = /^1[34578]\d{9}$/;
        let codeCheck = /^[\d]{4}$/;
        if(phoneCheck.test(this.phone) && codeCheck.test(this.code) && this.agree === true){ //手机号、验证码、协议都符合要求
          if(this.submitAlready === false){ //防止重复提交
            this.submitAlready = true;
            //发送注册信息
            this.$http({
              url: 'user/regist',
              method: 'post',
              data: this.transformRequest({
                phone: this.phone,
                code: this.code
              }),
              headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
            }).then( (res) => {
              if(res.data.code === 0) { //判断注册成功，给用户提示，并且跳转到页面
                this.modalShow('注册成功', 1000);
                setTimeout( () => {
                  window.location.href = 'user/isSign';
                }, 2000)
              } else {
                this.modalFun(res.data.message, 2000);
              }
              this.submitAlready = false;  //将重复提交设置为false
            })
          }
        }else if(!phoneCheck.test(this.phone)){ //提交时判断手机号
          this.modalFun('手机号输入错误', 2000);
        }else if(!codeCheck.test(this.code)){ //提交时判断验证码是否输入4位数字
          this.modalFun('验证码输入错误', 2000);
        }else if(this.agree !== true){ //判断服务协议是否选中
          this.modalFun('请同意服务协议', 2000);
        }
      },
      modalFun(text, timer){ //错误提示框显示控制
        this.tipStatus = true;
        this.tipText = text;
        setTimeout(() => {
          this.tipStatus = false;
        },timer)
      },
      modalShow(text, timer){ //正确提示框显示控制
        this.rightStatus = true;
        this.tipText = text;
        setTimeout(() => {
          this.rightStatus = false;
        }, timer)
      }
    }
  })
</script>
<style lang="less">
 @backgroundColor: #f6f6f6;
  .Register {
    background: @backgroundColor;
    height: 100vh;
    width: 100vw;
    font-size: 2vh;
    .tipModal{
      background: rgba(0,0,0,0.8);
      border-radius: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      width: 22rem;
      height: 11rem;
      z-index: 99;
      color: #fff;
      text-align: center;
      font-size: 1.8rem;
      padding: 1rem 0;
      span{
        font-size: 3.5rem;
      }
    }
    border-bottom: 1px solid #f2f2f2;
    .registerInfo{
      ::placeholder{
        font-size: 1.2rem;
        color: #939393;
      }
      .logo{
        width: 20rem;
        height: 4rem;
        margin: 6rem auto;
        background: url(../../static/images/logo.png) no-repeat center center;
        background-size: cover;
      }
      .username{
        overflow: hidden;
        margin-top: 10rem;
        .phone{
          padding: 1rem 2rem;
          p{
            font-size: 1.5rem;
            color: #fe780a;
          }
          div{
            border-bottom: 2px solid #E4E4E4;
            margin: 1rem 0;
            input{
              width: 100%;
              background: @backgroundColor;
              height: 3rem;
              border: none;
              font-size: 1.8rem;
              outline: none;
            }
          }

        }
      }
      .password{
        overflow: hidden;
        .phoneCode{
          padding: 1rem 2rem;
          p{
            font-size: 1.5rem;
            color: #fe780a;
          }
          div{
            border-bottom: 2px solid #E4E4E4;
            margin: 1rem 0;
            input{
              height: 3rem;
              background: @backgroundColor;
              border: none;
              width: 50%;
              font-size: 1.8rem;
              outline: none;
            }
            span{
              display: inline-block;
              text-align: right;
              width: 50%;
              height: 2.7rem;
              line-height: 2.7rem;
              font-size: 1.4rem;
              float: right;
              color: #ec6c2d;
            }
          }

        }
      }
      .agreeMent{
        overflow: hidden;
        .col-md-10, .col-xs-10{
          margin: 0;
          padding: 0 1.5rem;
        }
        .agree{
          position: relative;
          font-size: 1.4rem;
          input{
            width: 2rem;
            height: 2rem;
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
          }
          .agreeUnCheck{
            display: inline-block;
            width: 1.8rem;
            height: 1.8rem;
            background: url(../../static/images/wxz.png) no-repeat center center;
            background-size: cover;
            float: left;
          }
          .agreeCheck{
            display: inline-block;
            width: 1.8rem;
            height: 1.8rem;
            background: url(../../static/images/xz.png) no-repeat center center;
            background-size: cover;
            float: left;
          }
          span:nth-of-type(2){
            margin-left: 0.5rem;
            font-size: 1.28rem;
            color: #939393;
          }
          span:nth-of-type(3){
            font-size: 1.28rem;
            color: #00baff;
            font-weight: bold;
          }
        }
      }
    }
    .submitRegister{
      text-align: center;
      margin: 10rem 0;
      button{
        width: 75vw;
        height: 5rem;
        background: url(../../static/images/login_normal.png) no-repeat center center;
        background-size: cover;
        border: none;
        border-radius: 5px;
      }
    }
  }
</style>
