import Vue from 'vue'
import Router from 'vue-router'
//路由模块引入
import Login from '../components/Login'
import Main from '../components/Main' //首页
import Statement from '../components/Statement' //智能报表
import Personal from '../components/Personal' //个人中心
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
    }
  ]
})
