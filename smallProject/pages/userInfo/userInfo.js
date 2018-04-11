Page({
  data: {
    nickName: '',  //用户昵称
    avatarUrl: '',  //用户头像
  },
  //  // 页面初始化 options为页面跳转所带来的参数
   onLoad: function (options) {
     var userInfo = wx.getStorageSync('userInfo').userInfo;
     console.log(userInfo);
     this.setData({
       nickName: userInfo.nickName,
       avatarUrl: userInfo.avatarUrl
     })
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
