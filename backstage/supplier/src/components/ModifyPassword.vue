<template>
    <div class="ModifyPassword">
      <header>
        <div class="login_top">修改密码
          <span @click="goLogin">
            <Icon type="chevron-left"></Icon>
          </span>
        </div>
      </header>
      <section class="ModifyContent"></section>
    </div>
</template>

<script>
    export default {
        name: "ModifyPassword",
        data() {
            return {}
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

    .ModifyContent{

    }
  }
</style>
