<template>
    <div class="ModifyPassword">
      <header>
        <div class="login_top">修改密码
          <span @click="goLogin">
            <Icon type="chevron-left"></Icon>
          </span>
        </div>
      </header>
      <section class="userInfo">
        <section class="phone">
          <span>手机号</span>
          <input type="number" pattern="[0-9]*" v-model="phone" aria-describedby="basic-addon1" name="phone" placeholder="请输入手机号" @blur="phoneBlur"/>
        </section>
        <section class="code">
          <span>验证码</span>
          <input type="number" pattern="[0-9]*" name="code" aria-describedby="basic-addon1" v-model="code" placeholder="请输入验证码" @blur="codeBlur"/>
          <span @click="getPhoneCode" :class="{'codeCanSend': codeCanSend, 'codeSendDefault': !codeCanSend}">{{codeText}}</span>
        </section>
        <section class="oldPwd">
          <span>原密码</span>
          <!--<input :type="{'password': changeOldModal, 'text': !changeOldModal}" v-model="oldPsw" placeholder="请输入原密码"/>-->
          <input :type="OldModal" v-model="oldPsw" maxlength="12" placeholder="请输入原密码"/>
          <span @click="changeOldModalType" :class="{'close': !oldType, 'open': oldType}"></span>
        </section>
        <section class="newPwd">
          <span>新密码</span>
          <input :type="NewModal" v-model="newPsw" maxlength="12" placeholder="请输入新密码" @blur="newPwdBlur"/>
          <span @click="changeNewModalType" :class="{'close': !newType, 'open': newType}"></span>
        </section>
        <section class="pwdTipText">* 6-12个字符组成,区分大小写,建议使用英文字母和数字的混合密码。</section>
      </section>
      <section class="userInfo_submit" @click="submitModifyInfo">确认修改</section>
      <section class="tipModal" v-show="tipStatus">
        <p>{{tipText}}</p>
      </section>
    </div>
</template>

<script>
    export default {
        name: "ModifyPassword",
        data() {
            return {
              phone: '',
              code: '',
              oldPsw: '',
              newPsw: '',
              codeText: '获取验证码',
              tipStatus: false,//错误提示框显示控制
              tipText: '',//提示框内容
              phoneLegal: false, //手机号验证正确
              codeCanSend: false,
              OldModal: 'password',
              oldType: false,
              NewModal: 'password',
              newType: false,
              sendAjax: false, //防止多次请求
            }
        },
        mounted() {
          this.$nextTick(() => {

          })
        },
        methods: {
          //返回登录页
          goLogin() {
            this.$router.push({
              path: '/'
            })
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
          //验证码
          codeBlur() {
            if(this.code.length !== 4) {
              this.modalFun('验证码输入错误', 2000)
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
          //获取验证码
          getPhoneCode() {
            if(this.codeText == '获取验证码' && this.phoneLegal) {
              this.phoneCode(this.phone);
              this.codeCanSend = true;
              let n = 60;
              let timer = setInterval(() => {
                n--;
                this.codeText = `${n}秒后再试`;
                if(n < 1) {
                  this.codeText = '获取验证码';
                  clearInterval(timer);
                  this.codeCanSend = false;
                }
              }, 1000)
            }
          },
          //获取验证码接口数据
          phoneCode(phone) {
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/merchant/sendcode?phone=${phone}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.modalFun('发送成功', 1000);
              }else{
                this.modalFun('发送失败', 1000);
              }
            }).catch((error) => {
              this.modalFun('发送失败', 1000);
            })
          },
          //改变old模式
          changeOldModalType() {
            if(this.OldModal === 'password') {
              this.OldModal = 'text';
              this.oldType = true;
            }else{
              this.OldModal = 'password';
              this.oldType = false;
            }
          },
          //改变new模式
          changeNewModalType() {
            if(this.NewModal === 'password') {
              this.NewModal = 'text';
              this.newType = true;
            }else{
              this.NewModal = 'password';
              this.newType = false;
            }
          },
          //new
          newPwdBlur() {
            let length = this.newPsw.length;
            if(length < 6) {
              this.modalFun('密码太短', 2000)
            }
          },
          //提交方法
          submitModifyInfo() {
            let codeLength = this.code.length;
            let newPwdLength = this.newPsw.length;
            let oldPwdLength = this.oldPsw.length;
            let phone = this.phone;
            let code = this.code;
            let oldPwd = this.oldPsw;
            let newPwd = this.newPsw;
            if(this.phoneLegal && codeLength === 4 && newPwdLength > 5 && oldPwdLength > 0 && !this.sendAjax) {
              this.sendAjax = true;//已经发送过数据请求
              this.$ajax({
                url: `http://merchant.test.weilaixiansen.com/merchant/changepwd?phone=${phone}&code=${code}&oldpwd=${oldPwd}&newpwd=${newPwd}`,
                method: 'GET'
              }).then((res) => {
                this.sendAjax = false;
                if(res.data.code == 0) {
                  this.modalFun('修改成功,返回登录', 2000);
                  let times = setTimeout(() => {
                    this.$router.push({
                      path: '/'
                    })
                  }, 2000)
                }else{
                  this.modalFun(res.data.message, 2000);
                }
              }).catch((error) => {
                this.sendAjax = false;
                console.log(error);
              })
            }
          }
        }
    }
</script>

<style lang="less">
  @font-color: #333;
  @header_background: #66D172;
  @page_background: #ffffff;
  .ModifyPassword{
    header{
      .login_top{
        width: 100vw;
        background: @header_background;
        height: 5.997rem;
        font-size: 2.398rem;
        line-height: 5.997rem;
        text-align: center;
        color: #fff;
        font-weight: 500;
        position: relative;
      }
      span{
        position: absolute;
        left: 4vw;
        top: 0;
      }
    }
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
    .userInfo{
      padding: 3.748vh 6vw;
      .phone{
        border-bottom: 1px solid #e7e7e7;
        padding: 3.148vh 0;
        font-size: 2.098rem;
        span{
          display: inline-block;
          width: 21.3vw;
        }
        input{
          border: none;
          width: 64vw;
        }
      }
      .code{
        border-bottom: 1px solid #e7e7e7;
        padding: 2.148vh 0;
        font-size: 2.098rem;
        span:nth-of-type(1){
          display: inline-block;
          width: 21.3vw;
        }
        input{
          border: none;
          width: 35.33vw;
        }
        .codeSendDefault {
          display: inline-block;
          width: 27.333vw;
          text-align: center;
          border: 1px solid #65d172;
          border-radius: 20px;
          color: #65d172;
          padding: 0.5vh 0;
        }
        .codeCanSend{
          display: inline-block;
          width: 27.333vw;
          text-align: center;
          border-radius: 20px;
          padding: 0.5vh 0;
          color: #d0d0d0;
          border: 1px solid #d0d0d0;
        }
      }
      .oldPwd, .newPwd{
        border-bottom: 1px solid #e7e7e7;
        padding: 3.148vh 0;
        font-size: 2.098rem;
        span:nth-of-type(1){
          display: inline-block;
          width: 21.3vw;
        }
        input{
          border: none;
          width: 55.33vw;
        }
      }
      .pwdTipText{
        font-size: 2.0989rem;
        padding: 2.998vh 0;
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
    .close {
      display: inline-block;
      width: 5.333vw;
      height: 2.224vh;
      background: url('../../static/images/pwd_close.png') no-repeat center center;
      background-size: cover;
    }
    .open{
      display: inline-block;
      width: 5.333vw;
      height: 2.224vh;
      background: url('../../static/images/pwd_open.png') no-repeat center center;
      background-size: cover;
    }
  }
</style>
