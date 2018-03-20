import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//全局数据
const state = {
  activeUser: "",
  //最高权限
   permission : [
        {
          "title": "账号信息",
          "perList": [
            {"name": "商户信息", "type": "charts", "url": "", "reqData": "1" },
            {"name": "一级商户", "type": "table", "url": "", "reqData": "1" },
            {"name": "二级商户", "type": "charts", "url": "", "reqData": "1" },
            {"name": "个人信息", "type": "table", "url": "", "reqData": "1" }
          ]
        },
        {
          "title": "业务管理",
          "perList": [
            {"name": "设备管理", "type": "table", "url": "", "reqData": "1" },
            {"name": "商品管理", "type": "charts", "url": "", "reqData": "1" },
            {"name": "上货管理", "type": "table", "url": "", "reqData": "1" },
            {"name": "配送管理", "type": "charts", "url": "", "reqData": "1" },
            {"name": "活动管理", "type": "table", "url": "", "reqData": "1" },
            {"name": "会员管理", "type": "charts", "url": "", "reqData": "1" }
          ]
        },
        {
          "title": "数据管理",
          "perList": [
            {"name": "销售数据", "type": "table", "url": "", "reqData": "1" },
            {"name": "利润分成", "type": "charts", "url": "", "reqData": "1" },
            {"name": "货损率", "type": "table", "url": "", "reqData": "1" },
            {"name": "库存情况", "type": "charts", "url": "", "reqData": "1" }
          ]
        },
        {
          "title": "监控管理",
          "perList": [
            {"name": "备货", "type": "charts", "url": "", "reqData": "1" },
            {"name": "配送", "type": "table", "url": "", "reqData": "1" },
            {"name": "上货", "type": "charts", "url": "", "reqData": "1" },
            {"name": "实时交易", "type": "table", "url": "", "reqData": "1" }
          ]
        },
    ],
  //获取中间内容区域显示的数据de 参数
   reqData: '',
   showType: ''
};
//数据操作
const mutations = {
    getData(state, [reqs, types]) {
      state.reqData = reqs;
      state.showType = types;
    }
};
//数据引用
export default new Vuex.Store ({
  state, mutations
});
