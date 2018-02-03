import Vue from 'vue'
import Router from 'vue-router'
import AfterScan from '@/components/AfterScan'; //扫码推送消息
import Register from '@/components/Register'
import OpenDoorSuccess from '@/components/OpenDoorSuccess'
import OpenDoorError from '@/components/OpenDoorError'
import Accredit from '@/components/Accredit'; //去授权
import Support from '@/components/Support'
import OrderSucItem from '@/components/OrderSucItem'
import Procedure from '@/components/Procedure'
import RegistNewUser from '@/components/RegistNewUser'
import Activity from '@/components/Activity'; //红包活动
import ActivitMessage from '@/components/ActivitMessage'; //活动信息


Vue.use(Router)

export default new Router({
  routes: [
    //扫码推送消息
    {
      path: '/afterScan',
      name: 'afterScan',
      component: AfterScan
    },
    {
      path: '/',
      name: 'register',
      component: Register
    },
    {
      path: '/opendoorsuccess',
      name: 'opendoorsuccess',
      component: OpenDoorSuccess
    },
    {
      path: '/opendoorerror',
      name: 'opendoorerror',
      component: OpenDoorError
    },
    //去授权
    {
      path: '/accredit',
      name: 'accredit',
      component: Accredit
    },
    {
      path: '/support',
      name: 'support',
      component: Support
    },
    // 消费详情
    {
      path: '/ordersucItem',
      name: 'ordersucItem',
      component: OrderSucItem
    },
    {
      path: '/procedure',
      name: 'procedure',
      component: Procedure
    },
    {
      path: '/registnewuser',
      name: 'registnewuser',
      component: RegistNewUser
    },
    // 红包活动
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    //活动信息
    {
      path: '/activitmessage',
      name: 'activitmessage',
      component: ActivitMessage
    }
  ]
})
