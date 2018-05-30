<template>
  <footer>
    <dl @click="goMain">
      <dt :class="{'platformStyle1':!platform,'platformStyle2':platform}"></dt>
      <dd :class="{'ddStyle1':!platform,'ddStyle2':platform}">工作平台</dd>
    </dl>
    <dl @click="goStatement">
      <dt :class="{'statementStyle1':!statement,'statementStyle2':statement}"></dt>
      <dd :class="{'ddStyle1':!statement,'ddStyle2':statement}">智能报表</dd>
    </dl>
    <dl @click="goPersonal">
      <dt :class="{'personalStyle1':!personal,'personalStyle2':personal}"></dt>
      <dd :class="{'ddStyle1':!personal,'ddStyle2':personal}">个人中心</dd>
    </dl>
  </footer>
</template>
<script>
  export default ({
    name: 'FooterBar',
    data() {
      return {
        platform: true,
        statement: false,
        personal: false
      }
    },
    mounted() {
      this.$nextTick( () => {
        this.$nextTick( () => {
          if(this.$route.path === '/main'){
            this.platform = true;
            this.statement = false;
            this.personal = false;
          }else if(this.$route.path === '/statement'){
            this.platform = false;
            this.statement = true;
            this.personal = false;
          }else if(this.$route.path === '/personal'){
            this.platform = false;
            this.statement = false;
            this.personal = true;
          }
        })
      })
    },
    methods: {
      goMain() {
        this.platform = true;
        this.statement = false;
        this.personal = false;
        this.$router.push({
          path: '/main'
        })
      },
      goStatement() {
        this.platform = false;
        this.statement = true;
        this.personal = false;
        this.$router.push({
          path: '/statement'
        })
      },
      goPersonal() {
        this.platform = false;
        this.statement = false;
        this.personal = true;
        this.$router.push({
          path: '/personal'
        })
      }
    }
  })
</script>
<style lang="less">
  @footerHeight: 7.49625vh;
  footer{
    border-top: 1px solid #cccccc;
    width: 100%;
    position: fixed;
    font-family: "PingFang SC";
    background: #fff;
    height: @footerHeight;
    left: 0;
    bottom: 0;
    text-align: center;
    z-index: 999;
    dl{
      width: 33.3333%;
      float: left;
      text-align: center;
      padding-top: 0.5496vh;
      dt{
        width: 6.4vw;
        height: 3.9233vh;
        margin: 0 auto;
      }
      dd{
        font-size: 1.7991rem;
      }
    }
    .ddStyle1{
      color: #7b7b7b;
    }
    .ddStyle2{
      color: #4eb55a;
    }
    .platformStyle1{
      background: url('../../static/images/platform2.png') no-repeat center center;
      background-size: cover;
    }
    .statementStyle1{
      background: url('../../static/images/report-forms.png') no-repeat center center;
      background-size: cover;
    }
    .personalStyle1{
      background: url('../../static/images/personal.png') no-repeat center center;
      background-size: cover;
    }

    .platformStyle2{
      background: url('../../static/images/platform1.png') no-repeat center center;
      background-size: cover;
    }
    .statementStyle2{
      background: url('../../static/images/report-forms1.png') no-repeat center center;
      background-size: cover;
    }
    .personalStyle2{
      background: url('../../static/images/personal1.png') no-repeat center center;
      background-size: cover;
    }
  }
</style>

