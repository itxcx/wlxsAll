import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'

//引入主要的数据模块
import Demo from '@/charts/Demo'

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
      component: Main,
      children: [  //二级路由
        {
          path: '/demo',
          name: 'demo',
          component: Demo
        },
      ]
    }
  ]
})
