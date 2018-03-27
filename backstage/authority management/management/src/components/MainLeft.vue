<template>
    <div class="mainleft">
      <Menu :theme="theme" accordion>
        <Submenu v-for="(list, index) in this.$store.state.permission" :key="index" :name="index">
          <template slot="title">
            <Icon :type="list.icon"></Icon>
            {{list.title}}
          </template>
          <MenuItem v-for="(item, indexs) in list.perList" :key="indexs" :name="index+'-'+indexs" @click.native="crossQuery(item.name, index, indexs)">{{item.name}}</MenuItem>
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
          location1: '',
          location2: '',
          item: ''
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
        crossQuery(item, index, indexs) {
          let reqData = this.$store.state.permission[index].perList[indexs].reqData;//请求数据时的参数
          let showType = this.$store.state.permission[index].perList[indexs].type;//显示类型
          let urlPath = this.$store.state.permission[index].perList[indexs].url; //需要跳转的路由信息
          this.$store.commit('getData', [reqData, showType]); //控制左侧栏目的内容改变
          if(showType === 'table') {
            this.$router.push({
              name: 'table'
            })
          }else if(showType === 'charts') {
            this.$router.push({
              name: 'chart'
            })
          }else if(showType === 'column') {
            this.$router.push({
              name: 'column'
            })
          }else if(showType === 'pie') {
            this.$router.push({
              name: 'pie'
            })
          }
          if(urlPath === 'jurisdic') {
            this.$router.push({
              name: 'jurisdic'
            })
          }
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
