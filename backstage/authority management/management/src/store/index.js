import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//全局数据
const state = {
  //最高权限
    permission : [
        {
          "account": [
            {"type": "商户信息"},
            {"type": "一级商户"},
            {"type": "二级商户"},
            {"type": "个人信息"}
          ]
        },
        {
          "business": [
            {"type": "设备管理"},
            {"type": "商品管理"},
            {"type": "上货管理"},
            {"type": "配送管理"},
            {"type": "活动管理"},
            {"type": "会员管理"}
          ]
        },
        {
          "datamodel": [
            {"type": "销售数据"},
            {"type": "利润分成"},
            {"type": "货损率"},
            {"type": "库存情况"}
          ]
        },
        {
          "monitor": [
            {"type": "备货"},
            {"type": "配送"},
            {"type": "上货"},
            {"type": "实时交易"}
          ]
        },

    ]
};
//数据操作
const mutations = {

};
//数据引用
export default new Vuex.Store ({
  state,
  mutations
})
