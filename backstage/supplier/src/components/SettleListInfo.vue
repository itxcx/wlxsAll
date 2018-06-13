<template>
    <div class="SettleListInfo">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>销售结算详情</p>
        </section>
      </header>
    </div>
</template>

<script>
    export default {
        name: "SettleListInfo",
        data() {
            return {
              settleListArray: [],
              count: {}
            }
        },
        mounted() {
          this.$nextTick(() => {
            let date1 = this.$route.query.date1;
            let date2 = this.$route.query.date2;
            this.count = JSON.parse(localStorage.getItem('allCount'));
            this.getSettleInfoData(date1, date2);
          })
        },
        methods: {
          //获取数据
          getSettleInfoData(date1, date2) {
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/checkoutbyday?date1=${date1}&date2=${date2}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.settleListArray = res.data.data;
              }else if(res.data.code == 3) {
                this
              }
            }).catch((error) => {
              console.log(error);
            })
          }
        }
    }
</script>

<style lang="less">
  .SettleListInfo{
    background: #f1f1f1;
    padding-top: 7vh;
    header{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 98;
      .login_top{
        background: #65d172;
        width: 100vw;
        height: 5.997vh;
        font-size: 2.398rem;
        line-height: 5.997vh;
        text-align: center;
        color: #fff;
        font-weight: 500;
        span{
          position: absolute;
          left: 4vw;
          top: 0;
        }
      }
    }
  }
</style>
