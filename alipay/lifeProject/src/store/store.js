import Vue from 'vue';
import Vuex from 'Vuex';
Vue.use(Vuex);

const state = {
  /*购物车数据*/
  trolleyList: [],
  /*所有预定数据*/
  reservaList:[],
  /*待取餐数据*/
  WaitList: [],
};
const mutations = {

}

export default new Vuex.Store ({
  state,
  mutations
})
