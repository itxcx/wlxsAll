<template>
  <div class="UpdatePsw">
    <section class="update_bg"></section>
    <section class="update_model"></section>
    <section class="update_form">
      <div class="update_logo">
        <a href="http://www.weilaixiansen.com" title="未来鲜森官方网站" target="_blank"></a>
        <span>修改密码</span>
      </div>
      <div class="password">
        <label for="oldPassword">旧密码</label>
        <input type="password" id="oldPassword" name="oldPassword" v-model="oldPassword" @blur="oldPswBlur" @focus="PswFocus"/>
      </div>
      <div class="password">
        <label for="newPassword">新密码</label>
        <input type="password" id="newPassword" name="newPassword" v-model="newPassword" @blur="newPswBlur" @focus="PswFocus"/>
      </div>
      <div class="password">
        <label for="newPasswordAgain">再一次</label>
        <input type="password" id="newPasswordAgain" name="newPasswordAgain" v-model="newPasswordAgain" @blur="againNewPswBlur" @focus="PswFocus"/>
      </div>
      <div class="tipTitle">
        {{tipTitle}}
      </div>
      <div class="form_submit">
        <input type="button" value="提交修改" name="sumbit_button" @click="submitChange">
      </div>

    </section>
    <footer>
      <p>Copyright&nbsp;&copy;&nbsp;2017-2018
        <a href="http://www.weilaixiansen.com" target="_blank">西安未来鲜森智能信息技术有限公司</a>
      </p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "UpdatePsw",
    data() {
      return {
        tipTitle: '',
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      }
    },
    methods: {
      //旧密码
      oldPswBlur() {
        if(this.oldPassword === '') {
          this.tipTitle = '请输入旧密码';
        }
      },
      PswFocus() {
        this.tipTitle = '';
      },
      //新密码
      newPswBlur() {
        if(this.newPassword === '') {
          this.tipTitle = '请输入新密码';
        }
      },
      //密码确认
      againNewPswBlur() {
        if(this.newPasswordAgain === '' || this.newPasswordAgain !== this.newPassword) {
          this.tipTitle = '两次输入密码不一致';
        }
      },
      //提交方法
      submitChange() {
        if(this.oldPassword === '') {
          this.tipTitle = '旧密码不能为空';
        }else if(this.newPassword === '') {
          this.tipTitle = '新密码不能为空';
        }else if(this.newPasswordAgain === '' || this.newPasswordAgain !== this.newPassword) {
          this.tipTitle = '两次输入密码不一致';
        }else{
          // this.$ajax({
          //   url: '',
          //   method: 'POST',
          //   data: {oldPsw: this.oldPassword, newPsw: this.newPassword}
          // }).then(function(res) {
          //   if(res.code === 0) {
          //     console.log(`修改成功`);
          //   }else{
          //     console.log(`修改失败`);
          //   }
          // }).catch(function(error) {
          //   console.log(error);
          // })
        }
      }
    }
  }
</script>

<style lang="less">
  @backgroudColor: #f2f2f2;
  @font-size: 2vh;
  @color: rgba(255, 255, 255, 0.5);
  .UpdatePsw{
    .update_model{
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
    }
    .update_form{
      width: 40vw;
      height: 45vh;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 99;
      background: rgba(0, 0, 0, 0.75);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.8);
      border: 4px solid rgba(50, 50, 55, 0.2);
      border-radius: 5px;
      text-align: center;
      .update_logo{
        overflow: hidden;
        a{
          display: inline-block;
          float: left;
          width: 10rem;
          height: 4rem;
          margin: 1rem 2.5rem;
          background: url(../../static/images/wlxs_logo.png) no-repeat center center;
          background-size: cover;
        }
        span{
          display: inline-block;
          float: left;
          color: @color;
          font-size: 2rem;
          margin: 2vh;
        }
      }
      .tipTitle{
        height: 4vh;
        font-size: 0.75rem;
        color: #ff6600;
        line-height: 4vh;
      }
      .password{
        input{
          background: #1B1B1B;
          border: none;
          outline-color:#00ff00;
          border-radius: 3px;
          color: #fff;
          height: 1.7rem;
          margin-top: 2vh;
          text-align: center;
        }
        color: #fff;
        font-size: 1rem;
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
    .update_bg{
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
      }
    }
    @media screen and (max-width:900px) {
      .update_form{
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
        .update_logo{
          overflow: hidden;
          a{
            display: block;
            width: 15rem;
            height: 4rem;
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
