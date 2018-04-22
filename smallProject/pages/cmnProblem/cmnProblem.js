Page({
  data: {
    problem: {} //需要显示的内容
  },
  //  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function (options) {
    var customer = wx.getStorageSync('customer');
    this.setData({
      problem: customer
    })
  },
  //转发
  onShareAppMessage: function (res) {
    //  wx.showShareMenu({
    //    withShareTicket: true
    //  })
  },
})