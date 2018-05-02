<template>
  <footer>
    <dl>
      <dt :class="{'platformStyle1':!platform,'platformStyle2':platform}"></dt>
      <dd :class="{'ddStyle1':!platform,'ddStyle2':platform}">工作平台</dd>
    </dl>
    <dl>
      <dt :class="{'statementStyle1':!statement,'statementStyle2':statement}"></dt>
      <dd :class="{'ddStyle1':!statement,'ddStyle2':statement}">智能报表</dd>
    </dl>
    <dl>
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

      })
    },
    methods: {

    }
  })
</script>
<style lang="less">
  @footerHeight: 7.49625vh;
  footer{
    border-top: 1px solid #cccccc;
    width: 100%;
    position: fixed;
    background: #fff;
    height: @footerHeight;
    left: 0;
    bottom: 0;
    text-align: center;
    padding-top: 5px;
    z-index: 999;
    dl{
      width: 33.3333%;
      height: @footerHeight;
      float: left;
      text-align: center;
      cursor: pointer;
      dt{
        width: 6.4vw;
        height: 3.283vh;
        margin: 0 auto;
      }
      dd{
        margin-top: 0.5997vh;
        font-size: 1.649rem;
      }
    }
    .ddStyle1{
      color: #a3a7aa;
    }
    .ddStyle2{
      color: #65d072;
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

