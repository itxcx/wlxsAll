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


Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App, Login, Main, FooterBar },
  template: '<App/>'
})
//axios for ajax
Vue.prototype.$ajax = axios;
// Vue.prototype.Echarts = echarts; //vue 原型扩展 echarts
 Vue.prototype.Highcharts = highcharts; //vue 原型扩展 echarts
