<template>
    <div class="DoorClose">
      <section class="close_img"></section>
      <p>已关门, 处理中</p>
      <section class="close_tips">
        <p>
          <span></span>
          <span>温馨提示</span>
        </p>
      </section>
      <section class="close_tip_content">请耐心等待，预计需要<span>10~30</span>秒</section>
    </div>
</template>

<script>
    export default {
      name: "DoorClose",
      data() {
        return {}
      },
      mounted() {
        this.$nextTick(() => {
          let order_id = localStorage.getItem('order_id');
          let operate = localStorage.getItem('operate');
          let action = 0; //判断上下货操作
          if(operate !== 'exhib') {
            action = 1;
          }
          this.getExhibOrderInfo(order_id, action);
        })
      },
      methods: {
        //调用接口,获取上货详细信息,参数订单ID-order_id && 操作类型-ation
        getExhibOrderInfo(order_id, action) {
          this.$ajax({
            url: `http://merchant.test.weilaixiansen.com/login/closeDetailbyOrderId?action=${action}&order_id=${order_id}`,
            method: 'GET'
          }).then((res) => {
            //如果数据请求成功,跳转到核验页面
            if(res.data.code == 0) {
              res.data.data = JSON.stringify(res.data.data);
              localStorage.setItem('exhibData', res.data.data);
              let operate = localStorage.getItem('operate');
              if(operate === 'exhib') { //上货完成
                this.$router.push({
                  path: '/exhibingDone'
                })
              }else if(operate === 'ship'){ //下货完成
                this.$router.push({
                  path: '/shipDone'
                })
              }
            }
            console.log(res);
          }).catch((error) => {
            console.log(error);
          })
        }
      }
    }
</script>

<style lang="less">
  .DoorClose{
    width: 100vw;
    height: 100vh;
    background: #fff;
    padding-top: 11.919vh;
    .close_img{
      width: 59.2vw;
      height: 29.91vh;
      margin: 0 auto;
      background: url("../../static/images/openSuccess.gif") no-repeat center center;
      background-size: cover;
    }
    >p{
      font-size: 2.998vh;
      color: #373737;
      text-align: center;
      margin-top: 8.745vh;
    }
    .close_tips{
      text-align: center;
      margin-top: 4.449vh;
      p{
        height: 2.923vh;
        span:nth-of-type(1) {
          display: inline-block;
          width: 3.8666vw;
          height: 2.923vh;
          background: url("../../static/images/image_tips.png") no-repeat center center;
          background-size: cover;
          vertical-align: bottom;
        }
        span:nth-of-type(2) {
          display: inline-block;
          margin-left: 5px;
          height: 2.923vh;
          font-size: 2.0989vh;
          color: rgba(36,35,35,.93);
        }
      }
    }
    .close_tip_content{
      margin-top: 1.874vh;
      text-align: center;
      font-size: 2.0989vh;
      color: #5c5c5c;
      span{
        color: #ff3f2f;
      }
    }
  }
</style>
