<template>
    <div class="mainheader">
        <div class="logo">未来鲜森LOGO</div>
        <p>未来鲜森商户管理系统</p>
        <div class="userInfo">
          <Avatar icon="person" size="small"/>
          <span>{{activeUser}}</span>
        </div>
        <div class="tips" title="消息管理">
          <!--<Badge dot>-->
            <!--<a href="#">-->
              <!--<Icon type="ios-bell-outline" size="26"></Icon>-->
            <!--</a>-->
          <!--</Badge>-->
          <Dropdown trigger="click" >
            <Badge :count="badgeCount">
              <a href="javascript:void(0)">
                <Icon type="android-notifications" size="26"></Icon>
              </a>
            </Badge>
            <DropdownMenu slot="list">
              <DropdownItem name="all" @click.native="notice('all')">消息管理</DropdownItem>
              <DropdownItem name="t1" @click.native="notice('t1')">上货通知</DropdownItem>
              <DropdownItem name="t2" @click.native="notice('t2')">库存变更</DropdownItem>
              <DropdownItem name="t3" @click.native="notice('t3')">系统推送消息</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div class="setup" title="系统设置">
          <Dropdown trigger="click">
            <a href="javascript:void(0)">
              <Icon type="ios-gear"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="loginOut">退出登陆</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
    </div>
</template>

<script>
    export default {
      name: "MainHeader",
      data() {
        return {
          activeUser: '', //当前登录用户
          badgeCount: 10, //显示消息数量
        }
      },
      mounted () {
        this.$nextTick(() => {
          //this.activeUser = this.$store.state.activeUser;
          if(localStorage.getItem('username')) {
            this.activeUser = localStorage.getItem('username');
          }else{
            this.activeUser = this.$store.state.activeUser;
          }
          // this.$ajax({
          //   url: '',
          //   method: 'POST',
          //   data: {username: this.activeUser}
          // }).then( function(res) {

          // }).catch(function(error) {
          //   console.log(error);
          // })
        })
      },
      methods: {
        loginOut () { //用户登出方法
          console.log(1);
          this.$router.push({
            name: 'login'
          })
        },
        notice(name) {//通知消息方法
          this.$router.push({
            name: 'noticelist',
            query: {
              namelist: name
            }
          })
        }
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
        font-weight: 600;
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
      a{
        color: #80858f;
      }
    }
  }
</style>
