import Vue from 'vue'
import Router from 'vue-router'
import Reservation from '@/components/Reservation'
import Wait from '@/components/Wait'
import Trolley from '@/components/Trolley'
import Order from '@/components/Order'
import Detail from '@/components/Detail'
import WaitItem from '@/components/WaitItem'
import AfterScan from '@/components/AfterScan'
import SettleComplete from '@/components/SettleComplete'
import Register from '@/components/Register'
import OpenDoorSuccess from '@/components/OpenDoorSuccess'
import OpenDoorError from '@/components/OpenDoorError'
import Accredit from '@/components/Accredit'
import Support from '@/components/Support'
import OrderSucItem from '@/components/OrderSucItem'
import Procedure from '@/components/Procedure'
import RegistNewUser from '@/components/RegistNewUser'
import Activity from '@/components/Activity'
import ActivitMessage from '@/components/ActivitMessage'
import Exercise from '@/components/Exercise'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/reservation',
      name: 'reservation',
      component: Reservation
    },
    {
      path: '/wait',
      name: 'wait',
      component: Wait
    },
    {
      path: '/trolley',
      name: 'trolley',
      component: Trolley
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/waitItem',
      name: 'waitItem',
      component: WaitItem
    },
    {
      path: '/afterScan',
      name: 'afterScan',
      component: AfterScan
    },
    {
      path: '/settle',
      name: 'settle',
      component: SettleComplete
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
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    {
      path: '/activitmessage',
      name: 'activitmessage',
      component: ActivitMessage
    },
    {
      path: '/exercise',
      name: 'exercise',
      component: Exercise
    }
  ]
})
