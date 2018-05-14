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

Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App, Login, Main, FooterBar, Repertory, Exhibing, DoorClose,
    InStoreDone, Scan, Addition, AddItem, CheckExhibing
  },
  template: '<App/>'
})
//axios for ajax
Vue.prototype.$ajax = axios;
// Vue.prototype.Echarts = echarts; //vue 原型扩展 echarts
 Vue.prototype.Highcharts = highcharts; //vue 原型扩展 echarts
 // Vue.prototype.VueCordova = VueCordova; //cordova 原型扩展

