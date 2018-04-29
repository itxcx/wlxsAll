import Vue from 'vue'
import Router from 'vue-router'
//路由模块引入
import Login from '../components/Login'

//引入主要的数据模块



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})
