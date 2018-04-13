Page({
  data: {
  },
  //  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function (options) {
    var problem = wx.getStorageSync('customer');
    console.log(problem);
  },
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
})