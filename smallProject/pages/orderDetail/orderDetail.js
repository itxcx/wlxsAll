Page({
  data: {
    orderDetail: {}
  },
  // 页面初始化 
   onLoad: function () {
     var data = wx.getStorageSync('detailData');
     console.log('订单详情查看数据如下');
     console.log(data);
     this.setData({
       orderDetail: data
     })
   },
  //客服热线
  callService: function() {
    wx.makePhoneCall({
      phoneNumber: '4007707768'
    })
  }
})
