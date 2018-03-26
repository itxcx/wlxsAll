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
          "icon": "person-stalker",
          "perList": [
            {"name": "商户信息", "type": "charts", "url": "jurisdic", "reqData": "1" },
            {"name": "一级商户", "type": "table", "url": "", "reqData": "1" },
            {"name": "二级商户", "type": "charts", "url": "", "reqData": "1" },
            {"name": "个人信息", "type": "table", "url": "", "reqData": "1" }
          ]
        },
        {
          "title": "业务管理",
          "icon": "coffee",
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
          "icon": "stats-bars",
          "perList": [
            {"name": "销售数据", "type": "table", "url": "", "reqData": "1" },
            {"name": "利润分成", "type": "charts", "url": "", "reqData": "1" },
            {"name": "货损率", "type": "table", "url": "", "reqData": "1" },
            {"name": "库存情况", "type": "charts", "url": "", "reqData": "1" }
          ]
        },
        {
          "title": "监控管理",
          "icon": "ios-cog",
          "perList": [
            {"name": "备货", "type": "charts", "url": "", "reqData": "1" },
            {"name": "配送", "type": "table", "url": "", "reqData": "1" },
            {"name": "上货", "type": "charts", "url": "", "reqData": "1" },
            {"name": "实时交易", "type": "table", "url": "", "reqData": "1" }
          ]
        },
    ],
  //获取中间内容区域显示的数据de 参数  测试用方法
   reqData: '',
   showType: '',
  //所有权限数据
   authoritList: [
     {
       "title": "账号信息",
       "perList": [
         {"authorTitle": "商户信息", "rank": 3},
         {"authorTitle": "一级商户", "rank": 1},
         {"authorTitle": "二级商户", "rank": 2},
         {"authorTitle": "个人信息", "rank": 3}
       ]
     },
     {
       "title": "业务管理",
       "perList": [
         {"authorTitle": "设备管理", "rank": 2},
         {"authorTitle": "商品管理", "rank": 3},
         {"authorTitle": "上货管理", "rank": 3},
         {"authorTitle": "配送管理", "rank": 3},
         {"authorTitle": "活动管理", "rank": 2},
         {"authorTitle": "会员管理", "rank": 1}
       ]
     },
     {
       "title": "数据管理",
       "perList": [
         {"authorTitle": "销售数据", "rank": 3},
         {"authorTitle": "利润分成", "rank": 2},
         {"authorTitle": "货损率", "rank": 3},
         {"authorTitle": "库存情况", "rank": 3}
       ]
     },
     {
       "title": "监控管理",
       "perList": [
         {"authorTitle": "备货", "rank": 3},
         {"authorTitle": "配送", "rank": 3},
         {"authorTitle": "上货", "rank": 3},
         {"authorTitle": "实时交易", "rank": 2}
       ]
     },
     ],
  //所有用户信息
  userList: [
    {'username': 'admin', 'tel': '00000000000','rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座1', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jinlong', 'tel': '22222222222', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座2', 'checked': false},
    {'username': 'jianting', 'tel': '11111111111', 'rank': 1, 'password': 'admin', 'opr': '瞪羚谷E座3', 'checked': false}
  ]
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
