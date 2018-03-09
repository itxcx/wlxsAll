import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';//Ajax
//iview ui框架
import iView from 'iview';
import 'iview/dist/styles/iview.css'

Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//axios for ajax
Vue.prototype.$ajax = axios;
