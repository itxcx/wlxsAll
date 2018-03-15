<template>
    <div class="mainheader">
        <div class="logo">未来鲜森LOGO</div>
        <p>未来鲜森商户管理系统</p>
        <div class="userInfo">
          <Avatar icon="person" size="small"/>
          <span>{{username}}</span>
        </div>
        <div class="tips" title="个人消息管理">
          <Badge dot>
            <a href="#">
              <Icon type="ios-bell-outline" size="26"></Icon>
            </a>
          </Badge>
        </div>

        <div class="setup">
          <Icon type="ios-gear"></Icon>
        </div>
    </div>
</template>

<script>
    export default {
      name: "mainheader",
      data() {
        return {
          username: ''
        }
      },
      mounted () {
        this.$nextTick(function() {
          this.username = this.$route.query.message;
        })
      },
      methods: {

      }
    }
</script>

<style lang="less">
  @commonHeight: 10vh;
  .mainheader{
    width: 100vw;
    overflow: hidden;
    height: @commonHeight;
    box-shadow: 2px 4px 2px #999999;
    .logo{
      width: 20vw;
      height: @commonHeight;
      float: left;
      font-size: 1rem;
    }
    p{
      float: left;
      width: 60vw;
      font-size: 2rem;
      font-weight: 600;
      height: @commonHeight;
      line-height: @commonHeight;
      text-align: center;
    }
    .tips{
      float: left;
      width: 5vw;
      height: @commonHeight;
      line-height: @commonHeight;
      a{
        color: #80858f;
      }
    }
    .userInfo{
      float: left;
      width: 10vw;
      height: @commonHeight;
      line-height: @commonHeight;
    }
    .setup{
      float: left;
      width: 5vw;
      font-size: 2rem;
      color: #80858f;
      height: @commonHeight;
      line-height: @commonHeight;
    }
  }
</style>
