Page({
  data: {
    avatarUrl: '',  //用户头像
    userPhone: '',//用户手机号
    coupon:'0', //优惠券
    memberPoints:'556'
  },
  // 页面初始化 
   onLoad: function (options) {
     var userInfo = wx.getStorageSync('userInfo').userInfo;
     console.log(userInfo);
     var userPhone = wx.getStorageSync('userPhone'); //用户手机号从本地存储中获取
     userPhone = userPhone.substr(0, 3) + '****' + userPhone.substr(7); //隐藏中间四位 
     this.setData({
       nickName: userInfo.nickName,
       avatarUrl: userInfo.avatarUrl,
       userPhone: userPhone
     })
   },
  
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
   },
   //活动页面
   goActivity: function() {
     wx.navigateTo({
       url: '../activity/activity'
     });
   },
   //关于我们
   goUs: function() {
     wx.navigateTo({
       url: '../aboutUs/aboutUs'
     });
   },
})
