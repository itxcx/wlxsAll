<template>
    <div class="mainleft">
      <i-menu :theme="theme" accordion v-for="(list, index) in this.$store.state.permission" :key="index">
      <!--<i-menu :theme="theme" accordion >-->
        <Submenu name="index">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            {{list.title}}
          </template>
          <div v-for="(item, indexs) in list.perList" :key="indexs">
            <MenuItem name="1-1" @click="alert(index, indexs)">{{item.type}}</MenuItem>
          </div>
        </Submenu>
        <!--<Submenu name="1">-->
          <!--<template slot="title">-->
            <!--<Icon type="ios-paper"></Icon>-->
            <!--内容管理-->
          <!--</template>-->
          <!--<div>-->
            <!--<MenuItem name="1-1">文章管理</MenuItem>-->
            <!--<MenuItem name="1-2">评论管理</MenuItem>-->
            <!--<MenuItem name="1-3">举报管理</MenuItem>-->
          <!--</div>-->

        <!--</Submenu>-->
        <!--<MenuItem name="8">-->
          <!--<Icon type="settings"></Icon>-->
          <!--test-->
        <!--</MenuItem>-->
      </i-menu>
      <!--<section>{{name}}</section>-->
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
          let activeUser = this.$store.state.activeUser;
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
        alert(index, indexs) {
          console.log(index + '-' + indexs);
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
