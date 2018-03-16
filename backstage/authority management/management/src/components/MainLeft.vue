<template>
    <div class="mainleft">
      <i-menu :theme="theme" accordion>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            内容管理
          </template>
          <MenuItem name="1-1">文章管理</MenuItem>
          <MenuItem name="1-2">评论管理</MenuItem>
          <MenuItem name="1-3">举报管理</MenuItem>
        </Submenu>
        <MenuItem name="8">
          <Icon type="settings"></Icon>
          test
        </MenuItem>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-people"></Icon>
            用户管理
          </template>
          <MenuItem name="2-1">新增用户</MenuItem>
          <MenuItem name="2-2">活跃用户</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="easel"></Icon>
            设备管理
          </template>
          <!--<MenuGroup title="使用">-->
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          <!--</MenuGroup>-->
          <!--<MenuGroup title="留存">-->
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>
          <!--</MenuGroup>-->
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-cog"></Icon>
            商品分析
          </template>
          <!--<MenuGroup title="使用">-->
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
          <!--</MenuGroup>-->
          <!--<MenuGroup title="留存">-->
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
          <!--</MenuGroup>-->
        </Submenu>
        <Submenu name="5">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            统计分析
          </template>
          <!--<MenuGroup title="使用">-->
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
          <!--</MenuGroup>-->
          <!--<MenuGroup title="留存">-->
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
          <!--</MenuGroup>-->
        </Submenu>
        <Submenu name="6">
          <template slot="title">
            <Icon type="ios-grid-view"></Icon>
            统计分析1
          </template>
          <!--<MenuGroup title="使用">-->
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
          <!--</MenuGroup>-->
          <!--<MenuGroup title="留存">-->
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
          <!--</MenuGroup>-->
        </Submenu>
        <MenuItem name="7">
          <Icon type="settings"></Icon>
          综合设置
        </MenuItem>
      </i-menu>
    </div>
</template>

<script>
    export default {
      name: "MainLeft",
      data() {
        return {
          theme: 'dark'
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
