<template>
    <div class="ModifyPassword">
      <header>
        <div class="login_top">修改密码</div>
        <div class="logo"></div>
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

        }
    }
</script>

<style lang="less">
  @font-color: #333;
  @header_background: #66D172;
  @page_background: #ffffff;
  .ModifyPassword{
    .login_top{
      width: 100vw;
      background: @header_background;
      height: 5.997rem;
      font-size: 2.398rem;
      line-height: 5.997rem;
      text-align: center;
      color: #fff;
      font-weight: 500;
    }
    .ModifyContent{

    }
  }
</style>
