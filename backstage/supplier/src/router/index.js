import Vue from 'vue'
import Router from 'vue-router'
//路由模块引入
import Login from '../components/Login' //登录页面
import Main from '../components/Main' //主页面
import Statement from '../components/Statement' //智能报表
import Personal from '../components/Personal' //个人中心
import Repertory from '../components/Repertory' //库存
import Exhibing from '../components/Exhibing' //上货
import DoorClose from '../components/DoorClose' //关门
import InStoreDone from '../components/InStoreDone' //入库完成
import Scan from '../components/Scan' //扫码
import Addition from '../components/Addition' //添加商品
import AddItem from '../components/AddItem' //添加条目
import CheckExhibing from '../components/CheckExhibing' //入库核验
import ExhibingDone from '../components/ExhibingDone' //上货完成
import Ship from '../components/Ship' //下货
import ShipDone from '../components/ShipDone' //下货完成
import Record from '../components/Record' //上下架记录
import RecordMsg from '../components/RecordMsg' //上下架记录详情
import SaleRoom from '../components/SaleRoom' //销售报表
import DeviceRank from '../components/DeviceRank' //售货柜排行
import ProductRank from '../components/ProductRank' //商品排行
import RepertoryList from '../components/RepertoryList' //库存不分柜子
import InventoryControl from '../components/InventoryControl' //上下货报表查看
import ModifyPassword from '../components/ModifyPassword' //修改密码
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
    },
    {
      path: '/scan',
      name: 'scan',
      component: Scan
    },
    {
      path: '/addition',
      name: 'addition',
      component: Addition
    },
    {
      path: '/addItem',
      name: 'addItem',
      component: AddItem
    },
    {
      path: '/checkExhibing',
      name: 'checkExhibing',
      component: CheckExhibing
    },
    {
      path: '/exhibingDone',
      name: 'exhibingDone',
      component: ExhibingDone
    },
    {
      path: '/ship',
      name: 'ship',
      component: Ship
    },
    {
      path: '/shipDone',
      name: 'shipDone',
      component: ShipDone
    },
    {
      path: '/record',
      name: 'record',
      component: Record
    },
    {
      path: '/recordMsg',
      name: 'recordMsg',
      component: RecordMsg
    },
    {
      path: '/saleRoom',
      name: 'saleRoom',
      component: SaleRoom
    },
    {
      path: '/deviceRank',
      name: 'deviceRank',
      component: DeviceRank
    },
    {
      path: '/productRank',
      name: 'productRank',
      component: ProductRank
    },
    {
      path: '/repertoryList',
      name: 'repertoryList',
      component: RepertoryList
    },
    {
      path: '/inventoryControl',
      name: 'inventoryControl',
      component: InventoryControl
    },
    {
      path: '/mondifyPassword',
      name: 'mondifyPassword',
      component: ModifyPassword
    }

  ]
})
