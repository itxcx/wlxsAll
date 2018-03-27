import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Jurisdic from '@/components/Jurisdic' //权限管理组件
import NoticeList from '@/components/NoticeList' //通知消息管理组件
import UpdatePsw from '@/components/UpdatePsw'

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
      path: '/updatepsw',
      name: 'updatepsw',
      component: UpdatePsw
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
        //权限管理组件
        {
          path: '/jurisdic',
          name: 'jurisdic',
          component: Jurisdic
        },
        {
          path: '/noticelist',
          name: 'noticelist',
          component: NoticeList
        },
      ]
    }
  ]
})
