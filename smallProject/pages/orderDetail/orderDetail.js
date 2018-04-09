Page({
  data: {
      orderStatus: '已完成'
  },
  //  // 页面初始化 options为页面跳转所带来的参数
  //  onLoad: function (options) {

  //  },
  //  // 页面渲染完成
  //  onReady: function () {

  //  },
  //  // 页面显示
  //  onShow: function () {

  //  },
  //   // 页面隐藏
  //  onHide: function () {

  //  },
  //    // 页面关闭
  //  onUnload: function () {

  //  },
  //客服热线
  callService: function() {
    wx.makePhoneCall({
      phoneNumber: '4007707768'
    })
  }
})
