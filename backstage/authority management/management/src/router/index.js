import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import MainHeader from '@/components/MainHeader'
import MainLeft from '@/components/MainLeft'
import MainFooter from '@/components/MainFooter'

Vue.use(Router)

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
          path: '/mainheader',
          name: 'mainheader',
          component: MainHeader
        },
        {
          path: '/mainleft',
          name: 'mainleft',
          component: MainLeft
        },
        {
          path: '/mainfooter',
          name: 'mainfooter',
          component: MainFooter
        },
      ]
    }
  ]
})
