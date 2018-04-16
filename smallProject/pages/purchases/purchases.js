Page({
  data: {
    // tab切换  
    currentTab: 0,
    currentPage: 0,
    allTipTitle: '',
    unpaidTipTitle: '',
    refundedTipTitle: '',
      //全部列表数据
      allList: [
        {
          address: '招商银行大厦',
          purType: '已完成',
          order_id: '2018041312513887101',
          created_time: '2018-04-08 12:00:00',
          amount: 20,
          discount: 10,
          countNum: 6, //商品总数
          real_amount: 10.00,
          goodslist: [
            { goods_name: '乐虎', count: 2, discount: '7.00', price:'8.00'},
            { goods_name: '乐虎', count: 2, discount: '7.00', price: '8.00' },
            { goods_name: '乐虎', count: 2, discount: '7.00', price: '8.00' },
          ]
        },
      ],
      //待支付
      unpaid: [
        {
          address: '招商银行大厦',
          purType: '未支付',
          order_id: '2018041312513887101',
          created_time: '2018-04-08 12:00:00',
          amount: 20,
          discount: 10,
          countNum: 6, //商品总数
          real_amount: 10.00,
          goodslist: [
            { goods_name: '乐虎', count: 2, discount: '7.00', price: '8.00' },
            { goods_name: '乐虎', count: 2, discount: '7.00', price: '8.00' },
            { goods_name: '乐虎', count: 2, discount: '7.00', price: '8.00' },
          ]
        },
      ],
      //已退款
      refunded: [
        {
          address: '招商银行大厦',
          purType: '已退款',
          order_id: '2018041312513887101',
          created_time: '2018-04-08 12:00:00',
          amount: 20,
          discount: 10,
          countNum: 6, //商品总数
          real_amount: 10.00,
          goodslist: [
            { goods_name: '乐虎', count: 2, discount: '7.00', price: '8.00' },
            { goods_name: '乐虎', count: 2, discount: '7.00', price: '8.00' },
            { goods_name: '乐虎', count: 2, discount: '7.00', price: '8.00' },
          ]
        }
      ]
  },
  //获取数据方法封装
  //0 全部   4 是支付成功   7 支付失败      9 退款
  getOrderList: function(status) {
    var session_key = wx.getStorageSync('session_key');
    wx.request({
      url: 'https://weilaixiansen.com/login/getorderlist',
      method: 'GET',
      data: {
        'session_key': session_key,
        'status': status
      },
      success: res => {
        if (res.data.code == 0) { //返回数据
          if (res.data.data.length > 0) { //订单数大于0
            if (status == 0) {//全部
              this.setData({
                allList: res.data.data,
                allTipTitle: '上滑获取更多数据'
              })
            } else if (status == 7) {//未支付
              this.setData({
                unpaid: res.data.data,
                unpaidTipTitle: '上滑获取更多数据'
              })
            } else {//已退款
              this.setData({
                refunded: res.data.data,
                refundedTipTitle: '上滑获取更多数据'
              })
            }
          } else {
            if (status == 0) {//全部
              this.setData({
                allTipTitle: '暂时没有订单数据'
              })
            } else if (status == 7) {//未支付
              this.setData({
                unpaidTipTitle: '暂时没有订单数据'
              })
            } else {//已退款
              this.setData({
                refundedTipTitle: '暂时没有订单数据'
              })
            }
          }
        }
      },
      fail: error => {
        console.log(error);
      }
    })
  },
  onLoad: function() {
    //默认请求全部数据
    this.getOrderList(0);
  },

  //查看订单详情
  showDetailMsg: function() {
      wx.navigateTo({
        url: '../orderDetail/orderDetail'
      });
  },

  // 滑动切换tab 
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
    var listType = this.data.currentTab; //请求数据时的分类
    wx.setStorageSync('currentPage', listType);
    if (listType == 1) {//切换到未付款列表，如果数据为空，并且提示内容不为  '暂时没有订单数据' 时才请求数据
      if (this.data.unpaid.length == 0 && this.data.unpaidTipTitle != '暂时没有订单数据') {
        this.getOrderList(7);
      }
    } else if (listType == 2) {//切换到退款列表，数据为空，提示内容不为  '暂时没有订单数据' 时才请求数据
      if (this.data.refunded.length == 0 && this.data.refundedTipTitle != '暂时没有订单数据') {
        this.getOrderList(9);
      }
    }
  },

  //点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      var listType = that.data.currentTab; //请求数据时的分类
      wx.setStorageSync('currentPage', listType);
      if (listType == 1) {//切换到未付款列表，如果数据为空，并且提示内容不为  '暂时没有订单数据' 时才请求数据
        if (this.data.unpaid.length == 0 && this.data.unpaidTipTitle != '暂时没有订单数据') {
          this.getOrderList(7);
        }
      } else if (listType == 2) {//切换到退款列表，数据为空，提示内容不为  '暂时没有订单数据' 时才请求数据
        if (this.data.refunded.length == 0 && this.data.refundedTipTitle != '暂时没有订单数据') {
          this.getOrderList(9);
        }
      }
    }
  },
  //去支付
  goPay: function() {
    console.log(1);
  },
  //加载更多方法
  searchScrollLower: function() {
     //0 全部   4 是支付成功   7 支付失败      9 退款
   // console.log(this.data.allList);
   console.log('scroll');
   var currentPage = wx.getStorageSync('currentPage'); //判断当前是哪个分类
    // if (this.data.allList.length < 10) {
    //   var data = {
    //     addr: '招商银行大厦',
    //     purType: '已完成',
    //     purTime: '2018-04-08 12:00:00',
    //     countNum: 7,
    //     countAmount: 10.00,
    //     purItemList: [
    //       { name: '乐虎', itemNum: 2 },
    //       { name: '巧克力牛奶', itemNum: 2 },
    //       { name: '进口水果-蔓越莓', itemNum: 2 }
    //     ]
    //   }
    //   var da = this.data.allList.concat(data);
    //   this.setData({
    //     allList: da
    //   })
    //  // console.log(this.data.allList);
    // }
   
  }
})
