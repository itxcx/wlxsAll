import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';//Ajax
import store from './store'; //vuex 全局数据管理
//iview ui框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// import echarts from 'echarts';
import highcharts from 'highcharts';

import scroller from 'vue-scroller';
Vue.use(scroller);

import Impression from 'vue-impression'
Vue.use(Impression)

import $ from 'jquery'

// 业务模块
import Login from './components/Login'; //登录模块
import Main from './components/Main'; //首页模块
import FooterBar from './components/FooterBar'; //尾部
import Repertory from './components/Repertory'; //库存
import Exhibing from './components/Exhibing'; //入库
import DoorClose from './components/DoorClose'; //入库关门
import InStoreDone from './components/InStoreDone'; //入库完成
import Scan from './components/Scan'; //扫码
import Addition from './components/Addition'; //添加商品主页
import AddItem from './components/AddItem'; //添加条目
import CheckExhibing from './components/CheckExhibing'; //入库核验
import ExhibingDone from './components/ExhibingDone'; //上货完成
import Ship from './components/Ship'; //下货
import ShipDone from './components/ShipDone'; //下货完成
import Record from './components/Record'; //上下架记录
import RecordMsg from './components/RecordMsg'; //上下架记录
import SaleRoom from './components/SaleRoom'; //销售报表
import DeviceRank from './components/DeviceRank' //售货柜排行
import ProductRank from './components/ProductRank' //商品排行
import RepertoryList from './components/RepertoryList' //库存不分柜子
import InventoryControl from './components/InventoryControl' //上下货报表信息
import ModifyPassword from './components/ModifyPassword' //修改密码
import SalesRecord from './components/SalesRecord' //销售记录
import Mistake from './components/Mistake' //错拿记录
import MistakeInfo from './components/MistakeInfo' //错拿记录
import Settlement from './components/Settlement' //销售结算
import SettleListInfo from './components/SettleListInfo' //销售结算详情
import Expiration from './components/Expiration' //保质期
import ShipMsnModel from './components/ShipMsnModel' //下货消息模板
import ExhibingMsnModel from './components/ExhibingMsnModel' //上货消息模板

Vue.use(iView);
Vue.config.productionTip = false;

//公共方法
import Common from './common/tools';
Vue.prototype.Common = Common;

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App, Login, Main, FooterBar, Repertory, Exhibing, DoorClose,
    InStoreDone, Scan, Addition, AddItem, CheckExhibing, ExhibingDone,
    Ship, ShipDone, Record, RecordMsg, SaleRoom, DeviceRank, ProductRank,
    RepertoryList, InventoryControl, ModifyPassword, SalesRecord, Mistake,
    MistakeInfo, Settlement, SettleListInfo, Expiration, ShipMsnModel,
    ExhibingMsnModel
  },
  template: '<App/>'
})
//axios for ajax
Vue.prototype.$ajax = axios;
// Vue.prototype.Echarts = echarts; //vue 原型扩展 echarts
Vue.prototype.Highcharts = highcharts; //vue 原型扩展 echarts
 // Vue.prototype.VueCordova = VueCordova; //cordova 原型扩展

