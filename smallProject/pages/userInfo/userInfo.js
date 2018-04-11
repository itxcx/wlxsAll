Page({
  data: {
    avatarUrl: '',  //用户头像
    userPhone: '',//用户手机号
    coupon:'2', //优惠券
    memberPoints:'556' //会员积分
  },
  //  // 页面初始化 options为页面跳转所带来的参数
   onLoad: function (options) {
     var userInfo = wx.getStorageSync('userInfo').userInfo;
     console.log(userInfo);
     var userPhone = '18295176350'; //用户手机号从本地存储中获取
     userPhone = userPhone.substr(0, 3) + '****' + userPhone.substr(7); //隐藏中间四位 
     this.setData({
       nickName: userInfo.nickName,
       avatarUrl: userInfo.avatarUrl,
       userPhone: userPhone
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


  //跳转优惠券页面
   goCoupon: function() {
     wx.navigateTo({
       url: '../coupon/coupon'
     });
   },
   //跳转会员积分页面
   goMemberPoints: function() {
     wx.navigateTo({
       url: '../memberPoints/memberPoints'
     });
   },
   //跳转我的订单页面
   goOrderDetail: function() {
     wx.navigateTo({
       url: '../purchases/purchases'
     });
   }
})
