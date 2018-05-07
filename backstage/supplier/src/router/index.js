import Vue from 'vue'
import Router from 'vue-router'
//路由模块引入
import Login from '../components/Login'
import Main from '../components/Main' //首页
import Statement from '../components/Statement' //智能报表
import Personal from '../components/Personal' //个人中心
import Repertory from '../components/Repertory' //库存
import Exhibing from '../components/Exhibing' //上货
import DoorClose from '../components/DoorClose' //关门
import InStoreDone from '../components/InStoreDone' //入库完成
//引入主要的数据模块



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/statement',
      name: 'statement',
      component: Statement
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/repertory',
      name: 'repertory',
      component: Repertory
    },
    {
      path: '/exhibing',
      name: 'exhibing',
      component: Exhibing
    },
    {
      path: '/doorclose',
      name: 'doorclose',
      component: DoorClose
    },
    {
      path: '/inStoreDone',
      name: 'inStoreDone',
      component: InStoreDone
    }
  ]
})
