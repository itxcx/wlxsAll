Page({
  data: {
    avatarUrl: '',  //用户头像
    userPhone: '',//用户手机号
    coupon:'0', //优惠券
    memberPoints: 0
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
     var that = this;
     var session_key = wx.getStorageSync('session_key');
     wx.request({
       url: 'https://weilaixiansen.com/login/getorderdetail',
       method: 'GET',
       data: {
         'session_key': session_key,
         'status': 4,
         'page': 'all'
       },
       success: res => {
         console.log(res.data.data);
         var pointList = null; //积分列表
         var pointCount = 0; //总积分统计
         if (!res.data.data) {
           pointList = [];
         }else{
           pointList = res.data.data.data;
           if (pointList.length > 0) {
             for (var i = 0; i < pointList.length; i++) {
               pointCount += Math.ceil(Number(pointList[i].real_amount));
             }
             that.setData({
               memberPoints: pointCount
             })
           }
         }
         wx.setStorageSync('pointCount', pointCount);
         wx.setStorageSync('pointList', pointList);
       },
       fail: error => {
         console.log(error);
       }
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
