// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios'; //ajax
import router from './router';
import fastclick from 'fastclick'

fastclick.attach(document.body);


Vue.config.productionTip = false;
import storeConfig from './store/store.js'; //全局共享数据
import AfterScan from './components/AfterScan.vue';
import Register from './components/Register.vue';
import OpenDoorSuccess from './components/OpenDoorSuccess.vue';
import OpenDoorError from './components/OpenDoorError.vue';
import Accredit from './components/Accredit.vue';
import Support from './components/Support.vue';
import OrderSucItem from './components/OrderSucItem.vue';
import Procedure from './components/Procedure.vue';
import Activity from '@/components/Activity.vue'
import ActivitMessage from '@/components/ActivitMessage.vue'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: storeConfig,
  template: '<App/>',
  components: { App, AfterScan, Register, OpenDoorSuccess, OpenDoorError,
    Accredit, Support, OrderSucItem, Procedure, Activity, ActivitMessage}
})
Vue.prototype.$http = axios;
