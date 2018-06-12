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
            return {}
        },
        mounted() {
          this.$nextTick(() => {

          })
        },
        methods: {
          //返回按钮
          goBack() {
            this.$router.push({
              path: '/mistake'
            })
          },
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
