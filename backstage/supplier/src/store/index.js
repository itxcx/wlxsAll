import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//全局数据
const state = {
  exhibData: {
    address: '',
    count: '',
    itemList: [
      {
        itemName: '',
        count: '',
        numberList: []
      }
    ]
  }
};
//数据操作
const mutations = {

};
//数据引用
export default new Vuex.Store ({
  state, mutations
});
