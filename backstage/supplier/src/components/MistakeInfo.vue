<template>
    <div class="MistakeInfo">
      <header>
        <section class="login_top">
          <span @click="goBack">
            <Icon type="chevron-left"></Icon>
          </span>
          <p>订单详情</p>
        </section>
      </header>
    </div>
</template>

<script>
    export default {
        name: "MistakeInfo",
        data() {
            return {
              mistakeInfo: {}
            }
        },
        mounted() {
          this.$nextTick(() => {
            let order_id = this.$route.query.order_id;
            this.mistakeInfoDetail(order_id);
          })
        },
        methods: {
          //返回按钮
          goBack() {
            this.$router.push({
              path: '/mistake'
            })
          },
          //获取数据
          mistakeInfoDetail(order_id) {
            this.$ajax({
              url: `http://merchant.test.weilaixiansen.com/login/sellorderdetail?order_id=${order_id}`,
              method: 'GET'
            }).then((res) => {
              if(res.data.code == 0) {
                this.mistakeInfo = res.data.data;
              }else if(res.data.code == 3) {
                this.$router.push({
                  path: '/'
                })
              }
            }).catch((error) => {
              console.log(error);
            })
          }
        }
    }
</script>

<style lang="less">
  .MistakeInfo{
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
