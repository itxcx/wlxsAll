<template>
    <footer>
      <dl @click="goReservation">
        <dt :class="{'ydStyle1':!reserva,'ydStyle2':reserva}"></dt>
        <dd :class="{'ddStyle1':!reserva,'ddStyle2':reserva}">预定</dd>
      </dl>
      <dl @click="goWait">
        <dt :class="{'dqcStyle1':!wait,'dqcStyle2':wait}"></dt>
        <dd :class="{'ddStyle1':!wait,'ddStyle2':wait}">待取餐</dd>
      </dl>
      <dl @click="goTrolley">
        <dt :class="{'gwcStyle1':!trolley,'gwcStyle2':trolley}"></dt>
        <dd :class="{'ddStyle1':!trolley,'ddStyle2':trolley}">购物车</dd>
      </dl>
      <dl @click="goOrder">
        <dt :class="{'dingdanStyle1':!detail,'dingdanStyle2':detail}"></dt>
        <dd :class="{'ddStyle1':!detail,'ddStyle2':detail}">订单</dd>
      </dl>
    </footer>
</template>
<script>
  export default ({
    name: 'FooterTab',
    data() {
      return {
        reserva: true,
        wait: false,
        trolley: false,
        detail: false,
      }
    },
    mounted (){
      this.$nextTick( () => {
        if(this.$route.path === '/reservation' || this.$route.path === '/detail'){
          this.detail = false;
          this.wait = false;
          this.trolley = false;
          this.reserva = true;
        }else if(this.$route.path === '/wait' || this.$route.path === '/waititem'){
          this.wait = true;
          this.detail = false;
          this.trolley = false;
          this.reserva = false;
        }else if(this.$route.path === '/trolley' || this.$route.path === '/settle'){
          this.detail = false;
          this.wait = false;
          this.trolley = true;
          this.reserva = false;
        }else if(this.$route.path === '/order'){
          this.detail = true;
          this.wait = false;
          this.trolley = false;
          this.reserva = false;
        }
      })
    },
    methods: {
      goWait: function () {
        this.wait = true;
        this.detail = false;
        this.trolley = false;
        this.reserva = false;
        this.$router.push('wait');
      },
      goOrder: function () {
        this.$router.push('order');
        this.detail = true;
        this.wait = false;
        this.trolley = false;
        this.reserva = false;

      },
      goTrolley: function () {
        this.$router.push('trolley');
        this.detail = false;
        this.wait = false;
        this.trolley = true;
        this.reserva = false;
      },
      goReservation: function () {
        this.$router.push('reservation');
        this.detail = false;
        this.wait = false;
        this.trolley = false;
        this.reserva = true;
      },
    }
  })
</script>
<style lang="less">
  @footerHeight: 11vh;
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
        width: 25%;
        height: @footerHeight;
        float: left;
        padding: 1vh;
        text-align: center;
        cursor: pointer;
        dt{
          width: 5vh;
          height: 5vh;
          margin: 0 auto;
        }
        dd{
          font-size: 3.5vw;
        }
      }
      .ddStyle1{
        color: #000;
      }
      .ddStyle2{
        color: #f00;
      }
      .ydStyle1{
        background: url('../../static/images/yd_normal.png') no-repeat center center;
        background-size: cover;
      }
      .dqcStyle1{
        background: url('../../static/images/dqc_normal.png') no-repeat center center;
        background-size: cover;
      }
      .gwcStyle1{
        background: url('../../static/images/gwc_normal.png') no-repeat center center;
        background-size: cover;
      }
      .dingdanStyle1{
        background: url('../../static/images/dingdan_normal.png') no-repeat center;
        background-size: cover;
      }

      .ydStyle2{
        background: url('../../static/images/yd_pressed.png') no-repeat center center;
        background-size: cover;
      }
      .dqcStyle2{
        background: url('../../static/images/dqc_pressed.png') no-repeat center center;
        background-size: cover;
      }
      .gwcStyle2{
        background: url('../../static/images/gwc_pressed.png') no-repeat center center;
        background-size: cover;
      }
      .dingdanStyle2{
        background: url('../../static/images/dingdan_pressed.png') no-repeat center;
        background-size: cover;
      }
    }

</style>
