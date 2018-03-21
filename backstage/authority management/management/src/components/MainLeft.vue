<template>
    <div class="mainleft">
      <Menu :theme="theme" accordion>
        <Submenu v-for="(list, index) in this.$store.state.permission" :key="index" :name="index">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
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
          let reqData = this.$store.state.permission[index].perList[indexs].reqData;
          let showType = this.$store.state.permission[index].perList[indexs].type;
          this.$store.commit('getData', [reqData, showType]);
         this.$router.push({
           name: 'demo'
         })
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
