<template>
    <div class="mainleft">
      <Menu :theme="theme" v-for="(list, index) in this.$store.state.permission" :key="index" accordion>
        <Submenu :name="index">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            {{list.title}}
          </template>
          <MenuItem v-for="(item, indexs) in list.perList" :key="indexs" :name="index+'-'+indexs" @click.native="test(item.type)">{{item.type}}</MenuItem>
        </Submenu>
      </Menu>
    </div>
</template>

<script>
    export default {
      name: "MainLeft",
      data() {
        return {
          theme: 'dark',
        }
      },
      mounted() {
        this.$nextTick( () => {
          //当前登录用户,获取当前用户操作权限,渲染左边列表
          let activeUser = this.$store.state.activeUser || localStorage.getItem('username');
          // this.$ajax({
          //   url: '',
          //   method: 'POST',
          //   data: {username: activeUser}
          // }).then(function(res) {
          //   if(res.code === 0) {//获取权限数据成功
          //     this.$store.state.permission = res.data.data; //设置全局权限数据
          //   }
          // }).catch(function(error) {
          //   console.log(error);
          // })
        })
      },
      methods: {
        test(item) {
          alert(item);
        },
        test1(index) {
          alert(index);
        }
      }
    }
</script>

<style lang="less">
  .mainleft{
    width: 15vw;
    height: 90vh;
    background: #495060;
    overflow-y: auto;
    .ivu-menu-dark{
      width: 100%!important;
    }
  }
</style>
